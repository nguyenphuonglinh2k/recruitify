import { FlatList, RefreshControl, StyleSheet, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MainLayout } from "layouts";
import UserItem from "./UserItem";
import { EmptyData, LoadingSpinner } from "components";
import { UserService } from "services";
import { ApiConstant } from "const";
import { COLORS } from "utils";

const SettingUsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers]);

  return (
    <MainLayout isBackScreen headerProps={{ title: "User setting" }}>
      <Text style={styles.title}>User Management</Text>
      <Text style={styles.desc}>
        Manage all your existing users or add a new user.
      </Text>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserItem data={item} style={styles.item} />}
        keyExtractor={(_, i) => i}
        ListEmptyComponent={<EmptyData description="No users found!" />}
        style={styles.list}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleGetUsers} />
        }
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
