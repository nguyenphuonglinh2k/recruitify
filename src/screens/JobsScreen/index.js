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
        <Header total={jobs.length} />

        <View style={styles.positions}>
          {jobs.map((data, index) => (
            <JobItem key={index} data={data} style={styles.marginBottom} />
          ))}
        </View>
      </ScrollView>
    </MainLayout>
  );
};

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
