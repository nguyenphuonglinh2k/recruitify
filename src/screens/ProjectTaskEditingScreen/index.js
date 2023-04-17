import { ScrollView, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MainLayout } from "layouts";
import { COLORS } from "utils";
import { CommonButton, EmptyData, LoadingSpinner, SearchBox } from "components";
import { useNavigation } from "@react-navigation/core";
import { useToast } from "react-native-toast-notifications";
import { useSelector } from "react-redux";
import { ProjectService } from "services";
import { ApiConstant } from "const";
import TaskList from "./TaskList";

const ProjectTaskEditingScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();

  const PROJECT = useSelector(({ projectRedux }) => projectRedux.project);

  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleGetTasks = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await ProjectService.getTasksOfMembersNotInProject(
        PROJECT._id,
      );

      if (response.status === ApiConstant.STT_OK) {
        const tasks = response.data.map(task => ({
          ...task,
          isChecked: false,
        }));

        setData(tasks);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [PROJECT]);

  const handleAddTasks = useCallback(async () => {
    setIsLoading(true);

    const taskIds = data.map(task => task._id);

    try {
      const response = await ProjectService.putProjectTasks(PROJECT._id, {
        taskIds,
      });

      if (response.status === ApiConstant.STT_OK) {
        navigation.goBack();
        toast.show("Adding task successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [PROJECT._id, data, navigation, toast]);

  useEffect(() => {
    handleGetTasks();
  }, [handleGetTasks]);

  return (
    <MainLayout isBackScreen headerProps={{ title: "Adding tasks" }}>
      <ScrollView>
        <View style={styles.filterView}>
          <SearchBox onChangeText={setSearchText} value={searchText} />
        </View>

        {data.length ? (
          <TaskList data={data} style={{ margin: 16 }} />
        ) : (
          <EmptyData description="No tasks found!" />
        )}
      </ScrollView>

      <CommonButton
        label="Add"
        style={{ margin: 16 }}
        onPress={handleAddTasks}
        disabled={data.length === 0}
      />

      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
};

export default ProjectTaskEditingScreen;

const styles = StyleSheet.create({
  filterView: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.grey[200],
    padding: 16,
  },
});