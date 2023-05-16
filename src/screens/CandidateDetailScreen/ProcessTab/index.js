import { ScrollView, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ApplicationProcessStatus,
  ChipAvatarList,
  CommonRating,
  DetailItemRow,
  LoadingSpinner,
  ProfileBottomSheetModal,
  ResultStatus,
} from "components";
import { COLORS } from "utils";
import { paddingStyle } from "components/DetailItemRow";
import { ScheduleService } from "services";
import { ApiConstant } from "const";
import { useIsFocused } from "@react-navigation/core";
import moment from "moment";
import { APPLICATION_STATUS, FORMAT_DATE_WITH_SLASH } from "const/app.const";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResultActions from "reduxStore/result.redux";

const ProcessTab = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [result, application] = useSelector(
    ({ resultRedux, applicationRedux }) => [
      resultRedux.result,
      applicationRedux.application,
    ],
  );

  const [schedule, setSchedule] = useState({});
  const [selectedUserId, setSelectedUserId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const isDisabledResult = useMemo(
    () => application.status === APPLICATION_STATUS.screening,
    [application.status],
  );

  const bottomSheetModalRef = useRef();

  const onOpenProfileModal = useCallback(userId => {
    setSelectedUserId(userId);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleGetResult = useCallback(async () => {
    dispatch(ResultActions.getInterviewResultDetailRequest(application._id));
  }, [application._id, dispatch]);

  const handleGetSchedule = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await ScheduleService.getScheduleDetailOfApplicant(
        application._id,
      );

      if (response.status === ApiConstant.STT_OK) {
        setSchedule(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [application._id]);

  useEffect(() => {
    if (isFocused && !isDisabledResult) {
      handleGetResult();
    }
  }, [isDisabledResult, handleGetResult, isFocused]);

  useEffect(() => {
    if (isFocused) handleGetSchedule();
  }, [handleGetSchedule, isFocused]);

  return (
    <>
      <ScrollView style={styles.root}>
        <DetailItemRow
          label="Status"
          content={
            <View style={paddingStyle}>
              <ApplicationProcessStatus value={application.status} />
            </View>
          }
        />
        <DetailItemRow
          label="Responsible for interviewing"
          content={
            schedule?.assigneeIds ? (
              <ChipAvatarList
                data={schedule.assigneeIds ?? []}
                style={styles.contentSpacing}
                onPress={onOpenProfileModal}
              />
            ) : (
              ""
            )
          }
        />
        <DetailItemRow
          label="Schedule time for interview"
          content={
            schedule?.date
              ? `${moment(schedule.date).format(FORMAT_DATE_WITH_SLASH)} ${
                  schedule.startTime
                } - ${schedule.endTime}`
              : ""
          }
        />
        <DetailItemRow
          disabled={isDisabledResult}
          label="Result Status"
          content={
            result?.status ? (
              <View style={paddingStyle}>
                <ResultStatus value={result.status} />
              </View>
            ) : (
              ""
            )
          }
        />
        <DetailItemRow
          disabled={isDisabledResult}
          label="Evaluation"
          content={
            result?.evaluation ? (
              <CommonRating value={result.evaluation} style={styles.rating} />
            ) : (
              ""
            )
          }
        />
        <DetailItemRow
          disabled={isDisabledResult}
          label="Description"
          content={result?.description}
        />
      </ScrollView>

      <ProfileBottomSheetModal
        ref={bottomSheetModalRef}
        userId={selectedUserId}
      />

      <LoadingSpinner isVisible={isLoading} />
    </>
  );
};

export default ProcessTab;

const styles = StyleSheet.create({
  root: {
    paddingVertical: 16,
    flex: 1,
  },
  rating: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: COLORS.grey[200],
    borderBottomWidth: 1,
  },
  contentSpacing: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[200],
  },
});
