import React, { useState, Fragment, useCallback, useEffect } from "react";
import { MainLayout } from "layouts";
import ProjectDetailTabBar, {
  PROJECT_DETAIL_TAB_VALUES,
} from "./ProjectDetailTabBar";
import InfoTab from "./InfoTab";
import { CommonIconButton, LoadingSpinner } from "components";
import { PencilIcon, PlusIcon } from "icons";
import { COLORS } from "utils";
import { useNavigation, useRoute } from "@react-navigation/core";
import { SCREEN_NAME } from "const/path.const";
import TaskTab from "./TaskTab";
import MemberTab from "./MemberTab";
import { ProjectService } from "services";
import { ApiConstant } from "const";

const ProjectDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const projectId = route.params?.projectId;

  const [activatedTab, setActivatedTab] = useState(
    PROJECT_DETAIL_TAB_VALUES.info,
  );
  const [project, setProject] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleGetProjectDetail = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await ProjectService.getProjectDetail(projectId);

      if (response.status === ApiConstant.STT_OK) {
        setProject(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  const onNavigateToEditScreen = () => {
    navigation.navigate(SCREEN_NAME.projectInfoEditingScreen);
  };

  const onRenderHeaderRight = () => {
    switch (activatedTab) {
      case PROJECT_DETAIL_TAB_VALUES.info:
      case PROJECT_DETAIL_TAB_VALUES.member:
        return (
          <CommonIconButton onPress={onNavigateToEditScreen}>
            <PencilIcon color={COLORS.green} />
          </CommonIconButton>
        );

      case PROJECT_DETAIL_TAB_VALUES.task:
        return (
          <CommonIconButton>
            <PlusIcon color={COLORS.green} />
          </CommonIconButton>
        );
      default:
        return <Fragment />;
    }
  };

  useEffect(() => {
    handleGetProjectDetail();
  }, [handleGetProjectDetail]);

  return (
    <MainLayout
      isBackScreen
      headerProps={{
        title: project.name,
        headerRight: onRenderHeaderRight(),
      }}
    >
      <ProjectDetailTabBar
        activatedTab={activatedTab}
        setActivatedTab={setActivatedTab}
      />
      {activatedTab === PROJECT_DETAIL_TAB_VALUES.info && (
        <InfoTab data={project} />
      )}
      {activatedTab === PROJECT_DETAIL_TAB_VALUES.task && (
        <TaskTab projectId={project._id} setIsLoading={setIsLoading} />
      )}
      {activatedTab === PROJECT_DETAIL_TAB_VALUES.member && (
        <MemberTab data={project.memberIds} />
      )}

      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
};

export default ProjectDetailScreen;
