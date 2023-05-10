import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { CommonCalendar, LoadingSpinner, SelectUserModal } from "components";
import { useNavigation } from "@react-navigation/core";
import { SCREEN_NAME } from "const/path.const";
import FilterByUser from "./FilterByUser";
import { UserService } from "services";
import { ApiConstant } from "const";

const AllSchedules = () => {
  const navigation = useNavigation();

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(ALL_MEMBER_VALUE);

  const selectedModalLabel = useMemo(() => {
    const selected = users.find(user => user.id === selectedUserId);

    return selected?.name ?? "All members";
  }, [selectedUserId, users]);

  const handleCloseModal = useCallback(() => {
    setIsVisibleModal(false);
  }, []);

  const handleSelectUser = useCallback(
    pressedUser => {
      setSelectedUserId(pressedUser.id);
      handleCloseModal();
    },
    [handleCloseModal],
  );

  const onDayPress = dateObject => {
    navigation.navigate(SCREEN_NAME.scheduleListScreen, {
      date: dateObject.dateString,
    });
  };

  const handleGetUsers = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await UserService.getUsers();

      if (response.status === ApiConstant.STT_OK) {
        const responseData = response.data;

        const usersDataModal = responseData.map(user => ({
          name: user.name,
          avatarUrl: user.avatarUrl,
          id: user._id,
        }));

        setUsers([
          { name: "All members", id: ALL_MEMBER_VALUE },
          ...usersDataModal,
        ]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers]);

  return (
    <>
      <FilterByUser
        value={selectedModalLabel}
        style={styles.filterBox}
        onPress={() => setIsVisibleModal(true)}
      />
      <CommonCalendar onDayPress={onDayPress} />

      <SelectUserModal
        isVisible={isVisibleModal}
        data={users}
        onCloseModal={handleCloseModal}
        onPress={newUser => handleSelectUser(newUser)}
      />

      <LoadingSpinner isVisible={isLoading} />
    </>
  );
};

export default AllSchedules;

const ALL_MEMBER_VALUE = null;

const styles = StyleSheet.create({
  filterBox: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
});
