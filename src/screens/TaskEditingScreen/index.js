import { ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MainLayout } from "layouts";
import { useNavigation, useRoute } from "@react-navigation/core";
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
import { useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import { ApiConstant, AppConstant } from "const";
import { ProjectService, TaskService } from "services";
import { paddingStyle } from "components/DetailItemRow";
import moment from "moment";
import { PROGRESS_STATUS } from "const/app.const";
import { onGetProjectAndTaskStatusLabel } from "utils/label.utils";

const TaskEditingScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const route = useRoute();
  const TASK = route.params.task;

  const AUTH_USER = useSelector(({ authRedux }) => authRedux.user);

  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [modalType, setModalType] = useState(null);

  const projectData = useMemo(() => {
    if (projects.length) {
      return projects.map(prj => ({ value: prj._id, label: prj.name }));
    } else {
      return [];
    }
  }, [projects]);

  const modalData = useMemo(() => {
    switch (modalType) {
      case MODAL_TYPES.progress:
        return PROGRESS_DATA;
      case MODAL_TYPES.project:
        return projectData;
      case MODAL_TYPES.status:
        return STATUS_DATA;
      default:
        return [];
    }
  }, [modalType, projectData]);

  const selectedProjectName = useMemo(() => {
    if (fields.projectId) {
      const project = projectData.find(prj => prj.value === fields.projectId);
      return project?.label;
    } else {
      return "";
    }
  }, [fields.projectId, projectData]);

  const handleSetModalValue = useCallback(
    newValue => {
      let fieldName = "";

      switch (modalType) {
        case MODAL_TYPES.progress:
          fieldName = FIELD_NAMES.progress;
          break;
        case MODAL_TYPES.project:
          fieldName = FIELD_NAMES.projectId;
          break;
        case MODAL_TYPES.status:
          fieldName = FIELD_NAMES.status;
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

  const handleValidateFields = useCallback(() => {
    if (!fields.name) {
      return toast.show("Name is required", { type: "warning" });
    }
  }, [fields.name, toast]);

  const handleEditTask = useCallback(async () => {
    handleValidateFields();
    setIsLoading(true);

    try {
      const response = await TaskService.putTask(TASK._id, fields);

      if (response.status === ApiConstant.STT_OK) {
        navigation.goBack();
        toast.show("Update successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [handleValidateFields, TASK._id, fields, navigation, toast]);

  const handleGetProjects = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await ProjectService.getProjects(AUTH_USER._id);

      if (response.status === ApiConstant.STT_OK) {
        setProjects(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [AUTH_USER._id]);

  useEffect(() => {
    handleGetProjects();
  }, [handleGetProjects]);

  useEffect(() => {
    setFields({
      name: TASK.name,
      description: TASK.description,
      projectId: TASK.projectId?._id,
      status: TASK.status,
      progress: TASK.progress,
      startDate: TASK.startDate,
      endDate: TASK.endDate,
    });
  }, [TASK]);

  return (
    <MainLayout
      isBackScreen
      headerProps={{ title: `Edit task "${TASK.name}"` }}
    >
      <ScrollView>
        <DetailItemRow
          label="Status"
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
          label="Name"
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
          value={`${fields.progress * 10}%`}
          onPress={() => handleOpenModal(MODAL_TYPES.progress)}
        />
        <SelectInputBlock
          label="Project"
          value={selectedProjectName}
          onPress={() => handleOpenModal(MODAL_TYPES.project)}
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
        label="Save"
        style={{ margin: 16 }}
        onPress={handleEditTask}
      />
      <LoadingSpinner isVisible={isLoading} />

      <StatusOptionsModal
        value={fields.status}
        setValue={handleSetModalValue}
        isVisible={isVisibleModal}
        data={modalData}
        onCloseModal={() => setIsVisibleModal(false)}
      />
    </MainLayout>
  );
};

const MODAL_TYPES = {
  status: 1,
  progress: 2,
  project: 3,
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
  projectId: "projectId",
  description: "description",
  startDate: "startDate",
  endDate: "endDate",
  status: "status",
};

const DEFAULT_FIELDS = {
  [FIELD_NAMES.name]: "",
  [FIELD_NAMES.progress]: 0, // from 0 to 10
  [FIELD_NAMES.projectId]: null,
  [FIELD_NAMES.description]: "",
  [FIELD_NAMES.startDate]: moment().format(AppConstant.FORMAT_DATE_WITH_HYPHEN),
  [FIELD_NAMES.endDate]: moment().format(AppConstant.FORMAT_DATE_WITH_HYPHEN),
  [FIELD_NAMES.status]: PROGRESS_STATUS.new,
};

export default TaskEditingScreen;
