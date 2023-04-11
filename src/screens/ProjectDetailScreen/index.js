import React, { useState, Fragment } from "react";
import { MainLayout } from "layouts";
import ProjectDetailTabBar, {
  PROJECT_DETAIL_TAB_VALUES,
} from "./ProjectDetailTabBar";
import InfoTab from "./InfoTab";
import { CommonIconButton } from "components";
import { PencilIcon, PlusIcon } from "icons";
import { COLORS } from "utils";
import { useNavigation, useRoute } from "@react-navigation/core";
import { SCREEN_NAME } from "const/path.const";
import TaskTab from "./TaskTab";
import MemberTab from "./MemberTab";

const ProjectDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const project = route.params?.project;

  const [activatedTab, setActivatedTab] = useState(
    PROJECT_DETAIL_TAB_VALUES.info,
  );

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
        <TaskTab projectId={project._id} />
      )}
      {activatedTab === PROJECT_DETAIL_TAB_VALUES.member && (
        <MemberTab data={project.memberIds} />
      )}
    </MainLayout>
  );
};

export default ProjectDetailScreen;
