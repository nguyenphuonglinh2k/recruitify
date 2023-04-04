import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MainLayout } from "layouts";
import Header from "./Header";
import ProjectTabBar from "./ProjectTabBar";
import { PROJECT_AND_TASK_STATUS } from "const/app.const";
import ProjectList from "./ProjectList";

const ProjectScreen = () => {
  const [activatedTab, setActivatedTab] = useState(PROJECT_AND_TASK_STATUS.new);

  return (
    <MainLayout>
      <ProjectTabBar
        activatedTab={activatedTab}
        setActivatedTab={setActivatedTab}
      />
      <Header style={styles.header} />
      <ProjectList style={{ marginHorizontal: 16 }} />
    </MainLayout>
  );
};

export default ProjectScreen;

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
});
