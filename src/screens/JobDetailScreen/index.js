import { MainLayout } from "layouts";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import JobTitleWithStatus from "./JobTitleWithStatus";
import JobDetailTabBar, { JOB_DETAIL_TAB_VALUES } from "./JobDetailTabBar";

const JobDetailScreen = () => {
  const [activatedTab, setActivatedTab] = useState(JOB_DETAIL_TAB_VALUES.info);

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
    </MainLayout>
  );
};

export default JobDetailScreen;

const MOCK_JOB_INFO = {
  title: "Senior .NET Developer",
  status: 1,
};

const styles = StyleSheet.create({});
