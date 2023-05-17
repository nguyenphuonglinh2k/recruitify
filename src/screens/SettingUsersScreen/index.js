import { FlatList, RefreshControl, StyleSheet, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MainLayout } from "layouts";
import UserItem from "./UserItem";
import { CommonIconButton, ConfirmDeleteModal, EmptyData } from "components";
import { UserService } from "services";
import { ApiConstant } from "const";
import { COLORS } from "utils";
import { PlusIcon } from "icons";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { SCREEN_NAME } from "const/path.const";
import { useToast } from "react-native-toast-notifications";
import EditUserRoleModal from "./EditUserRoleModal";

const SettingUsersScreen = () => {
  const toast = useToast();

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleConfirmModal, setIsVisibleConfirmModal] = useState(false);
  const [isVisibleEditModal, setIsVisibleEditModal] = useState(false);

  const handleCloseConfirmModal = useCallback(() => {
    setIsVisibleConfirmModal(false);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setIsVisibleEditModal(false);
  }, []);

  const handleOpenConfirmModal = useCallback(user => {
    setSelectedUser(user);
    setIsVisibleConfirmModal(true);
  }, []);

  const handleOpenEditRoleModal = useCallback(user => {
    setSelectedUser(user);
    setIsVisibleEditModal(true);
  }, []);

  const handleNavigateToCreateUser = useCallback(() => {
    navigation.navigate(SCREEN_NAME.settingUserCreationScreen);
  }, [navigation]);

  const handleGetUsers = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await UserService.getUsers();

      if (response.status === ApiConstant.STT_OK) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteUser = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await UserService.deleteUser(selectedUser._id);

      if (response.status === ApiConstant.STT_OK) {
        toast.show("Delete successfully", { type: "success" });
        handleGetUsers();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      handleCloseConfirmModal();
    }
  }, [handleGetUsers, selectedUser._id, toast, handleCloseConfirmModal]);

  const handleSaveNewRole = useCallback(
    async newValue => {
      if (newValue === selectedUser.role) {
        handleCloseEditModal();
        return;
      }

      setIsLoading(true);

      try {
        const response = await UserService.putUserInfo(selectedUser._id, {
          role: newValue,
        });

        if (response.status === ApiConstant.STT_OK) {
          toast.show("Update successfully", { type: "success" });
          handleGetUsers();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        handleCloseEditModal();
      }
    },
    [
      handleCloseEditModal,
      handleGetUsers,
      selectedUser._id,
      selectedUser.role,
      toast,
    ],
  );

  useEffect(() => {
    if (isFocused) handleGetUsers();
  }, [handleGetUsers, isFocused]);

  return (
    <MainLayout
      isBackScreen
      headerProps={{
        title: "User setting",
        headerRight: (
          <CommonIconButton onPress={handleNavigateToCreateUser}>
            <PlusIcon color={COLORS.green} />
          </CommonIconButton>
        ),
      }}
    >
      <Text style={styles.title}>User Management</Text>
      <Text style={styles.desc}>
        Manage all your existing users or add a new user.
      </Text>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserItem
            data={item}
            style={styles.item}
            onDelete={() => handleOpenConfirmModal(item)}
            onPress={() => handleOpenEditRoleModal(item)}
          />
        )}
        keyExtractor={(_, i) => i}
        ListEmptyComponent={<EmptyData description="No users found!" />}
        style={styles.list}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleGetUsers} />
        }
        showsVerticalScrollIndicator={false}
      />

      <ConfirmDeleteModal
        title={selectedUser.name}
        description="Do you really want delete this user?"
        isVisible={isVisibleConfirmModal}
        onCancel={handleCloseConfirmModal}
        onOK={handleDeleteUser}
      />

      <EditUserRoleModal
        isVisible={isVisibleEditModal}
        value={selectedUser.role}
        onCloseModal={handleCloseEditModal}
        onOk={newValue => handleSaveNewRole(newValue)}
      />
    </MainLayout>
  );
};

export default SettingUsersScreen;

const styles = StyleSheet.create({
  list: {
    margin: 16,
    flex: 1,
  },
  item: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.black,
    marginHorizontal: 16,
    marginTop: 10,
  },
  desc: {
    marginHorizontal: 16,
    color: COLORS.black,
    fontSize: 15,
    marginTop: 4,
    marginBottom: 8,
  },
});
