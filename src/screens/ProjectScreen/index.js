import { StyleSheet } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MainLayout } from "layouts";
import Header from "./Header";
import { PROGRESS_STATUS } from "const/app.const";
import ProjectList from "./ProjectList";
import {
  CommonIconButton,
  EmptyData,
  LoadingSpinner,
  ProgressTabBar,
} from "components";
import { ProjectService } from "services";
import { ApiConstant, AppConstant } from "const";
import { PlusIcon } from "icons";
import { useSelector } from "react-redux";
import { COLORS } from "utils";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { SCREEN_NAME } from "const/path.const";

const ProjectScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const authUser = useSelector(({ authRedux }) => authRedux.user);

  const [activatedTab, setActivatedTab] = useState(PROGRESS_STATUS.new);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const canCreateProject = useMemo(() => {
    return [
      AppConstant.USER_ROLE.admin,
      AppConstant.USER_ROLE.manager,
    ].includes(authUser.role);
  }, [authUser.role]);

  const handleGetProjects = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await ProjectService.getProjects(authUser._id, {
        params: { status: activatedTab },
      });

      if (response.status === ApiConstant.STT_OK) {
        setProjects(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [authUser._id, activatedTab]);

  const handleNavigateToCreationScreen = useCallback(() => {
    navigation.navigate(SCREEN_NAME.projectCreationScreen);
  }, [navigation]);

  useEffect(() => {
    if (isFocused) {
      handleGetProjects();
    }
  }, [handleGetProjects, isFocused]);

  return (
    <MainLayout
      headerProps={{
        headerRight: canCreateProject ? (
          <CommonIconButton onPress={handleNavigateToCreationScreen}>
            <PlusIcon color={COLORS.green} />
          </CommonIconButton>
        ) : null,
      }}
    >
      <ProgressTabBar
        activatedTab={activatedTab}
        setActivatedTab={setActivatedTab}
      />
      <Header style={styles.header} total={projects.length} />

      {projects.length ? (
        <ProjectList data={projects} style={{ marginHorizontal: 16 }} />
      ) : (
        <EmptyData description="No project found!" />
      )}

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
