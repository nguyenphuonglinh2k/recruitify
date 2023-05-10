import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CommonCalendar, LoadingSpinner } from "components";
import { useNavigation } from "@react-navigation/core";
import { SCREEN_NAME } from "const/path.const";
import { ScheduleService } from "services";
import { ApiConstant } from "const";
import { COLORS } from "utils";
import { useSelector } from "react-redux";

const MySchedule = () => {
  const navigation = useNavigation();

  const AUTH_USER = useSelector(({ authRedux }) => authRedux.user);

  const [isLoading, setIsLoading] = useState(false);
  const [schedules, setSchedules] = useState([]);

  const calendarMarkedDates = useMemo(() => {
    return schedules.reduce((obj, currentItem) => {
      obj[currentItem.date] = {
        marked: true,
        selected: true,
        selectedColor: COLORS.grey[200],
        dotColor: COLORS.blue.neutral,
      };
      return obj;
    }, {});
  }, [schedules]);

  const onDayPress = dateObject => {
    navigation.navigate(SCREEN_NAME.scheduleListScreen, {
      date: dateObject.dateString,
    });
  };

  const handleGetSchedules = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await ScheduleService.getSchedules({
        params: {
          memberId: AUTH_USER._id,
        },
      });

      if (response.status === ApiConstant.STT_OK) {
        setSchedules(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [AUTH_USER._id]);

  useEffect(() => {
    handleGetSchedules();
  }, [handleGetSchedules]);

  return (
    <>
      <CommonCalendar
        onDayPress={onDayPress}
        markedDates={calendarMarkedDates}
      />

      <LoadingSpinner isVisible={isLoading} />
    </>
  );
};

export default MySchedule;
