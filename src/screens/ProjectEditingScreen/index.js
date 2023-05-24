import { ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MainLayout } from "layouts";
import {
  CommonButton,
  DateInputBlock,
  DetailItemRow,
  LoadingSpinner,
  ProgressStatus,
  StatusOptionsModal,
  TextInputBlock,
} from "components";
import moment from "moment";
import { PROGRESS_STATUS } from "const/app.const";
import { paddingStyle } from "components/DetailItemRow";
import { onGetProjectAndTaskStatusLabel } from "utils/label.utils";
import { ProjectService } from "services";
import { ApiConstant, AppConstant } from "const";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useToast } from "react-native-toast-notifications";

const ProjectEditingScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const route = useRoute();

  const PROJECT = route.params.project;

  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeText = (fieldName, newValue) => {
    setFields({ ...fields, [fieldName]: newValue });
  };

  const handleEditProject = useCallback(async () => {
    if (!fields.name) {
      return toast.show("Name is required", { type: "warning" });
    }
    setIsLoading(true);

    try {
      const response = await ProjectService.putProject(PROJECT._id, fields);

      if (response.status === ApiConstant.STT_OK) {
        navigation.goBack();
        toast.show("Update successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [PROJECT._id, fields, navigation, toast]);

  const handleSetDefaultFields = useCallback(() => {
    setFields({
      name: PROJECT.name,
      description: PROJECT.description,
      startDate: PROJECT.startDate,
      endDate: PROJECT.endDate,
      status: PROJECT.status,
    });
  }, [PROJECT]);

  useEffect(() => {
    handleSetDefaultFields();
  }, [handleSetDefaultFields]);

  return (
    <MainLayout
      isBackScreen
      headerProps={{ title: `Edit project "${PROJECT.name}"` }}
    >
      <ScrollView>
        <DetailItemRow
          label="Status"
          content={
            <TouchableOpacity
              style={paddingStyle}
              onPress={() => setIsVisibleModal(true)}
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
          textInputProps={{ maxLength: 200, multiline: true }}
          value={fields.description}
          onChangeText={value =>
            handleChangeText(FIELD_NAMES.description, value)
          }
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
        onPress={handleEditProject}
      />

      <StatusOptionsModal
        isVisible={isVisibleModal}
        value={fields.status}
        setValue={newValue => handleChangeText(FIELD_NAMES.status, newValue)}
        data={STATUS_DATA}
        onCloseModal={() => setIsVisibleModal(false)}
      />

      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
};

export default ProjectEditingScreen;

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
  description: "description",
  startDate: "startDate",
  endDate: "endDate",
  status: "status",
};

const DEFAULT_FIELDS = {
  [FIELD_NAMES.name]: "",
  [FIELD_NAMES.description]: "",
  [FIELD_NAMES.startDate]: moment().format(AppConstant.FORMAT_DATE_WITH_HYPHEN),
  [FIELD_NAMES.endDate]: moment().format(AppConstant.FORMAT_DATE_WITH_HYPHEN),
  [FIELD_NAMES.status]: PROGRESS_STATUS.new,
};
