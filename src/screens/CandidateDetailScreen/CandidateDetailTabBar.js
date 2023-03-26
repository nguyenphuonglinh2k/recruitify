import React, { memo } from "react";
import PropTypes from "prop-types";
import { CommonTabs } from "components";

const CandidateDetailTabBar = ({ activatedTab, setActivatedTab }) => {
  return (
    <CommonTabs
      value={activatedTab}
      setValue={setActivatedTab}
      data={TAB_DATA}
    />
  );
};

export default memo(CandidateDetailTabBar);

CandidateDetailTabBar.propTypes = {
  activatedTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setActivatedTab: PropTypes.func,
};

export const CANDIDATE_DETAIL_TAB_VALUES = {
  information: 1,
  attachment: 2,
  position: 3,
};

export const TAB_DATA = [
  {
    label: "Information",
    tabValue: CANDIDATE_DETAIL_TAB_VALUES.information,
  },
  {
    label: "Attachment",
    tabValue: CANDIDATE_DETAIL_TAB_VALUES.attachment,
  },
  {
    label: "Position",
    tabValue: CANDIDATE_DETAIL_TAB_VALUES.position,
  },
];
