import React, { useState, Fragment } from "react";
import { MainLayout } from "layouts";
import ProjectDetailTabBar, {
  PROJECT_DETAIL_TAB_VALUES,
} from "./ProjectDetailTabBar";
import InfoTab from "./InfoTab";
import { CommonIconButton } from "components";
import { PencilIcon, PlusIcon } from "icons";
import { COLORS } from "utils";
import { useNavigation } from "@react-navigation/core";
import { SCREEN_NAME } from "const/path.const";
import TaskTab from "./TaskTab";

const ProjectDetailScreen = () => {
  const navigation = useNavigation();

  const [activatedTab, setActivatedTab] = useState(
    PROJECT_DETAIL_TAB_VALUES.info,
  );

  const onNavigateToEditScreen = () => {
    navigation.navigate(SCREEN_NAME.projectInfoEditingScreen);
  };

  const onRenderHeaderRight = () => {
    switch (activatedTab) {
      case PROJECT_DETAIL_TAB_VALUES.info:
        return (
          <CommonIconButton onPress={onNavigateToEditScreen}>
            <PencilIcon color={COLORS.green} />
          </CommonIconButton>
        );
      case PROJECT_DETAIL_TAB_VALUES.task:
        return (
          <CommonIconButton onPress={onNavigateToEditScreen}>
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
        title: MOCK_PROJECT.title,
        headerRight: onRenderHeaderRight(),
      }}
    >
      <ProjectDetailTabBar
        activatedTab={activatedTab}
        setActivatedTab={setActivatedTab}
      />
      {activatedTab === PROJECT_DETAIL_TAB_VALUES.info && <InfoTab />}
      {activatedTab === PROJECT_DETAIL_TAB_VALUES.task && <TaskTab />}
    </MainLayout>
  );
};

const MOCK_PROJECT = {
  title: "Design recruitify mobile",
};

export default ProjectDetailScreen;
