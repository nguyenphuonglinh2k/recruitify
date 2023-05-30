import React, { memo } from "react";
import PropTypes from "prop-types";
import { CommonTabs } from "components";

const ProjectDetailTabBar = ({ activatedTab, setActivatedTab }) => {
  return (
    <CommonTabs
      value={activatedTab}
      setValue={setActivatedTab}
      data={TAB_DATA}
    />
  );
};

export default memo(ProjectDetailTabBar);

ProjectDetailTabBar.propTypes = {
  activatedTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setActivatedTab: PropTypes.func,
};

export const PROJECT_DETAIL_TAB_VALUES = {
  info: 1,
  task: 2,
  member: 3,
  overview: 4,
};

export const TAB_DATA = [
  {
    label: "Overview",
    tabValue: PROJECT_DETAIL_TAB_VALUES.overview,
  },
  {
    label: "Info",
    tabValue: PROJECT_DETAIL_TAB_VALUES.info,
  },
  {
    label: "Task",
    tabValue: PROJECT_DETAIL_TAB_VALUES.task,
  },
  {
    label: "Member",
    tabValue: PROJECT_DETAIL_TAB_VALUES.member,
  },
];
