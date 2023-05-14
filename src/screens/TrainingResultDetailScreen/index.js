import { ScrollView, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MainLayout } from "layouts";
import { useRoute } from "@react-navigation/core";
import {
  CommonIconButton,
  CommonRating,
  DetailItemRow,
  ResultStatus,
} from "components";
import { paddingStyle } from "components/DetailItemRow";
import { PencilIcon } from "icons";

const TrainingResultDetailScreen = () => {
  const router = useRoute();
  const RESULT_ID = router.params.resultId;

  const [result, setResult] = useState({});

  const handleGetResultDetail = useCallback(async () => {
    // TODO
  }, [RESULT_ID]);

  useEffect(() => {
    handleGetResultDetail();
  }, [handleGetResultDetail]);

  return (
    <MainLayout
      isBackScreen
      headerProps={{
        title: `Tom Herry's result`,
        headerRight: (
          <CommonIconButton>
            <PencilIcon />
          </CommonIconButton>
        ),
      }}
    >
      <ScrollView>
        <DetailItemRow
          label="Status"
          content={
            <View style={paddingStyle}>
              <ResultStatus value={result.status} />
            </View>
          }
        />
        <DetailItemRow
          label="Evaluation"
          content={
            <View style={paddingStyle}>
              <CommonRating value={result.evaluation} />
            </View>
          }
        />
        <DetailItemRow label="Description" content={result.description} />
      </ScrollView>
    </MainLayout>
  );
};

export default TrainingResultDetailScreen;

const styles = StyleSheet.create({});
