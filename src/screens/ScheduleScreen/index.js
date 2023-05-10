import React, { useState } from "react";
import { MainLayout } from "layouts";
import { CommonCalendar } from "components";
import ScheduleTabBar, { SCHEDULE_TAB_VALUES } from "./ScheduleTabBar";
import { useNavigation } from "@react-navigation/core";
import { SCREEN_NAME } from "const/path.const";
import AllSchedules from "./AllSchedules";

const ScheduleScreen = () => {
  const navigation = useNavigation();

  const [activatedTab, setActivatedTab] = useState(
    SCHEDULE_TAB_VALUES.allSchedule,
  );

  const onDayPress = dateObject => {
    navigation.navigate(SCREEN_NAME.scheduleListScreen, {
      date: dateObject.dateString,
    });
  };

  return (
    <MainLayout>
      <ScheduleTabBar
        activatedTab={activatedTab}
        setActivatedTab={setActivatedTab}
        style={{ marginBottom: 10 }}
      />
      {activatedTab === SCHEDULE_TAB_VALUES.allSchedule && <AllSchedules />}
      {activatedTab === SCHEDULE_TAB_VALUES.mySchedule && (
        <CommonCalendar onDayPress={onDayPress} />
      )}
    </MainLayout>
  );
};

export default ScheduleScreen;
