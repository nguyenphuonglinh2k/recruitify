import { ScrollView } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MainLayout } from "layouts";
import { useNavigation, useRoute } from "@react-navigation/core";
import {
  CommonAvatarChip,
  CommonButton,
  DateInputBlock,
  EditAttendeeBlock,
  LoadingSpinner,
  SelectInputBlock,
  SelectUserModal,
  CheckboxOptionsModal,
  TextInputBlock,
  TimeInputBlock,
} from "components";
import { ApplicationService, ScheduleService, UserService } from "services";
import { ApiConstant, AppConstant } from "const";
import moment from "moment";
import { useToast } from "react-native-toast-notifications";

const ScheduleDetailEditingScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const route = useRoute();
  const schedule = route.params?.schedule;

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleSelectModal, setIsVisibleSelectModal] = useState(false);

  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [selectedCheckboxData, setSelectedCheckboxData] = useState([]);
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);

  const candidateModalData = useMemo(() => {
    return applications.map(item => ({
      name: item.applicantInfo?.name,
      avatarUrl: item.applicantInfo?.avatarUrl,
      _id: item._id,
      jobId: item.jobId?._id,
    }));
  }, [applications]);

  const selectedCandidate = useMemo(() => {
    if (fields.application) {
      const application = applications.find(
        item => item._id === fields.application?._id,
      );
      return application?.applicantInfo ?? {};
    } else {
      return {};
    }
  }, [applications, fields.application]);

  const handleChangeAssigneeCheckboxData = useCallback(() => {
    const fieldAssigneeIds = (fields.assignees ?? []).map(user => user._id);
    const filterUsers = users.filter(
      user => !fieldAssigneeIds.includes(user._id),
    );

    const assignees = filterUsers.map(user => ({
      ...user,
      isChecked: false,
    }));

    setSelectedCheckboxData(assignees);
  }, [fields.assignees, users]);

  const handleChangeText = useCallback(
    (fieldName, newValue) => {
      setFields({ ...fields, [fieldName]: newValue });
    },
    [fields],
  );

  const handleAddSelectedCheckboxData = useCallback(() => {
    const filteredData = selectedCheckboxData.filter(item => item.isChecked);

    handleChangeText(FIELD_NAMES.assignees, [
      ...fields.assignees,
      ...filteredData,
    ]);

    setIsVisibleModal(false);
  }, [fields.assignees, handleChangeText, selectedCheckboxData]);

  const handleSelectCandidate = useCallback(
    newCandidate => {
      handleChangeText(FIELD_NAMES.application, newCandidate);
      setIsVisibleSelectModal(false);
    },
    [handleChangeText],
  );

  const handleEditSchedule = useCallback(async () => {
    if (!fields.name || !fields.startTime || !fields.endTime || !fields.date) {
      return toast.show("Please fill out required fields", { type: "warning" });
    }

    setIsLoading(true);

    const assigneeIds = fields.assignees.map(user => user._id);

    const data = {
      assigneeIds,
      date: fields.date,
      name: fields.name,
      description: fields.description,
      startTime: fields.startTime,
      endTime: fields.endTime,
      applicationId: fields.application?._id,
      jobId: fields.application?.jobId,
    };

    try {
      const response = await ScheduleService.putSchedule(schedule._id, data);

      if (response.status === ApiConstant.STT_OK) {
        navigation.goBack();
        toast.show("Update successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [schedule, fields, navigation, toast]);

  const handleGetData = useCallback(async () => {
    setIsLoading(true);

    try {
      const getUsersPromise = UserService.getUsers();
      const getApplicationPromise = ApplicationService.getApplications();

      const responses = await Promise.all([
        getUsersPromise,
        getApplicationPromise,
      ]);

      const hasAllSuccessStatus = responses.every(
        res => res.status === ApiConstant.STT_OK,
      );

      if (hasAllSuccessStatus) {
        const [usersResponseData, applicationsResponseData] = [
          responses[0].data,
          responses[1].data,
        ];

        setUsers(usersResponseData);
        setApplications(applicationsResponseData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (schedule) {
      const formattedApplication = {
        name: schedule.applicationId?.applicantInfo?.name,
        avatarUrl: schedule.applicationId?.applicantInfo?.avatarUrl,
        jobId: schedule.applicationId?.jobId?.id,
        _id: schedule.applicationId?._id,
      };
      setFields({
        name: schedule.name,
        description: schedule.description,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        assignees: schedule.assigneeIds,
        application: formattedApplication,
        date: schedule.date,
      });
    }
  }, [schedule]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  useEffect(() => {
    handleChangeAssigneeCheckboxData();
  }, [handleChangeAssigneeCheckboxData]);

  return (
    <MainLayout
      isBackScreen
      headerProps={{
        title: `Edit schedule`,
      }}
    >
      <ScrollView>
        <TextInputBlock
          label="Title *"
          value={fields.name}
          onChangeText={value => handleChangeText(FIELD_NAMES.name, value)}
        />
        <DateInputBlock
          label="Date *"
          value={fields.date}
          setValue={newDate => handleChangeText(FIELD_NAMES.date, newDate)}
        />
        <TimeInputBlock
          label="Time *"
          startValue={fields.startTime}
          endValue={fields.endTime}
          setStartValue={newValue =>
            handleChangeText(FIELD_NAMES.startTime, newValue)
          }
          setEndValue={newValue =>
            handleChangeText(FIELD_NAMES.endTime, newValue)
          }
        />
        <TextInputBlock
          label="Description"
          value={fields.description}
          onChangeText={value =>
            handleChangeText(FIELD_NAMES.description, value)
          }
          textInputProps={{ maxLength: 200, multiline: true }}
        />
        <EditAttendeeBlock
          label="Attendees"
          data={fields.assignees}
          setData={newData => handleChangeText(FIELD_NAMES.assignees, newData)}
          onAdd={() => setIsVisibleModal(true)}
        />
        <SelectInputBlock
          label="Candidate"
          value={
            selectedCandidate?.name && (
              <CommonAvatarChip
                label={selectedCandidate?.name}
                source={{
                  uri: selectedCandidate?.avatarUrl,
                }}
              />
            )
          }
          onPress={() => setIsVisibleSelectModal(true)}
        />
      </ScrollView>

      <CheckboxOptionsModal
        isVisible={isVisibleModal}
        data={selectedCheckboxData}
        setData={setSelectedCheckboxData}
        onCloseModal={() => setIsVisibleModal(false)}
        onAdd={handleAddSelectedCheckboxData}
      />

      <SelectUserModal
        isVisible={isVisibleSelectModal}
        data={candidateModalData}
        onCloseModal={() => setIsVisibleSelectModal(false)}
        onPress={newCandidate => handleSelectCandidate(newCandidate)}
      />

      <CommonButton
        label="Save"
        style={{ margin: 10 }}
        onPress={handleEditSchedule}
      />

      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
};

const FIELD_NAMES = {
  name: "name",
  description: "description",
  startTime: "startTime",
  endTime: "endTime",
  assignees: "assignees",
  application: "application",
  date: "date",
};

const DEFAULT_FIELDS = {
  [FIELD_NAMES.name]: "",
  [FIELD_NAMES.description]: "",
  [FIELD_NAMES.startTime]: "",
  [FIELD_NAMES.endTime]: "",
  [FIELD_NAMES.assignees]: [],
  [FIELD_NAMES.application]: {},
  [FIELD_NAMES.date]: moment().format(AppConstant.FORMAT_DATE_WITH_HYPHEN),
};

export default ScheduleDetailEditingScreen;
