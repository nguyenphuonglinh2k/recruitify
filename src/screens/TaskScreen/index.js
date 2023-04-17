import { RefreshControl, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MainLayout } from "layouts";
import { PROGRESS_STATUS } from "const/app.const";
import { CommonIconButton, EmptyData, ProgressTabBar } from "components";
import Header from "./Header";
import TaskList from "./TaskList";
import { TaskService } from "services";
import { ApiConstant, PathConstant } from "const";
import { PlusIcon } from "icons";
import { COLORS } from "utils";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";

const TaskScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const AUTH_USER = useSelector(({ authRedux }) => authRedux.user);

  const [activatedTab, setActivatedTab] = useState(PROGRESS_STATUS.new);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleGetTasks = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await TaskService.getTasks(AUTH_USER._id, {
        params: { status: activatedTab },
      });

      if (response.status === ApiConstant.STT_OK) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [activatedTab, AUTH_USER]);

  const handleNavigateToCreationScreen = useCallback(() => {
    navigation.navigate(PathConstant.SCREEN_NAME.taskCreationScreen);
  }, [navigation]);

  useEffect(() => {
    if (isFocused) {
      handleGetTasks();
    }
  }, [handleGetTasks, isFocused]);

  return (
    <MainLayout
      headerProps={{
        headerRight: (
          <CommonIconButton onPress={handleNavigateToCreationScreen}>
            <PlusIcon color={COLORS.green} />
          </CommonIconButton>
        ),
      }}
    >
      <ProgressTabBar
        activatedTab={activatedTab}
        setActivatedTab={setActivatedTab}
      />
      <Header style={styles.header} totalTask={tasks.length} />
      <TaskList
        data={tasks}
        style={{ marginHorizontal: 16 }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleGetTasks} />
        }
        ListEmptyComponent={<EmptyData description="No task found!" />}
      />
    </MainLayout>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
});
