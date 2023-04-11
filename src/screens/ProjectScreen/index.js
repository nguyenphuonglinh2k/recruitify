import { StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MainLayout } from "layouts";
import Header from "./Header";
import { PROGRESS_STATUS } from "const/app.const";
import ProjectList from "./ProjectList";
import { LoadingSpinner, ProgressTabBar } from "components";
import { ProjectService } from "services";
import { ApiConstant } from "const";

const ProjectScreen = () => {
  const userId = "642edb08c2e9557ef486fab9"; // TODO: admin

  const [activatedTab, setActivatedTab] = useState(PROGRESS_STATUS.new);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetProjects = useCallback(async () => {
    setIsLoading(true);
    const response = await ProjectService.getProjects(userId, {
      params: { status: activatedTab },
    });

    if (response.status === ApiConstant.STT_OK) {
      setProjects(response.data);
    }
    setIsLoading(false);
  }, [userId, activatedTab]);

  useEffect(() => {
    handleGetProjects();
  }, [handleGetProjects]);

  return (
    <MainLayout>
      <ProgressTabBar
        activatedTab={activatedTab}
        setActivatedTab={setActivatedTab}
      />
      <Header style={styles.header} total={projects.length} />
      <ProjectList data={projects} style={{ marginHorizontal: 16 }} />

      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
};

export default ProjectScreen;

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
});
