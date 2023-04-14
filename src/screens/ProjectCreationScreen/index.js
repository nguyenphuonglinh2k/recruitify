import { ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
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
import { useNavigation } from "@react-navigation/core";
import { useToast } from "react-native-toast-notifications";
import { useSelector } from "react-redux";

const ProjectCreationScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();

  const authUser = useSelector(({ authRedux }) => authRedux.user);

  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeText = (fieldName, newValue) => {
    setFields({ ...fields, [fieldName]: newValue });
  };

  const handleValidateFields = useCallback(() => {
    if (!fields.name) {
      return toast.show("Name is required", { type: "warning" });
    }
  }, [fields.name, toast]);

  const handleCreateProject = useCallback(async () => {
    handleValidateFields();
    setIsLoading(true);

    try {
      const response = await ProjectService.postProject({
        ...fields,
        creatorId: authUser._id,
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
  }, [handleValidateFields, fields, authUser._id, navigation, toast]);

  return (
    <MainLayout headerProps={{ title: "Create new project" }}>
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
          maxLength={200}
          multiline
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
        label="Create"
        style={{ margin: 16 }}
        onPress={handleCreateProject}
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

export default ProjectCreationScreen;

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
