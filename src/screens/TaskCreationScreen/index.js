import { ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { ProjectService, TaskService } from "services";
import { useSelector } from "react-redux";

const TaskCreationScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();

  const AUTH_USER = useSelector(({ authRedux }) => authRedux.user);

  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      return project.label;
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

  const handleCreateTask = useCallback(async () => {
    if (!fields.name) {
      return toast.show("Name is required", { type: "warning" });
    }
    setIsLoading(true);

    try {
      const response = await TaskService.postTask({
        ...fields,
        assigneeId: AUTH_USER._id,
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
  }, [fields, AUTH_USER._id, navigation, toast]);

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

  return (
    <MainLayout isBackScreen headerProps={{ title: "Create new task" }}>
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
        label="Create"
        style={{ margin: 16 }}
        onPress={handleCreateTask}
      />

      <StatusOptionsModal
        value={fields.status}
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
  assigneeId: "assigneeId",
};

const DEFAULT_FIELDS = {
  [FIELD_NAMES.name]: "",
  [FIELD_NAMES.progress]: 0, // from 0 to 10
  [FIELD_NAMES.projectId]: null,
  [FIELD_NAMES.assigneeId]: null,
  [FIELD_NAMES.description]: "",
  [FIELD_NAMES.startDate]: moment().format(AppConstant.FORMAT_DATE_WITH_HYPHEN),
  [FIELD_NAMES.endDate]: moment().format(AppConstant.FORMAT_DATE_WITH_HYPHEN),
  [FIELD_NAMES.status]: PROGRESS_STATUS.new,
};

export default TaskCreationScreen;
