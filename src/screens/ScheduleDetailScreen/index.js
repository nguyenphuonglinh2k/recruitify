import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useCallback, useRef } from "react";
import { MainLayout } from "layouts";
import { useRoute } from "@react-navigation/core";
import { useState } from "react";
import { CommonAvatarChip, CommonFloatButton, DetailItemRow } from "components";
import { PencilIcon } from "icons";
import { COLORS } from "utils";
import ChipAvatarList from "./ChipAvatarList";
import moment from "moment";
import { AppConstant } from "const";
import ProfileBottomSheetModal from "./ProfileBottomSheetModal";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const ScheduleDetailScreen = () => {
  const route = useRoute();
  const { id } = route.params;

  const bottomSheetModalRef = useRef();

  const [data, setData] = useState(MOCK_DATA);

  const onOpenProfileModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    // TODO: call API by id
  }, [id, setData]);

  return (
    <BottomSheetModalProvider>
      <MainLayout isBackScreen headerProps={{ title: data.title }}>
        <ScrollView style={styles.root}>
          <DetailItemRow
            label="Schedule date"
            content={moment(data.date).format(AppConstant.DATE_FORMAT_WITH_DAY)}
          />
          <DetailItemRow label="Schedule time" content={data.time} />
          <DetailItemRow label="Description" content={data.description} />

          <DetailItemRow
            label="Candidate"
            content={
              <View style={styles.contentSpacing}>
                <CommonAvatarChip
                  label={MOCK_CANDIDATE.name}
                  source={{ uri: MOCK_CANDIDATE.avatarUrl }}
                  onPress={onOpenProfileModal}
                />
              </View>
            }
          />
          <DetailItemRow label="Position" content={MOCK_CANDIDATE.position} />

          <DetailItemRow
            label="Attendees"
            content={
              <ChipAvatarList
                data={data.assignees}
                style={styles.contentSpacing}
                onPress={onOpenProfileModal}
              />
            }
          />
          <DetailItemRow
            label="Schedule creator"
            content={
              <ChipAvatarList
                data={[MOCK_CREATOR]}
                style={styles.contentSpacing}
                onPress={onOpenProfileModal}
              />
            }
          />
        </ScrollView>

        <CommonFloatButton icon={<PencilIcon color={COLORS.white} />} />

        <ProfileBottomSheetModal ref={bottomSheetModalRef} />
      </MainLayout>
    </BottomSheetModalProvider>
  );
};

const MOCK_CREATOR = {
  name: "Chakira",
  avatarUrl:
    "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/hinh-anh-avatar-tiktok-cute.jpg",
};

const MOCK_CANDIDATE = {
  position: "Junior Frontend developer",
  name: "Alexander",
  avatarUrl:
    "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/hinh-anh-avatar-tiktok-cute.jpg",
};

const MOCK_DATA = {
  title: "Base interview with John",
  date: "2023-03-30",
  time: "9:00 - 10:00",
  description:
    "We need to reflect on what happened in the iteration and identity actions for improvement going forward",
  assignees: [
    {
      name: "Sam Smith",
      avatarUrl:
        "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/hinh-anh-avatar-tiktok-cute.jpg",
    },
    {
      name: "Sam Smith",
      avatarUrl:
        "https://toigingiuvedep.vn/wp-content/uploads/2022/01/hinh-avatar-cute-nu.jpg",
    },
  ],
};

export default ScheduleDetailScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  contentSpacing: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[200],
  },
});
