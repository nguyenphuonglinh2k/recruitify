import React, { useState } from "react";
import { MainLayout } from "layouts";
import ScheduleTabBar, { SCHEDULE_TAB_VALUES } from "./ScheduleTabBar";
import AllSchedules from "./AllSchedules";
import MySchedule from "./MySchedule";

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
      {activatedTab === SCHEDULE_TAB_VALUES.allSchedule && <AllSchedules />}
      {activatedTab === SCHEDULE_TAB_VALUES.mySchedule && <MySchedule />}
    </MainLayout>
  );
};

export default ScheduleScreen;
