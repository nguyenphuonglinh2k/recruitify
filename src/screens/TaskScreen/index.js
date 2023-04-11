import { RefreshControl, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MainLayout } from "layouts";
import { PROGRESS_STATUS } from "const/app.const";
import { ProgressTabBar } from "components";
import Header from "./Header";
import TaskList from "./TaskList";
import { TaskService } from "services";
import { ApiConstant } from "const";

const TaskScreen = () => {
  const USER_ID = "642f02f05f4deeca32de99cc";

  const [activatedTab, setActivatedTab] = useState(PROGRESS_STATUS.new);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleGetTasks = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await TaskService.getTasks(USER_ID, {
        params: { status: activatedTab },
      });

      if (response.status === ApiConstant.STT_OK) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }, [activatedTab]);

  useEffect(() => {
    handleGetTasks();
  }, [handleGetTasks]);

  return (
    <MainLayout>
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
