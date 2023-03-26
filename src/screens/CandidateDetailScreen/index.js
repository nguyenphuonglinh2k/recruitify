import { MainLayout } from "layouts";
import React, { useState } from "react";
import CandidateDetailTabBar, {
  CANDIDATE_DETAIL_TAB_VALUES,
} from "./CandidateDetailTabBar";
import { TitleWithStatus } from "components";
import InformationTab from "./InfomationTab";
import AttachmentTab from "./AttachmentTab";

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
    </MainLayout>
  );
};

export default CandidateDetailScreen;

const MOCK_CANDIDATE_INFO = {
  title: "Paul Harris",
  status: 1,
};
