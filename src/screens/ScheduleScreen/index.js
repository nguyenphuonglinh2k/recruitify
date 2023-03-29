import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { MainLayout } from "layouts";
import { CommonCalendar } from "components";
import ScheduleTabBar, { SCHEDULE_TAB_VALUES } from "./ScheduleTabBar";

const ScheduleScreen = () => {
  const [activatedTab, setActivatedTab] = useState(
    SCHEDULE_TAB_VALUES.allSchedule,
  );

  return (
    <MainLayout>
      <ScheduleTabBar
        activatedTab={activatedTab}
        setActivatedTab={setActivatedTab}
        style={{ marginBottom: 10 }}
      />
      {activatedTab === SCHEDULE_TAB_VALUES.allSchedule && <CommonCalendar />}
      {activatedTab === SCHEDULE_TAB_VALUES.mySchedule && <CommonCalendar />}
    </MainLayout>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({});
