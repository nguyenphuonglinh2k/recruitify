import { ScrollView, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import { MainLayout } from "layouts";
import ProjectStatistics from "./ProjectStatistics";
import TodayTask from "./TodayTask";
import TaskStatistics from "./TaskStatistics";
import { LoadingSpinner } from "components";
import { useSelector } from "react-redux";
import { USER_ROLE } from "const/app.const";

const ProjectOverviewScreen = () => {
  const AUTH_USER = useSelector(({ authRedux }) => authRedux.user); // TODO: filter by user

  const [isLoading, setIsLoading] = useState(false);

  const canAccess = useMemo(() => {
    return [USER_ROLE.admin, USER_ROLE.manager].includes(AUTH_USER.role);
  }, [AUTH_USER.role]);

  return (
    <MainLayout>
      <ScrollView style={{ margin: 16 }} showsVerticalScrollIndicator={false}>
        {canAccess && (
          <ProjectStatistics
            style={styles.bottomSpacing}
            setIsLoading={setIsLoading}
          />
        )}

        <TaskStatistics
          style={styles.bottomSpacing}
          setIsLoading={setIsLoading}
          userId={AUTH_USER._id}
        />
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
