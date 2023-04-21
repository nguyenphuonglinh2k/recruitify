import { ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MainLayout } from "layouts";
import { useRoute } from "@react-navigation/core";
import {
  CommonButton,
  EditAttendeeBlock,
  SelectUserModal,
  TextInputBlock,
  TimeInputBlock,
} from "components";
import { PlusIcon } from "icons";
import { COLORS } from "utils";

const ScheduleAddition = () => {
  const route = useRoute();
  const date = route.params?.date;

  const [isVisibleAttendeeModal, setIsVisibleAttendeeModal] = useState(false);

  return (
    <MainLayout
      isBackScreen
      headerProps={{ title: `Create new schedule - ${date}` }}
    >
      <ScrollView>
        <TextInputBlock label="Title" />
        <TextInputBlock label="Description" />
        <TimeInputBlock label="Time" />
        <EditAttendeeBlock label="Attendees" data={MOCK_ATTENDEES} />

        <TextInputBlock
          label="Application"
          labelRightAdornment={
            <TouchableOpacity onPress={() => setIsVisibleAttendeeModal(true)}>
              <PlusIcon color={COLORS.green} />
            </TouchableOpacity>
          }
        />

        <SelectUserModal
          isVisible={isVisibleAttendeeModal}
          data={MOCK_ATTENDEES}
        />
        {/* <TextInputBlock label="Position" /> */}
      </ScrollView>

      <CommonButton label="Create" style={{ margin: 10, borderRadius: 8 }} />
    </MainLayout>
  );
};

const MOCK_ATTENDEES = [
  {
    position: "Junior Frontend developer",
    name: "Alexander",
    avatarUrl:
      "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/hinh-anh-avatar-tiktok-cute.jpg",
  },
  {
    position: "Junior Frontend developer",
    name: "Alexander",
    avatarUrl:
      "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/hinh-anh-avatar-tiktok-cute.jpg",
  },
];

export default ScheduleAddition;
