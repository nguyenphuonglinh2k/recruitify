import React, { useCallback, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "./Header";
import { MainLayout } from "layouts";
import JobItem from "./JobItem";
import { CommonIconButton } from "components";
import { PlusIcon } from "icons";
import { COLORS } from "utils";
import { useDispatch, useSelector } from "react-redux";
import JobActions from "reduxStore/job.redux";
import { useIsFocused } from "@react-navigation/core";

const JobsScreen = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const jobs = useSelector(({ jobRedux }) => jobRedux.jobs);

  const handleGetJobs = useCallback(async () => {
    dispatch(JobActions.getJobsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (isFocused) {
      handleGetJobs();
    }
  }, [isFocused, handleGetJobs]);

  return (
    <MainLayout
      headerProps={{
        headerRight: (
          <CommonIconButton>
            <PlusIcon color={COLORS.green} />
          </CommonIconButton>
        ),
      }}
    >
      <ScrollView style={styles.root}>
        <Header />

        <View style={styles.positions}>
          {jobs.map((data, index) => (
            <JobItem key={index} data={data} style={styles.marginBottom} />
          ))}
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const MOCK_DATA = Array.from(new Array(3)).map(() => ({
  title: "Font-end Engineer",
  isPriority: true,
  appliedResumeTotal: 7,
  startDate: "01/03/2023",
  endDate: "01/04/2023",
  assignees: [
    {
      avatarUrl:
        "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/hinh-anh-avatar-tiktok-cute.jpg",
    },
    {
      avatarUrl:
        "https://toigingiuvedep.vn/wp-content/uploads/2022/01/hinh-avatar-cute-nu.jpg",
    },
    {
      avatarUrl:
        "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl=1",
    },
  ],
}));

export default JobsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  positions: {
    flex: 1,
    marginTop: 16,
  },
  marginBottom: {
    marginBottom: 10,
  },
});
