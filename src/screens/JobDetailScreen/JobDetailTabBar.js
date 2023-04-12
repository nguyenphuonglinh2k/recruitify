import React, { memo } from "react";
import PropTypes from "prop-types";
import { CommonTabs } from "components";

const JobDetailTabBar = ({ activatedTab, setActivatedTab }) => {
  return (
    <CommonTabs
      value={activatedTab}
      setValue={setActivatedTab}
      data={TAB_DATA}
    />
  );
};

export default memo(JobDetailTabBar);

JobDetailTabBar.propTypes = {
  activatedTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setActivatedTab: PropTypes.func,
};

export const JOB_DETAIL_TAB_VALUES = {
  assignees: 2,
  info: 1,
  candidates: 3,
  documents: 4,
};

export const TAB_DATA = [
  {
    label: "Info",
    tabValue: JOB_DETAIL_TAB_VALUES.info,
  },
  {
    label: "Assignees",
    tabValue: JOB_DETAIL_TAB_VALUES.assignees,
  },
  {
    label: "Candidates",
    tabValue: JOB_DETAIL_TAB_VALUES.candidates,
  },
  {
    label: "Documents",
    tabValue: JOB_DETAIL_TAB_VALUES.documents,
  },
];
