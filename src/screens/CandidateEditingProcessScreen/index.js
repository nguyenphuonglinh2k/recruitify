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

const CandidateEditingProcessScreen = () => {
  const APPLICATION = useSelector(
    ({ applicationRedux }) => applicationRedux.application,
  );

  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [selectedStatusType, setSelectedStatusType] = useState();

  useEffect(() => {
    if (APPLICATION) {
      setFields({
        status: APPLICATION.status,
      });
    }
  }, [APPLICATION]);

  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleStatusModal, setIsVisibleStatusModal] = useState(false);
  const [isVisibleRatingModal, setIsVisibleRatingModal] = useState(false);

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

  const handleSaveChange = useCallback(async () => {
    setIsLoading(true);
  }, []);

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
          label="Result Status *"
          content={
            <TouchableOpacity
              style={paddingStyle}
              onPress={() =>
                handleOpenStatusModal(STATUS_MODAL_TYPES.resultStatus)
              }
            >
              <ResultStatus value={fields.resultStatus} />
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
        onPress={handleSaveChange}
      />

      <StatusOptionsModal
        value={fields.status}
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

      <LoadingSpinner isLoading={isLoading} />
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
  [FIELD_NAMES.evaluation]: null,
  [FIELD_NAMES.description]: "",
  [FIELD_NAMES.resultStatus]: RESULT_STATUS.qualified,
};

export default CandidateEditingProcessScreen;
