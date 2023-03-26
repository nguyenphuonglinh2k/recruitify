import { MainLayout } from "layouts";
import React, { useState } from "react";
import CandidateDetailTabBar, {
  CANDIDATE_DETAIL_TAB_VALUES,
} from "./CandidateDetailTabBar";
import { TitleWithStatus } from "components";
import InformationTab from "./InformationTab";
import AttachmentTab from "./AttachmentTab";
import PositionTab from "./PositionTab";
import ProcessTab from "./ProcessTab";

const CandidateDetailScreen = () => {
  const [activatedTab, setActivatedTab] = useState(
    CANDIDATE_DETAIL_TAB_VALUES.information,
  );

  return (
    <MainLayout
      isBackScreen
      headerProps={{
        title: (
          <TitleWithStatus
            title={MOCK_CANDIDATE_INFO.title}
            status={MOCK_CANDIDATE_INFO.status}
          />
        ),
      }}
    >
      <CandidateDetailTabBar
        activatedTab={activatedTab}
        setActivatedTab={setActivatedTab}
      />
      {activatedTab === CANDIDATE_DETAIL_TAB_VALUES.information && (
        <InformationTab />
      )}
      {activatedTab === CANDIDATE_DETAIL_TAB_VALUES.attachment && (
        <AttachmentTab />
      )}
      {activatedTab === CANDIDATE_DETAIL_TAB_VALUES.position && <PositionTab />}
      {activatedTab === CANDIDATE_DETAIL_TAB_VALUES.process && <ProcessTab />}
    </MainLayout>
  );
};

export default CandidateDetailScreen;

const MOCK_CANDIDATE_INFO = {
  title: "Paul Harris",
  status: 1,
};
