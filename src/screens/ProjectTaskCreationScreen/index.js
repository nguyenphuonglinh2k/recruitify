import { ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { MainLayout } from "layouts";
import {
  CommonButton,
  DateInputBlock,
  DetailItemRow,
  LoadingSpinner,
  ProgressStatus,
  SelectInputBlock,
  StatusOptionsModal,
  TextInputBlock,
} from "components";
import { PROGRESS_STATUS } from "const/app.const";
import { onGetProjectAndTaskStatusLabel } from "utils/label.utils";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/core";
import moment from "moment";
import { ApiConstant, AppConstant } from "const";
import { paddingStyle } from "components/DetailItemRow";
import { TaskService } from "services";
import { useSelector } from "react-redux";

const ProjectTaskCreationScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();

  const PROJECT = useSelector(({ projectRedux }) => projectRedux.project);

  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState(null);

  const assigneeData = useMemo(() => {
    let data = [];
    if (PROJECT.memberIds) {
      data = PROJECT.memberIds.map(user => ({
        label: user.name,
        value: user._id,
      }));
    }
    return data;
  }, [PROJECT.memberIds]);

  const [modalData, modalValue] = useMemo(() => {
    switch (modalType) {
      case MODAL_TYPES.progress:
        return [PROGRESS_DATA, fields.progress];
      case MODAL_TYPES.status:
        return [STATUS_DATA, fields.status];
      case MODAL_TYPES.assignee:
        return [assigneeData, fields.assigneeId];
      default:
        return [];
    }
  }, [
    modalType,
    fields.progress,
    fields.status,
    fields.assigneeId,
    assigneeData,
  ]);

  const assigneeName = useMemo(() => {
    if (fields.assigneeId) {
      const assignee = assigneeData.find(
        user => user.value === fields.assigneeId,
      );
      return assignee?.label;
    }
    return "";
  }, [assigneeData, fields.assigneeId]);

  const handleSetModalValue = useCallback(
    newValue => {
      let fieldName = "";

      switch (modalType) {
        case MODAL_TYPES.progress:
          fieldName = FIELD_NAMES.progress;
          break;
        case MODAL_TYPES.status:
          fieldName = FIELD_NAMES.status;
          break;
        case MODAL_TYPES.assignee:
          fieldName = FIELD_NAMES.assigneeId;
          break;
      }
      if (fieldName) setFields({ ...fields, [fieldName]: newValue });
    },
    [fields, modalType],
  );

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

  const handleCreateTask = useCallback(async () => {
    let messages = "";

    if (!fields.name) {
      messages = "Name is required";
    } else if (!fields.assigneeId) {
      messages = "Assignee is required";
    }

    if (messages) return toast.show(messages, { type: "warning" });

    setIsLoading(true);

    try {
      const response = await TaskService.postTask({
        ...fields,
        projectId: PROJECT._id,
      });

      if (response.status === ApiConstant.STT_CREATED) {
        navigation.goBack();
        toast.show("Create successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [fields, PROJECT._id, navigation, toast]);

  return (
    <MainLayout isBackScreen headerProps={{ title: "Create new task" }}>
      <ScrollView>
        <DetailItemRow
          label="Status *"
          content={
            <TouchableOpacity
              style={paddingStyle}
              onPress={() => handleOpenModal(MODAL_TYPES.status)}
            >
              <ProgressStatus value={fields.status} />
            </TouchableOpacity>
          }
        />
        <TextInputBlock
          label="Name *"
          value={fields.name}
          onChangeText={value => handleChangeText(FIELD_NAMES.name, value)}
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
        <SelectInputBlock
          label="Progress"
          value={`${fields.progress ?? 0 * 10}%`}
          onPress={() => handleOpenModal(MODAL_TYPES.progress)}
        />
        <DetailItemRow label="Project" content={PROJECT.name} />
        <SelectInputBlock
          label="Assignee *"
          value={assigneeName}
          onPress={() => handleOpenModal(MODAL_TYPES.assignee)}
        />

        <DateInputBlock
          label="Starting date"
          value={fields.startDate}
          setValue={newDate => handleChangeText(FIELD_NAMES.startDate, newDate)}
        />
        <DateInputBlock
          label="Ending date"
          value={fields.endDate}
          setValue={newDate => handleChangeText(FIELD_NAMES.endDate, newDate)}
        />
      </ScrollView>

      <CommonButton
        label="Create"
        style={{ margin: 16 }}
        onPress={handleCreateTask}
      />

      <StatusOptionsModal
        value={modalValue}
        setValue={handleSetModalValue}
        isVisible={isVisibleModal}
        data={modalData}
        onCloseModal={() => setIsVisibleModal(false)}
      />
      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
};

const MODAL_TYPES = {
  status: 1,
  progress: 2,
  assignee: 3,
};

const PROGRESS_DATA = Array.from(Array(11).keys()).map(num => ({
  value: num,
  label: `${num * 10}%`,
}));

const STATUS_DATA = [
  {
    value: PROGRESS_STATUS.new,
    label: onGetProjectAndTaskStatusLabel(PROGRESS_STATUS.new),
  },
  {
    value: PROGRESS_STATUS.doing,
    label: onGetProjectAndTaskStatusLabel(PROGRESS_STATUS.doing),
  },
  {
    value: PROGRESS_STATUS.done,
    label: onGetProjectAndTaskStatusLabel(PROGRESS_STATUS.done),
  },
];

const FIELD_NAMES = {
  name: "name",
  progress: "progress",
  description: "description",
  startDate: "startDate",
  endDate: "endDate",
  status: "status",
  assigneeId: "assigneeId",
};

const DEFAULT_FIELDS = {
  [FIELD_NAMES.name]: "",
  [FIELD_NAMES.progress]: 0, // from 0 to 10
  [FIELD_NAMES.assigneeId]: null,
  [FIELD_NAMES.description]: "",
  [FIELD_NAMES.startDate]: moment().format(AppConstant.FORMAT_DATE_WITH_HYPHEN),
  [FIELD_NAMES.endDate]: moment().format(AppConstant.FORMAT_DATE_WITH_HYPHEN),
  [FIELD_NAMES.status]: PROGRESS_STATUS.new,
};

export default ProjectTaskCreationScreen;
