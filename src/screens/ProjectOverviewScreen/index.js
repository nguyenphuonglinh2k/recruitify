import { ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { MainLayout } from "layouts";
import ProjectStatistics from "./ProjectStatistics";
import TodayTask from "./TodayTask";
import TaskStatistics from "./TaskStatistics";
import { LoadingSpinner } from "components";
import { useSelector } from "react-redux";

const ProjectOverviewScreen = () => {
  const AUTH_USER = useSelector(({ authRedux }) => authRedux.user); // TODO: filter by user

  const [isLoading, setIsLoading] = useState(false);

  return (
    <MainLayout>
      <ScrollView style={{ margin: 16 }} showsVerticalScrollIndicator={false}>
        <ProjectStatistics style={styles.bottomSpacing} />

        <TaskStatistics style={styles.bottomSpacing} />
        <TodayTask setIsLoading={setIsLoading} userId={AUTH_USER._id} />
      </ScrollView>

      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
};

export default ProjectOverviewScreen;

const styles = StyleSheet.create({
  bottomSpacing: {
    marginBottom: 16,
  },
});
