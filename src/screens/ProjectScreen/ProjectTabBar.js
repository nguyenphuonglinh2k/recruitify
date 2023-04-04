import React, { memo } from "react";
import PropTypes from "prop-types";
import { CommonTabs } from "components";
import { PROJECT_AND_TASK_STATUS } from "const/app.const";
import { onGetProjectAndTaskStatusLabel } from "utils/label.utils";

const ProjectTabBar = ({ activatedTab, setActivatedTab, ...otherProps }) => {
  return (
    <CommonTabs
      value={activatedTab}
      setValue={setActivatedTab}
      data={TAB_DATA}
      {...otherProps}
    />
  );
};

export default memo(ProjectTabBar);

ProjectTabBar.propTypes = {
  activatedTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setActivatedTab: PropTypes.func,
};

export const TAB_DATA = [
  {
    label: onGetProjectAndTaskStatusLabel(PROJECT_AND_TASK_STATUS.new),
    tabValue: PROJECT_AND_TASK_STATUS.new,
  },
  {
    label: onGetProjectAndTaskStatusLabel(PROJECT_AND_TASK_STATUS.doing),
    tabValue: PROJECT_AND_TASK_STATUS.doing,
  },
  {
    label: onGetProjectAndTaskStatusLabel(PROJECT_AND_TASK_STATUS.done),
    tabValue: PROJECT_AND_TASK_STATUS.done,
  },
];
