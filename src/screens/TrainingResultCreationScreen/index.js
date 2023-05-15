import { ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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

const TrainingResultCreationScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const router = useRoute();

  const CANDIDATE = router.params?.candidate;

  const [fields, setFields] = useState({
    ...DEFAULT_FIELDS,
    candidateId: CANDIDATE?._id ?? DEFAULT_FIELDS.candidateId,
  });
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleRatingModal, setIsVisibleRatingModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [users, setUsers] = useState([]);

  const candidateData = useMemo(() => {
    const data = users.map(user => ({
      label: user.name,
      value: user._id,
    }));

    return data ?? [];
  }, [users]);

  const [modalData, modalValue] = useMemo(() => {
    switch (modalType) {
      case MODAL_TYPES.status:
        return [STATUS_DATA, fields.status];
      case MODAL_TYPES.candidate:
        return [candidateData, fields.candidateId];
      default:
        return [];
    }
  }, [candidateData, fields.candidateId, fields.status, modalType]);

  const assigneeName = useMemo(() => {
    if (fields.candidateId) {
      const candidate = candidateData.find(
        user => user.value === fields.candidateId,
      );
      return candidate?.label;
    }
    return "";
  }, [candidateData, fields.candidateId]);

  const handleOpenModal = useCallback(type => {
    setModalType(type);
    setIsVisibleModal(true);
  }, []);

  const handleChangeText = useCallback(
    (fieldName, newValue) => {
      setFields({ ...fields, [fieldName]: newValue });
    },
    [fields],
  );

  const handleSetModalValue = useCallback(
    newValue => {
      let fieldName = "";

      switch (modalType) {
        case MODAL_TYPES.status:
          fieldName = FIELD_NAMES.status;
          break;
        case MODAL_TYPES.candidate:
          fieldName = FIELD_NAMES.candidateId;
          break;
      }

      if (fieldName) setFields({ ...fields, [fieldName]: newValue });
    },
    [fields, modalType],
  );

  const handleCreateResult = useCallback(async () => {
    if (!fields.candidateId) {
      return toast.show("Please fill out required fields", { type: "warning" });
    }

    setIsLoading(true);

    try {
      const response = await TrainResultService.postTrainResult(fields);

      if (response.status === ApiConstant.STT_CREATED) {
        navigation.goBack();
        toast.show("Create successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [fields, navigation, toast]);

  const handleGetUsers = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await TrainResultService.getNotEvaluatedUsers();

      if (response.status === ApiConstant.STT_OK) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers]);

  return (
    <MainLayout
      isBackScreen
      headerProps={{
        title: CANDIDATE?.name
          ? `Create ${CANDIDATE.name}'s evaluation`
          : "Create new evaluation",
      }}
    >
      <ScrollView>
        <DetailItemRow
          label="Status *"
          content={
            <TouchableOpacity
              style={paddingStyle}
              onPress={() => handleOpenModal(MODAL_TYPES.status)}
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
        {CANDIDATE?.name ? (
          <DetailItemRow label="Assignee *" content={CANDIDATE.name} />
        ) : (
          <SelectInputBlock
            label="Assignee *"
            value={assigneeName}
            onPress={() => handleOpenModal(MODAL_TYPES.candidate)}
          />
        )}

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
        label="Create"
        style={{ margin: 16 }}
        onPress={handleCreateResult}
      />

      <LoadingSpinner isVisible={isLoading} />

      <StatusOptionsModal
        value={modalValue}
        setValue={handleSetModalValue}
        isVisible={isVisibleModal}
        data={modalData}
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

const MODAL_TYPES = {
  status: 1,
  candidate: 3,
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
  candidateId: "candidateId",
};

const DEFAULT_FIELDS = {
  [FIELD_NAMES.evaluation]: 5,
  [FIELD_NAMES.description]: "",
  [FIELD_NAMES.status]: RESULT_STATUS.qualified,
  [FIELD_NAMES.candidateId]: null,
};

export default TrainingResultCreationScreen;
