import { MainLayout } from "layouts";
import React, { useState } from "react";
import JobDetailTabBar, { JOB_DETAIL_TAB_VALUES } from "./JobDetailTabBar";
import InfoTab from "./InfoTab/Details";
import AssigneesTab from "./AssigneesTab";
import DocumentTab from "./DocumentTab";
import CandidatesTab from "./CandidatesTabs";
import { TitleWithStatus } from "components";

const JobDetailScreen = () => {
  const [activatedTab, setActivatedTab] = useState(
    JOB_DETAIL_TAB_VALUES.assignees,
  );

  return (
    <MainLayout
      isBackScreen
      headerProps={{
        title: (
          <TitleWithStatus
            title={MOCK_JOB_INFO.title}
            status={MOCK_JOB_INFO.status}
          />
        ),
      }}
    >
      <JobDetailTabBar
        activatedTab={activatedTab}
        setActivatedTab={setActivatedTab}
      />
      {activatedTab === JOB_DETAIL_TAB_VALUES.assignees && <AssigneesTab />}
      {activatedTab === JOB_DETAIL_TAB_VALUES.info && <InfoTab />}
      {activatedTab === JOB_DETAIL_TAB_VALUES.candidates && <CandidatesTab />}
      {activatedTab === JOB_DETAIL_TAB_VALUES.documents && <DocumentTab />}
    </MainLayout>
  );
};

export default JobDetailScreen;

const MOCK_JOB_INFO = {
  title: "Senior .NET Developer",
  status: 1,
};
