import React from "react";
import { MainLayout } from "layouts";
import { COLORS } from "utils";
import {
  CommonIconButton,
  DetailItemRow,
  ChipAvatarList,
  ProgressStatus,
} from "components";
import { PencilIcon } from "icons";
import { paddingStyle } from "components/DetailItemRow";
import moment from "moment";
import { AppConstant } from "const";
import { useRoute } from "@react-navigation/core";
import { View } from "react-native";

const TaskDetailScreen = () => {
  const router = useRoute();
  const task = router.params?.task ?? {};

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
          <ChipAvatarList data={[task.assigneeId]} style={paddingStyle} />
        }
      />
    </MainLayout>
  );
};

export default TaskDetailScreen;
