import React, { memo } from "react";
import PropTypes from "prop-types";
import { CommonTabs } from "components";
import { APPLICATION_STATUS } from "const/app.const";
import { onGetApplicationStatusLabel } from "utils/label.utils";

const CandidateTabBar = ({ activatedTab, setActivatedTab, ...otherProps }) => {
  return (
    <CommonTabs
      value={activatedTab}
      setValue={setActivatedTab}
      data={TAB_DATA}
      {...otherProps}
    />
  );
};

export default memo(CandidateTabBar);

CandidateTabBar.propTypes = {
  activatedTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setActivatedTab: PropTypes.func,
};

export const TAB_DATA = [
  {
    label: onGetApplicationStatusLabel(APPLICATION_STATUS.screening),
    tabValue: APPLICATION_STATUS.screening,
  },
  {
    label: onGetApplicationStatusLabel(APPLICATION_STATUS.interview),
    tabValue: APPLICATION_STATUS.interview,
  },
  {
    label: onGetApplicationStatusLabel(APPLICATION_STATUS.hire),
    tabValue: APPLICATION_STATUS.hire,
  },
  {
    label: onGetApplicationStatusLabel(APPLICATION_STATUS.reject),
    tabValue: APPLICATION_STATUS.reject,
  },
];
