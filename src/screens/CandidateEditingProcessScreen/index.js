import { ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MainLayout } from "layouts";
import {
  ApplicationProcessStatus,
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
import { useSelector } from "react-redux";
import { paddingStyle } from "components/DetailItemRow";
import { APPLICATION_STATUS, RESULT_STATUS } from "const/app.const";
import {
  onGetApplicationStatusLabel,
  onGetResultStatusLabel,
} from "utils/label.utils";
import { ApplicationService, InterviewResultService } from "services";
import { ApiConstant } from "const";
import { useNavigation } from "@react-navigation/core";
import { useToast } from "react-native-toast-notifications";

const CandidateEditingProcessScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();

  const [RESULT, APPLICATION] = useSelector(
    ({ resultRedux, applicationRedux }) => [
      resultRedux.result,
      applicationRedux.application,
    ],
  );

  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [selectedStatusType, setSelectedStatusType] = useState();

  const canEditable = useMemo(
    () => fields.status !== APPLICATION_STATUS.screening,
    [fields.status],
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleStatusModal, setIsVisibleStatusModal] = useState(false);
  const [isVisibleRatingModal, setIsVisibleRatingModal] = useState(false);

  const hasChangeResult = useMemo(() => {
    return (
      RESULT?.status !== fields.resultStatus ||
      RESULT?.evaluation !== fields.evaluation ||
      RESULT?.description !== fields.description
    );
  }, [
    RESULT?.description,
    RESULT?.evaluation,
    RESULT?.status,
    fields.description,
    fields.evaluation,
    fields.resultStatus,
  ]);

  const statusModalData = useMemo(() => {
    if (selectedStatusType === STATUS_MODAL_TYPES.resultStatus) {
      return RESULT_STATUS_DATA;
    } else if (selectedStatusType === STATUS_MODAL_TYPES.applicationStatus) {
      return APPLICATION_STATUS_DATA;
    } else {
      return [];
    }
  }, [selectedStatusType]);

  const handleOpenStatusModal = useCallback(type => {
    setSelectedStatusType(type);
    setIsVisibleStatusModal(true);
  }, []);

  const handleChangeText = useCallback(
    (fieldName, newValue) => {
      setFields({ ...fields, [fieldName]: newValue });
    },
    [fields],
  );

  const handleChangeStatusModalValue = useCallback(
    newValue => {
      if (selectedStatusType === STATUS_MODAL_TYPES.applicationStatus) {
        handleChangeText(FIELD_NAMES.status, newValue);
      } else {
        handleChangeText(FIELD_NAMES.resultStatus, newValue);
      }
    },
    [handleChangeText, selectedStatusType],
  );

  const handleUpdateResult = useCallback(async () => {
    setIsLoading(true);

    const data = {
      status: fields.resultStatus,
      evaluation: fields.evaluation,
      description: fields.description,
    };
    try {
      const response = await InterviewResultService.putInterviewResult(
        RESULT?._id,
        data,
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
  }, [
    RESULT?._id,
    fields.description,
    fields.evaluation,
    fields.resultStatus,
    navigation,
    toast,
  ]);

  const handleCreateResult = useCallback(async () => {
    setIsLoading(true);

    const data = {
      status: fields.resultStatus,
      evaluation: fields.evaluation,
      description: fields.description,
      applicationId: APPLICATION._id,
    };
    try {
      const response = await InterviewResultService.postInterviewResult(data);

      if (response.status === ApiConstant.STT_CREATED) {
        navigation.goBack();
        toast.show("Evaluate candidate successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [
    APPLICATION._id,
    fields.description,
    fields.evaluation,
    fields.resultStatus,
    navigation,
    toast,
  ]);

  const handleUpdateApplicationStatus = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await ApplicationService.putApplication(
        APPLICATION._id,
        { status: fields.status },
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
  }, [APPLICATION._id, fields.status, navigation, toast]);

  const handleUpdateApplicationAndResult = useCallback(async () => {
    setIsLoading(true);

    try {
      const updateApplicationPromise = ApplicationService.putApplication(
        APPLICATION._id,
        { status: fields.status },
      );
      let resultPromise;

      if (RESULT?._id) {
        const data = {
          status: fields.resultStatus,
          evaluation: fields.evaluation,
          description: fields.description,
        };

        resultPromise = InterviewResultService.putInterviewResult(
          RESULT?._id,
          data,
        );
      } else {
        const data = {
          status: fields.resultStatus,
          evaluation: fields.evaluation,
          description: fields.description,
          applicationId: APPLICATION._id,
        };

        resultPromise = InterviewResultService.postInterviewResult(data);
      }

      const responses = await Promise.all([
        updateApplicationPromise,
        resultPromise,
      ]);

      const hasAllSuccessStatus = responses.every(
        res =>
          res.status === ApiConstant.STT_OK ||
          res.status === ApiConstant.STT_CREATED,
      );

      if (hasAllSuccessStatus) {
        navigation.goBack();
        toast.show("Update successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [
    APPLICATION._id,
    RESULT?._id,
    fields.description,
    fields.evaluation,
    fields.resultStatus,
    fields.status,
    navigation,
    toast,
  ]);

  const handleSaveChange = useCallback(async () => {
    if (
      (APPLICATION.status === fields.status && !canEditable) ||
      (APPLICATION.status === fields.status && canEditable && !hasChangeResult)
    ) {
      return;
    } else if (
      (!canEditable && APPLICATION.status !== fields.status) ||
      (canEditable && !hasChangeResult && APPLICATION.status !== fields.status)
    ) {
      handleUpdateApplicationStatus();
    } else if (APPLICATION.status === fields.status && canEditable) {
      if (RESULT?._id) {
        handleUpdateResult();
      } else {
        handleCreateResult();
      }
    } else if (
      APPLICATION.status !== fields.status &&
      canEditable &&
      hasChangeResult
    ) {
      handleUpdateApplicationAndResult();
    }
  }, [
    APPLICATION.status,
    RESULT?._id,
    canEditable,
    fields.status,
    handleCreateResult,
    handleUpdateApplicationAndResult,
    handleUpdateApplicationStatus,
    handleUpdateResult,
    hasChangeResult,
  ]);

  useEffect(() => {
    setFields({
      status: APPLICATION.status,
      resultStatus: RESULT?.status ?? DEFAULT_FIELDS.resultStatus,
      evaluation: RESULT?.evaluation ?? DEFAULT_FIELDS.evaluation,
      description: RESULT?.description ?? DEFAULT_FIELDS.description,
    });
  }, [APPLICATION, RESULT?.description, RESULT?.evaluation, RESULT?.status]);

  return (
    <MainLayout
      isBackScreen
      headerProps={{
        title: `Edit ${APPLICATION.applicantInfo?.name}'s process`,
      }}
    >
      <ScrollView>
        <DetailItemRow
          label="Application Status *"
          content={
            <TouchableOpacity
              style={paddingStyle}
              onPress={() =>
                handleOpenStatusModal(STATUS_MODAL_TYPES.applicationStatus)
              }
            >
              <ApplicationProcessStatus value={fields.status} />
            </TouchableOpacity>
          }
        />

        <DetailItemRow
          disabled={!canEditable}
          label="Result Status *"
          content={
            <TouchableOpacity
              activeOpacity={canEditable ? 0.7 : 1}
              style={paddingStyle}
              onPress={
                canEditable
                  ? () => handleOpenStatusModal(STATUS_MODAL_TYPES.resultStatus)
                  : null
              }
            >
              <ResultStatus value={fields.resultStatus} />
            </TouchableOpacity>
          }
        />
        <SelectInputBlock
          disabled={!canEditable}
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
          disabled={!canEditable}
          label="Description"
          textInputProps={{ maxLength: 200, multiline: true }}
          value={fields.description}
          onChangeText={value =>
            handleChangeText(FIELD_NAMES.description, value)
          }
        />
      </ScrollView>

      <CommonButton
        disabled={APPLICATION.status === fields.status && !hasChangeResult}
        label="Save"
        style={{ margin: 16 }}
        onPress={handleSaveChange}
      />

      <StatusOptionsModal
        value={
          selectedStatusType === STATUS_MODAL_TYPES.applicationStatus
            ? fields.status
            : fields.resultStatus
        }
        setValue={handleChangeStatusModalValue}
        isVisible={isVisibleStatusModal}
        data={statusModalData}
        onCloseModal={() => setIsVisibleStatusModal(false)}
      />
      <RatingOptionsModal
        isVisible={isVisibleRatingModal}
        value={fields.evaluation}
        setValue={newValue =>
          handleChangeText(FIELD_NAMES.evaluation, newValue)
        }
        onCloseModal={() => setIsVisibleRatingModal(false)}
      />

      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
};

const STATUS_MODAL_TYPES = {
  applicationStatus: 1,
  resultStatus: 2,
};

const RESULT_STATUS_DATA = [
  {
    value: RESULT_STATUS.qualified,
    label: onGetResultStatusLabel(RESULT_STATUS.qualified),
  },
  {
    value: RESULT_STATUS.unqualified,
    label: onGetResultStatusLabel(RESULT_STATUS.unqualified),
  },
];

const APPLICATION_STATUS_DATA = [
  {
    value: APPLICATION_STATUS.screening,
    label: onGetApplicationStatusLabel(APPLICATION_STATUS.screening),
  },
  {
    value: APPLICATION_STATUS.interview,
    label: onGetApplicationStatusLabel(APPLICATION_STATUS.interview),
  },
  {
    value: APPLICATION_STATUS.hire,
    label: onGetApplicationStatusLabel(APPLICATION_STATUS.hire),
  },
  {
    value: APPLICATION_STATUS.reject,
    label: onGetApplicationStatusLabel(APPLICATION_STATUS.reject),
  },
];

const FIELD_NAMES = {
  evaluation: "evaluation",
  description: "description",
  status: "status",
  resultStatus: "resultStatus",
};

const DEFAULT_FIELDS = {
  [FIELD_NAMES.status]: APPLICATION_STATUS.screening,
  [FIELD_NAMES.evaluation]: 5,
  [FIELD_NAMES.description]: "",
  [FIELD_NAMES.resultStatus]: RESULT_STATUS.qualified,
};

export default CandidateEditingProcessScreen;
