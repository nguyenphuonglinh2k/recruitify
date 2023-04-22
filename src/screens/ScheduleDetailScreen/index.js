import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useCallback, useRef, useState } from "react";
import { MainLayout } from "layouts";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/core";
import {
  CommonAvatarChip,
  CommonDeleteButton,
  ConfirmDeleteModal,
  DetailItemRow,
  ChipAvatarList,
  LoadingSpinner,
  CommonIconButton,
} from "components";
import { PencilIcon } from "icons";
import { COLORS } from "utils";
import moment from "moment";
import { ApiConstant, AppConstant } from "const";
import { ProfileBottomSheetModal } from "components";
import { SCREEN_NAME } from "const/path.const";
import { ScheduleService } from "services";
import { useToast } from "react-native-toast-notifications";

const ScheduleDetailScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const toast = useToast();
  const route = useRoute();
  const { scheduleId } = route.params;

  const bottomSheetModalRef = useRef();

  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const onOpenProfileModal = useCallback(userId => {
    setSelectedUserId(userId);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleNavigateToEditScreen = () => {
    navigation.navigate(SCREEN_NAME.scheduleDetailEditingScreen, {
      schedule,
    });
  };

  const handleGetScheduleDetail = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await ScheduleService.getScheduleDetail(scheduleId);

      if (response.status === ApiConstant.STT_OK) {
        setSchedule(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [scheduleId]);

  const handleDeleteSchedule = async () => {
    setIsLoading(true);

    try {
      const response = await ScheduleService.deleteSchedule(scheduleId);

      if (response.status === ApiConstant.STT_OK) {
        navigation.goBack();
        toast.show("Delete successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      handleGetScheduleDetail();
    }
  }, [handleGetScheduleDetail, isFocused]);

  return (
    <MainLayout
      isBackScreen
      headerProps={{
        title: schedule.name,
        headerRight: (
          <CommonIconButton onPress={handleNavigateToEditScreen}>
            <PencilIcon />
          </CommonIconButton>
        ),
      }}
    >
      <ScrollView style={styles.root}>
        <DetailItemRow
          label="Date"
          content={moment(schedule.date).format(
            AppConstant.DATE_FORMAT_WITH_DAY,
          )}
        />
        <DetailItemRow
          label="Time"
          content={`${schedule.startTime} - ${schedule.endTime}`}
        />
        <DetailItemRow label="Description" content={schedule.description} />
        <DetailItemRow label="Position" content={schedule.jobId?.name} />

        <DetailItemRow
          label="Candidate"
          content={
            <View style={styles.contentSpacing}>
              <CommonAvatarChip
                label={schedule.applicationId?.applicantInfo?.name}
                source={{
                  uri: schedule.applicationId?.applicantInfo?.avatarUrl,
                }}
              />
            </View>
          }
        />

        <DetailItemRow
          label="Attendees"
          content={
            <ChipAvatarList
              data={schedule.assigneeIds ?? []}
              style={styles.contentSpacing}
              onPress={onOpenProfileModal}
            />
          }
        />
        <DetailItemRow
          label="Schedule creator"
          content={
            <ChipAvatarList
              data={schedule.creatorId ? [schedule.creatorId] : []}
              style={styles.contentSpacing}
              onPress={() => onOpenProfileModal(schedule.creatorId?._id)}
            />
          }
        />
        <CommonDeleteButton
          style={{ margin: 10 }}
          onPress={() => setIsVisibleModal(true)}
        />
      </ScrollView>

      <ConfirmDeleteModal
        title={schedule.name}
        isVisible={isVisibleModal}
        onOK={handleDeleteSchedule}
        onCancel={() => setIsVisibleModal(false)}
      />

      <ProfileBottomSheetModal
        ref={bottomSheetModalRef}
        userId={selectedUserId}
      />
      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
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
