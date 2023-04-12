import { MainLayout } from "layouts";
import React, { useCallback, useState } from "react";
import JobDetailTabBar, { JOB_DETAIL_TAB_VALUES } from "./JobDetailTabBar";
import InfoTab from "./InfoTab";
import AssigneesTab from "./AssigneesTab";
import DocumentTab from "./DocumentTab";
import CandidatesTab from "./CandidatesTabs";
import { TitleWithStatus } from "components";
import { useRoute } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import JobActions from "reduxStore/job.redux";
import { useEffect } from "react";

const JobDetailScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const jobId = route.params?.jobId;

  const [activatedTab, setActivatedTab] = useState(JOB_DETAIL_TAB_VALUES.info);

  const handleGetJobDetail = useCallback(() => {
    dispatch(JobActions.getJobDetailRequest(jobId));
  }, [jobId, dispatch]);

  useEffect(() => {
    handleGetJobDetail();
  }, [handleGetJobDetail]);

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
      {activatedTab === JOB_DETAIL_TAB_VALUES.info && <InfoTab />}
      {activatedTab === JOB_DETAIL_TAB_VALUES.assignees && <AssigneesTab />}
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
