import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { MainLayout } from "layouts";
import ApplicationStatistics from "./ApplicationStatistics";
import Activities from "./Activities";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useIsFocused } from "@react-navigation/core";
import { LoadingSpinner } from "components";
import { ApplicationService } from "services";
import { ApiConstant } from "const";

const CandidateOverviewScreen = () => {
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);
  const [applicationStatistics, setApplicationStatistics] = useState({});
  const [activities, setActivities] = useState(DEFAULT_ACTIVITIES);

  const handleGetAllStatistics = useCallback(async () => {
    setIsLoading(true);

    try {
      const getApplicationStatisticsPromise =
        ApplicationService.getApplicationStatistics();
      const getApplicationActivityStatisticsPromise =
        ApplicationService.getApplicationActivityStatistics();

      const responses = await Promise.all([
        getApplicationStatisticsPromise,
        getApplicationActivityStatisticsPromise,
      ]);

      const hasAllSuccessStatus = responses.every(
        response => response.status === ApiConstant.STT_OK,
      );

      if (hasAllSuccessStatus) {
        setApplicationStatistics(responses[0].data);
        setActivities(responses[1].data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  useEffect(() => {
    if (isFocused) {
      handleGetAllStatistics();
    }
  }, [handleGetAllStatistics, isFocused]);

  return (
    <MainLayout>
      <ScrollView style={{ margin: 16 }} showsVerticalScrollIndicator={false}>
        <ApplicationStatistics
          style={styles.bottomSpacing}
          data={applicationStatistics}
        />

        <Activities data={activities} />
      </ScrollView>
      <LoadingSpinner isVisible={isLoading} hasBackdrop={false} />
    </MainLayout>
  );
};

const DEFAULT_ACTIVITIES = {
  today: 0,
  yesterday: 0,
  thisMonth: 0,
  thisWeek: 0,
  lastMonth: 0,
  lastWeek: 0,
};

export default CandidateOverviewScreen;

const styles = StyleSheet.create({
  bottomSpacing: {
    marginBottom: 16,
  },
});
