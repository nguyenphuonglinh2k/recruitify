import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "./Header";
import { MainLayout } from "layouts";
import JobItem from "./JobItem";
import { CommonIconButton, EmptyData } from "components";
import { PlusIcon } from "icons";
import { COLORS } from "utils";
import { useDispatch, useSelector } from "react-redux";
import JobActions from "reduxStore/job.redux";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { SCREEN_NAME } from "const/path.const";
import { JOB_AND_APPLICATION_STATUS } from "const/app.const";
import JobTabBar from "./JobTabBar";

const JobsScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const jobs = useSelector(({ jobRedux }) => jobRedux.jobs);

  const [activatedTab, setActivatedTab] = useState(
    JOB_AND_APPLICATION_STATUS.active,
  );

  const handleGetJobs = useCallback(async () => {
    dispatch(JobActions.getJobsRequest({ params: { status: activatedTab } }));
  }, [activatedTab, dispatch]);

  const handleNavigateToCreationScreen = useCallback(() => {
    navigation.navigate(SCREEN_NAME.jobCreationScreen);
  }, [navigation]);

  useEffect(() => {
    if (isFocused) {
      handleGetJobs();
    }
  }, [isFocused, handleGetJobs]);

  return (
    <MainLayout
      headerProps={{
        headerRight: (
          <CommonIconButton onPress={handleNavigateToCreationScreen}>
            <PlusIcon color={COLORS.green} />
          </CommonIconButton>
        ),
      }}
    >
      <JobTabBar
        activatedTab={activatedTab}
        setActivatedTab={setActivatedTab}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header total={jobs.length} style={{ margin: 16 }} />

        <View style={styles.positions}>
          {jobs.length ? (
            jobs.map((data, index) => (
              <JobItem key={index} data={data} style={styles.marginBottom} />
            ))
          ) : (
            <EmptyData description="No job found!" />
          )}
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default JobsScreen;

const styles = StyleSheet.create({
  positions: {
    flex: 1,
    marginHorizontal: 16,
  },
  marginBottom: {
    marginBottom: 10,
  },
});
