import React, { useCallback, useEffect, useRef, useState } from "react";
import { MainLayout } from "layouts";
import { COLORS } from "utils";
import {
  CommonIconButton,
  DetailItemRow,
  ChipAvatarList,
  ProgressStatus,
  ProfileBottomSheetModal,
  CommonDeleteButton,
  ConfirmDeleteModal,
  LoadingSpinner,
} from "components";
import { PencilIcon } from "icons";
import { paddingStyle } from "components/DetailItemRow";
import moment from "moment";
import { ApiConstant, AppConstant } from "const";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/core";
import { useToast } from "react-native-toast-notifications";
import { ScrollView, View } from "react-native";
import { TaskService } from "services";
import { SCREEN_NAME } from "const/path.const";
import { useSelector } from "react-redux";

const TaskDetailScreen = () => {
  const toast = useToast();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const router = useRoute();
  const TASK_ID = router.params?.taskId;
  const profileBottomSheetRef = useRef();

  const AUTH_USER = useSelector(({ authRedux }) => authRedux.user);

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [task, setTask] = useState({});

  const handleOpenBottomSheet = () => {
    profileBottomSheetRef.current?.present();
  };

  const handleOpenConfirmDeleteModal = () => {
    setIsVisible(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setIsVisible(false);
  };

  const handleDeleteTask = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await TaskService.deleteTask(TASK_ID);

      if (response.status === ApiConstant.STT_OK) {
        navigation.goBack();
        toast.show("Delete successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [TASK_ID, navigation, toast]);

  const handleNavigateToDetail = useCallback(() => {
    navigation.navigate(SCREEN_NAME.taskEditingScreen, { task });
  }, [navigation, task]);

  const handleGetTaskDetail = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await TaskService.getTaskDetail(AUTH_USER._id, TASK_ID);

      if (response.status === ApiConstant.STT_OK) {
        setTask(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [TASK_ID, AUTH_USER]);
  console.log(task.assigneeId);

  useEffect(() => {
    if (isFocused) {
      handleGetTaskDetail();
    }
  }, [handleGetTaskDetail, isFocused]);

  return (
    <MainLayout
      isBackScreen
      headerProps={{
        title: task.name,
        headerRight: (
          <CommonIconButton onPress={handleNavigateToDetail}>
            <PencilIcon color={COLORS.green} />
          </CommonIconButton>
        ),
      }}
    >
      <ScrollView>
        <DetailItemRow
          label="Status"
          content={
            <View style={paddingStyle}>
              <ProgressStatus value={task.status} />
            </View>
          }
        />
        <DetailItemRow label="Project" content={task.projectId?.name} />
        <DetailItemRow label="Description" content={task.description} />
        <DetailItemRow label="Progress" content={`${task.progress * 10}%`} />
        <DetailItemRow
          label="Starting date"
          content={moment(task.startDate).format(
            AppConstant.FORMAT_DATE_WITH_SLASH,
          )}
        />
        <DetailItemRow
          label="Ending date"
          content={moment(task.endDate).format(
            AppConstant.FORMAT_DATE_WITH_SLASH,
          )}
        />
        <DetailItemRow
          label="Assignee"
          content={
            <ChipAvatarList
              data={task?.assigneeId ? [task?.assigneeId] : []}
              style={paddingStyle}
              onPress={handleOpenBottomSheet}
            />
          }
        />
      </ScrollView>

      <CommonDeleteButton
        onPress={handleOpenConfirmDeleteModal}
        style={{ margin: 10 }}
      />

      <ConfirmDeleteModal
        title={task.name}
        isVisible={isVisible}
        onCancel={handleCloseConfirmDeleteModal}
        onOK={handleDeleteTask}
      />

      <ProfileBottomSheetModal
        ref={profileBottomSheetRef}
        userId={task.assigneeId?._id}
      />

      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
};

export default TaskDetailScreen;
