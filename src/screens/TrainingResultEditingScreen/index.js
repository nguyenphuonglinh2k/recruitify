import { ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MainLayout } from "layouts";
import { useNavigation, useRoute } from "@react-navigation/core";
import {
  CommonButton,
  CommonRating,
  DetailItemRow,
  LoadingSpinner,
  RatingOptionsModal,
  ResultStatus,
  SelectInputBlock,
  StatusOptionsModal,
  TextInputBlock,
} from "components";
import { paddingStyle } from "components/DetailItemRow";
import { TrainResultService } from "services";
import { ApiConstant } from "const";
import { RESULT_STATUS } from "const/app.const";
import { onGetResultStatusLabel } from "utils/label.utils";
import { useToast } from "react-native-toast-notifications";

const TrainingResultEditingScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const router = useRoute();
  const RESULT = router.params.result;

  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleRatingModal, setIsVisibleRatingModal] = useState(false);

  const handleChangeText = useCallback(
    (fieldName, newValue) => {
      setFields({ ...fields, [fieldName]: newValue });
    },
    [fields],
  );

  const handleUpdateChange = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await TrainResultService.putTrainResult(
        RESULT._id,
        fields,
      );

      if (response.status === ApiConstant.STT_OK) {
        navigation.goBack();
        toast.show("Update successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [RESULT._id, fields, navigation, toast]);

  useEffect(() => {
    if (RESULT) {
      setFields({
        status: RESULT.status,
        evaluation: RESULT.evaluation,
        description: RESULT.description,
      });
    }
  }, [RESULT]);

  return (
    <MainLayout
      isBackScreen
      headerProps={{
        title: `Edit ${RESULT?.candidateId?.name}'s result`,
      }}
    >
      <ScrollView>
        <DetailItemRow
          label="Status *"
          content={
            <TouchableOpacity
              style={paddingStyle}
              onPress={() => setIsVisibleModal(true)}
            >
              <ResultStatus value={fields.status} />
            </TouchableOpacity>
          }
        />
        <SelectInputBlock
          label="Evaluation *"
          value={
            <CommonRating
              value={fields.evaluation}
              style={{ paddingVertical: 4 }}
            />
          }
          onPress={() => setIsVisibleRatingModal(true)}
        />
        <TextInputBlock
          label="Description"
          maxLength={200}
          multiline
          value={fields.description}
          onChangeText={value =>
            handleChangeText(FIELD_NAMES.description, value)
          }
        />
      </ScrollView>

      <CommonButton
        label="Save"
        style={{ margin: 16 }}
        onPress={handleUpdateChange}
      />

      <LoadingSpinner isVisible={isLoading} />

      <StatusOptionsModal
        value={fields.status}
        setValue={newValue => handleChangeText(FIELD_NAMES.status, newValue)}
        isVisible={isVisibleModal}
        data={STATUS_DATA}
        onCloseModal={() => setIsVisibleModal(false)}
      />
      <RatingOptionsModal
        isVisible={isVisibleRatingModal}
        value={fields.evaluation}
        setValue={newValue =>
          handleChangeText(FIELD_NAMES.evaluation, newValue)
        }
        onCloseModal={() => setIsVisibleRatingModal(false)}
      />
    </MainLayout>
  );
};

const STATUS_DATA = [
  {
    value: RESULT_STATUS.qualified,
    label: onGetResultStatusLabel(RESULT_STATUS.qualified),
  },
  {
    value: RESULT_STATUS.unqualified,
    label: onGetResultStatusLabel(RESULT_STATUS.unqualified),
  },
];

const FIELD_NAMES = {
  evaluation: "evaluation",
  description: "description",
  status: "status",
};

const DEFAULT_FIELDS = {
  [FIELD_NAMES.evaluation]: null,
  [FIELD_NAMES.description]: "",
  [FIELD_NAMES.status]: RESULT_STATUS.notEvaluated,
};

export default TrainingResultEditingScreen;
