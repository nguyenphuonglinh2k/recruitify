import React, { memo } from "react";
import PropTypes from "prop-types";
import { CommonTabs } from "components";
import { JOB_AND_APPLICATION_STATUS } from "const/app.const";
import { onGetJobAndApplicationStatus } from "utils/label.utils";

const JobTabBar = ({ activatedTab, setActivatedTab, ...otherProps }) => {
  return (
    <CommonTabs
      value={activatedTab}
      setValue={setActivatedTab}
      data={TAB_DATA}
      {...otherProps}
    />
  );
};

export default memo(JobTabBar);

JobTabBar.propTypes = {
  activatedTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setActivatedTab: PropTypes.func,
};

export const TAB_DATA = [
  {
    label: onGetJobAndApplicationStatus(JOB_AND_APPLICATION_STATUS.active),
    tabValue: JOB_AND_APPLICATION_STATUS.active,
  },
  {
    label: onGetJobAndApplicationStatus(JOB_AND_APPLICATION_STATUS.closed),
    tabValue: JOB_AND_APPLICATION_STATUS.closed,
  },
];
