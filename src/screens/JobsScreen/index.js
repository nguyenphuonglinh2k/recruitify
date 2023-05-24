import React, { useCallback, useEffect } from "react";
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

const JobsScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const jobs = useSelector(({ jobRedux }) => jobRedux.jobs);

  const handleGetJobs = useCallback(async () => {
    dispatch(JobActions.getJobsRequest());
  }, [dispatch]);

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
      <ScrollView>
        <Header total={jobs.length} style={{ margin: 16 }} />

        <View style={styles.positions}>
          {jobs.length ? (
            jobs.map((data, index) => (
              <JobItem key={index} data={data} style={styles.marginBottom} />
            ))
          ) : (
            <EmptyData description="No position found!" />
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
