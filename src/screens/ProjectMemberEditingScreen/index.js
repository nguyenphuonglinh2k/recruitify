import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MainLayout } from "layouts";
import { SearchIcon } from "icons";
import { COLORS } from "utils";
import { CommonButton, LoadingSpinner } from "components";
import MemberList from "./MemberList";
import { ProjectService, UserService } from "services";
import { ApiConstant } from "const";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { useToast } from "react-native-toast-notifications";

const ProjectMemberEditingScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();

  const PROJECT = useSelector(({ projectRedux }) => projectRedux.project);

  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleGetUsers = useCallback(async () => {
    setIsLoading(true);

    try {
      // 1. Get all user in this project
      const projectUsersPromise = ProjectService.getProjectMembers(PROJECT._id);

      // // 2. Get all users of the system
      const usersResponsePromise = UserService.getUsers();

      const response = await Promise.all([
        projectUsersPromise,
        usersResponsePromise,
      ]);

      const hasAllSuccessStatus = response.every(
        res => res.status === ApiConstant.STT_OK,
      );

      if (hasAllSuccessStatus) {
        const [usersProjectResponseData, usersResponseData] = [
          response[0].data,
          response[1].data,
        ];

        const newProjectUsers = usersProjectResponseData.map(user => ({
          ...user,
          isChecked: true,
        }));

        newProjectUsers.sort(user => {
          if (user._id === PROJECT.creatorId?._id) {
            return -1;
          } else {
            return 1;
          }
        });

        const projectUserIds = usersProjectResponseData.map(user => user._id);

        const newOtherUsers = [...usersResponseData].reduce(
          (arr, currentItem) => {
            if (projectUserIds.includes(currentItem._id)) {
              return arr;
            } else {
              return [
                ...arr,
                {
                  ...currentItem,
                  isChecked: false,
                },
              ];
            }
          },
          [],
        );

        const newData = [...newProjectUsers, ...newOtherUsers];
        setData(newData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [PROJECT]);

  const handleToggleMembers = useCallback(
    index => {
      const newData = [
        ...data.slice(0, index),
        { ...data[index], isChecked: !data[index].isChecked },
        ...data.slice(index + 1),
      ];

      setData(newData);
    },
    [data],
  );

  const handleUpdateMembers = useCallback(async () => {
    setIsLoading(true);

    const memberIds = data.reduce((arr, currentItem) => {
      if (currentItem.isChecked) {
        return [...arr, currentItem._id];
      } else {
        return arr;
      }
    }, []);

    try {
      const response = await ProjectService.putProjectMembers(PROJECT._id, {
        memberIds,
      });
      if (response.status === ApiConstant.STT_OK) {
        navigation.goBack();
        toast.show("Update successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [PROJECT._id, navigation, toast, data]);

  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers]);

  return (
    <MainLayout isBackScreen headerProps={{ title: "Update member" }}>
      <ScrollView>
        <View style={styles.filterView}>
          <View style={styles.searchBox}>
            <SearchIcon />
            <TextInput
              style={styles.input}
              onChangeText={setSearchText}
              value={searchText}
              placeholder="Search..."
            />
          </View>
        </View>

        <MemberList data={data} onPress={handleToggleMembers} />
      </ScrollView>

      <CommonButton
        label="Save"
        style={{ margin: 16 }}
        onPress={handleUpdateMembers}
      />

      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
};

export default ProjectMemberEditingScreen;

const styles = StyleSheet.create({
  filterView: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.grey[200],
    padding: 16,
  },
  searchBox: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  input: {
    marginLeft: 5,
    flex: 1,
  },
});
