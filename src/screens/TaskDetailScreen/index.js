import React from "react";
import { MainLayout } from "layouts";
import { COLORS } from "utils";
import { CommonIconButton, DetailItemRow, ChipAvatarList } from "components";
import { PencilIcon } from "icons";
import { paddingStyle } from "components/DetailItemRow";
import moment from "moment";
import { AppConstant } from "const";

const TaskDetailScreen = () => {
  return (
    <MainLayout
      isBackScreen
      headerProps={{
        title: MOCK_TASK.name,
        headerRight: (
          <CommonIconButton>
            <PencilIcon color={COLORS.green} />
          </CommonIconButton>
        ),
      }}
    >
      <DetailItemRow label="Project" content={MOCK_TASK.projectName} />
      <DetailItemRow label="Description" content={MOCK_TASK.description} />
      <DetailItemRow
        label="Progress"
        content={`${MOCK_TASK.progress * 100}%`}
      />
      <DetailItemRow
        label="Starting date"
        content={moment(MOCK_TASK.startDate).format(
          AppConstant.FORMAT_DATE_WITH_SLASH,
        )}
      />
      <DetailItemRow
        label="Ending date"
        content={moment(MOCK_TASK.endDate).format(
          AppConstant.FORMAT_DATE_WITH_SLASH,
        )}
      />
      <DetailItemRow
        label="Assignee"
        content={<ChipAvatarList data={MOCK_ASSIGNEE} style={paddingStyle} />}
      />
    </MainLayout>
  );
};

const MOCK_ASSIGNEE = [
  {
    position: "Junior Frontend developer",
    name: "Alexander",
    avatarUrl:
      "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/hinh-anh-avatar-tiktok-cute.jpg",
  },
];

const MOCK_TASK = {
  isPriority: true,
  name: "Create design version 01",
  description: "Task to design one frame",
  progress: 0.3,
  startDate: "2023-04-15",
  endDate: "2023-04-28",
  projectName: "Recruitify mobile design",
};

export default TaskDetailScreen;
