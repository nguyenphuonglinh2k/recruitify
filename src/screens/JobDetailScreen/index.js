import { MainLayout } from "layouts";
import React, { Fragment, useCallback, useState } from "react";
import JobDetailTabBar, { JOB_DETAIL_TAB_VALUES } from "./JobDetailTabBar";
import InfoTab from "./InfoTab";
import AssigneesTab from "./AssigneesTab";
import DocumentTab from "./DocumentTab";
import CandidatesTab from "./CandidatesTabs";
import { CommonIconButton, TitleWithStatus } from "components";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import JobActions from "reduxStore/job.redux";
import { useEffect } from "react";
import { PencilIcon } from "icons";
import { SCREEN_NAME } from "const/path.const";

const JobDetailScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const route = useRoute();
  const jobId = route.params?.jobId;

  const JOB = useSelector(({ jobRedux }) => jobRedux.job);

  const [activatedTab, setActivatedTab] = useState(JOB_DETAIL_TAB_VALUES.info);

  const handleGetJobDetail = useCallback(() => {
    dispatch(JobActions.getJobDetailRequest(jobId));
  }, [jobId, dispatch]);

  const handleNavigateToDetail = useCallback(() => {
    navigation.navigate(SCREEN_NAME.jobEditingScreen);
  }, [navigation]);

  const handleHeaderRight = useCallback(() => {
    if (activatedTab === JOB_DETAIL_TAB_VALUES.documents) {
      return <Fragment />;
    } else {
      return (
        <CommonIconButton onPress={handleNavigateToDetail}>
          <PencilIcon />
        </CommonIconButton>
      );
    }
  }, [activatedTab, handleNavigateToDetail]);

  useEffect(() => {
    if (isFocused) {
      handleGetJobDetail();
    }
  }, [handleGetJobDetail, isFocused]);

  return (
    <MainLayout
      isBackScreen
      headerProps={{
        title: <TitleWithStatus title={JOB.name} status={JOB.status} />,
        headerRight: handleHeaderRight(),
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
