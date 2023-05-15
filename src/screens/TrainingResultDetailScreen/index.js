import { ScrollView, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MainLayout } from "layouts";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/core";
import {
  CommonIconButton,
  CommonRating,
  DetailItemRow,
  LoadingSpinner,
  ResultStatus,
} from "components";
import { paddingStyle } from "components/DetailItemRow";
import { PencilIcon } from "icons";
import { TrainResultService } from "services";
import { ApiConstant } from "const";
import { SCREEN_NAME } from "const/path.const";

const TrainingResultDetailScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const router = useRoute();
  const RESULT_ID = router.params.resultId;

  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleGetResultDetail = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await TrainResultService.getTrainResultDetail(RESULT_ID);

      if (response.status === ApiConstant.STT_OK) {
        setResult(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [RESULT_ID]);

  const handleNavigateToEdit = useCallback(() => {
    navigation.navigate(SCREEN_NAME.trainingResultEditingScreen, { result });
  }, [navigation, result]);

  useEffect(() => {
    if (isFocused) {
      handleGetResultDetail();
    }
  }, [handleGetResultDetail, isFocused]);

  return (
    <MainLayout
      isBackScreen
      headerProps={{
        title: `${result?.candidateId?.name}'s result`,
        headerRight: (
          <CommonIconButton onPress={handleNavigateToEdit}>
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

      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
};

export default TrainingResultDetailScreen;
