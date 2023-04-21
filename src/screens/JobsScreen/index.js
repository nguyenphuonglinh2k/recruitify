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
