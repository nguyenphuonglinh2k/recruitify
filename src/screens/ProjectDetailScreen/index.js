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
import { AppConstant } from "const";
import { useDispatch, useSelector } from "react-redux";
import ProjectActions from "reduxStore/project.redux";
import { createContext } from "react";
import TaskAdditionOptionsModal from "./TaskTab/TaskAdditionOptionsModal";

const ProjectDetailScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const projectId = route.params?.projectId;

  const [activatedTab, setActivatedTab] = useState(
    PROJECT_DETAIL_TAB_VALUES.info,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const authUser = useSelector(({ authRedux }) => authRedux.user);
  const project = useSelector(({ projectRedux }) => projectRedux.project);

  const hasPermission = useMemo(() => {
    return [
      AppConstant.USER_ROLE.admin,
      AppConstant.USER_ROLE.manager,
    ].includes(authUser.role);
  }, [authUser.role]);

  const handleGetProjectDetail = useCallback(() => {
    dispatch(ProjectActions.getProjectDetailRequest(projectId));
  }, [projectId, dispatch]);

  const onNavigateToEditScreen = () => {
    navigation.navigate(SCREEN_NAME.projectEditingScreen, { project });
  };

  const onNavigateToEditMemberScreen = () => {
    navigation.navigate(SCREEN_NAME.projectMemberEditingScreen);
  };

  const handleCloseModal = useCallback(() => {
    setIsVisibleModal(false);
  }, []);

  const onRenderHeaderRight = () => {
    switch (activatedTab) {
      case PROJECT_DETAIL_TAB_VALUES.member:
        return (
          <CommonIconButton onPress={onNavigateToEditMemberScreen}>
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
          <CommonIconButton onPress={() => setIsVisibleModal(true)}>
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
    <ProjectTaskContext.Provider value={{ hasPermission }}>
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

        <TaskAdditionOptionsModal
          isVisible={isVisibleModal}
          onCloseModal={handleCloseModal}
        />
      </MainLayout>
    </ProjectTaskContext.Provider>
  );
};

export const ProjectTaskContext = createContext();

export default ProjectDetailScreen;
