import React, { memo } from "react";
import PropTypes from "prop-types";
import { CommonTabs } from "components";

const ScheduleTabBar = ({ activatedTab, setActivatedTab, ...otherProps }) => {
  return (
    <CommonTabs
      value={activatedTab}
      setValue={setActivatedTab}
      data={TAB_DATA}
      {...otherProps}
    />
  );
};

export default memo(ScheduleTabBar);

ScheduleTabBar.propTypes = {
  activatedTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setActivatedTab: PropTypes.func,
};

export const SCHEDULE_TAB_VALUES = {
  allSchedule: 1,
  mySchedule: 2,
};

export const TAB_DATA = [
  {
    label: "All Schedule",
    tabValue: SCHEDULE_TAB_VALUES.allSchedule,
  },
  {
    label: "My Schedule",
    tabValue: SCHEDULE_TAB_VALUES.mySchedule,
  },
];
