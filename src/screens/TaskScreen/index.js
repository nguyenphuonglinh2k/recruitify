import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { MainLayout } from "layouts";
import { PROGRESS_STATUS } from "const/app.const";
import { ProgressTabBar } from "components";
import Header from "./Header";
import TaskList from "./TaskList";

const TaskScreen = () => {
  const [activatedTab, setActivatedTab] = useState(PROGRESS_STATUS.new);

  return (
    <MainLayout>
      <ProgressTabBar
        activatedTab={activatedTab}
        setActivatedTab={setActivatedTab}
      />
      <Header style={styles.header} />
      <TaskList style={{ marginHorizontal: 16 }} />
    </MainLayout>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
});
