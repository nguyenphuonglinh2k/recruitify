import React, {
  useState,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { MainLayout } from "layouts";
import ProjectDetailTabBar, {
  PROJECT_DETAIL_TAB_VALUES,
} from "./ProjectDetailTabBar";
import InfoTab from "./InfoTab";
import { CommonIconButton, LoadingSpinner } from "components";
import { PencilIcon, PlusIcon } from "icons";
import { COLORS } from "utils";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/core";
import { SCREEN_NAME } from "const/path.const";
import TaskTab from "./TaskTab";
import MemberTab from "./MemberTab";
import { ProjectService } from "services";
import { ApiConstant, AppConstant } from "const";
import { useSelector } from "react-redux";

const ProjectDetailScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

  const projectId = route.params?.projectId;

  const [activatedTab, setActivatedTab] = useState(
    PROJECT_DETAIL_TAB_VALUES.info,
  );
  const [project, setProject] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const authUser = useSelector(({ authRedux }) => authRedux.user);

  const hasPermission = useMemo(() => {
    return [
      AppConstant.USER_ROLE.admin,
      AppConstant.USER_ROLE.manager,
    ].includes(authUser.role);
  }, [authUser.role]);

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
    navigation.navigate(SCREEN_NAME.projectEditingScreen, { project });
  };

  const onRenderHeaderRight = () => {
    switch (activatedTab) {
      case PROJECT_DETAIL_TAB_VALUES.member:
        return (
          <CommonIconButton>
            <PencilIcon color={COLORS.green} />
          </CommonIconButton>
        );

      case PROJECT_DETAIL_TAB_VALUES.info:
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
    if (isFocused) {
      handleGetProjectDetail();
    }
  }, [handleGetProjectDetail, isFocused]);

  return (
    <MainLayout
      isBackScreen
      headerProps={{
        title: project.name,
        headerRight: hasPermission ? onRenderHeaderRight() : null,
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
