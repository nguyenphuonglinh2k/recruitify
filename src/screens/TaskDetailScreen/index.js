import React, { useRef, useState } from "react";
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
} from "components";
import { PencilIcon } from "icons";
import { paddingStyle } from "components/DetailItemRow";
import moment from "moment";
import { ApiConstant, AppConstant } from "const";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useToast } from "react-native-toast-notifications";
import { ScrollView, View } from "react-native";
import { TaskService } from "services";

const TaskDetailScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const router = useRoute();
  const task = router.params?.task ?? {};
  const profileBottomSheetRef = useRef();

  const [isVisible, setIsVisible] = useState(false);

  const handleOpenBottomSheet = () => {
    profileBottomSheetRef.current?.present();
  };

  const handleOpenConfirmDeleteModal = () => {
    setIsVisible(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setIsVisible(false);
  };

  const handleDeleteTask = async () => {
    try {
      const response = await TaskService.deleteTask(task._id);

      if (response.status === ApiConstant.STT_OK) {
        navigation.goBack();
        toast.show("Delete successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout
      isBackScreen
      headerProps={{
        title: task.name,
        headerRight: (
          <CommonIconButton>
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
              data={[task.assigneeId]}
              style={paddingStyle}
              onPress={handleOpenBottomSheet}
            />
          }
        />
      </ScrollView>

      <CommonDeleteButton onPress={handleOpenConfirmDeleteModal} />

      <ConfirmDeleteModal
        title={task.name}
        isVisible={isVisible}
        onCancel={handleCloseConfirmDeleteModal}
        onOK={handleDeleteTask}
      />

      <ProfileBottomSheetModal
        ref={profileBottomSheetRef}
        userId={task.assigneeId._id}
      />
    </MainLayout>
  );
};

export default TaskDetailScreen;
