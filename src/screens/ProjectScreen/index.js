import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { MainLayout } from "layouts";
import Header from "./Header";
import { PROGRESS_STATUS } from "const/app.const";
import ProjectList from "./ProjectList";
import { ProgressTabBar } from "components";

const ProjectScreen = () => {
  const [activatedTab, setActivatedTab] = useState(PROGRESS_STATUS.new);

  return (
    <MainLayout>
      <ProgressTabBar
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
