import React, { memo } from "react";
import PropTypes from "prop-types";
import { CommonTabs } from "components";
import { PROGRESS_STATUS } from "const/app.const";
import { onGetProjectAndTaskStatusLabel } from "utils/label.utils";

const ProgressTabBar = ({ activatedTab, setActivatedTab, ...otherProps }) => {
  return (
    <CommonTabs
      value={activatedTab}
      setValue={setActivatedTab}
      data={TAB_DATA}
      {...otherProps}
    />
  );
};

export default memo(ProgressTabBar);

ProgressTabBar.propTypes = {
  activatedTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setActivatedTab: PropTypes.func,
};

export const TAB_DATA = [
  {
    label: onGetProjectAndTaskStatusLabel(PROGRESS_STATUS.new),
    tabValue: PROGRESS_STATUS.new,
  },
  {
    label: onGetProjectAndTaskStatusLabel(PROGRESS_STATUS.doing),
    tabValue: PROGRESS_STATUS.doing,
  },
  {
    label: onGetProjectAndTaskStatusLabel(PROGRESS_STATUS.done),
    tabValue: PROGRESS_STATUS.done,
  },
];
