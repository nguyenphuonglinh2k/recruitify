import { MainLayout } from "layouts";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import JobTitleWithStatus from "./JobTitleWithStatus";
import JobDetailTabBar, { JOB_DETAIL_TAB_VALUES } from "./JobDetailTabBar";
import InfoTab from "./InfoTab";
import AssigneesTab from "./AssigneesTab";
import DocumentTab from "./DocumentTab";
import CandidatesTab from "./CandidatesTabs";

const JobDetailScreen = () => {
  const [activatedTab, setActivatedTab] = useState(
    JOB_DETAIL_TAB_VALUES.assignees,
  );

  return (
    <MainLayout
      isBackScreen
      headerProps={{
        title: (
          <JobTitleWithStatus
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

const styles = StyleSheet.create({});
