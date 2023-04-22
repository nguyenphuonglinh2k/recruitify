import { ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { MainLayout } from "layouts";
import { useRoute } from "@react-navigation/core";
import {
  CommonButton,
  DateInputBlock,
  EditAttendeeBlock,
  TextInputBlock,
  TextInputSelectBlock,
  TimeInputBlock,
} from "components";
import { Fragment } from "react";

const ScheduleDetailEditingScreen = () => {
  const route = useRoute();
  const schedule = route.params?.schedule;

  const [fields, setFields] = useState(DEFAULT_FIELDS);

  return (
    <MainLayout isBackScreen headerProps={{ title: "Edit schedule" }}>
      <ScrollView style={{ flex: 1 }}>
        <TextInputBlock label="Title" />
        <DateInputBlock label="Date" />
        <TimeInputBlock label="Time" />
        <TextInputBlock label="Description" />
        <TextInputSelectBlock label="Position" data={MOCK_POSITIONS} />

        <EditAttendeeBlock
          label="Candidate"
          data={MOCK_CANDIDATE}
          {...(MOCK_CANDIDATE?.length
            ? { labelRightAdornment: <Fragment /> }
            : {})}
        />
        <EditAttendeeBlock label="Attendees" data={MOCK_ATTENDEES} />
      </ScrollView>

      <CommonButton label="Save" style={{ margin: 10, borderRadius: 8 }} />
    </MainLayout>
  );
};

const FIELD_NAMES = {
  name: "name",
  email: "email",
  phoneNumber: "phoneNumber",
  skills: "skills",
  avatarUrl: "avatarUrl",
  address: "address",
  attachments: "attachments",
  jobId: "jobId",
};

const DEFAULT_FIELDS = {
  [FIELD_NAMES.avatarUrl]: null,
  [FIELD_NAMES.name]: "",
  [FIELD_NAMES.email]: "",
  [FIELD_NAMES.phoneNumber]: "",
  [FIELD_NAMES.address]: "",
  [FIELD_NAMES.skills]: [],
  [FIELD_NAMES.attachments]: {},
  [FIELD_NAMES.jobId]: "",
};

const MOCK_POSITIONS = [
  {
    label: "Junior front end",
  },
  {
    label: "Junior back end",
  },
  {
    label: "Junior cloud computing",
  },
];

const MOCK_CANDIDATE = [
  {
    position: "Junior Frontend developer",
    name: "Alexander",
    avatarUrl:
      "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/hinh-anh-avatar-tiktok-cute.jpg",
  },
];

const MOCK_ATTENDEES = [
  {
    position: "Junior Frontend developer",
    name: "Alexander",
    avatarUrl:
      "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/hinh-anh-avatar-tiktok-cute.jpg",
  },
];

export default ScheduleDetailEditingScreen;

const styles = StyleSheet.create({});
