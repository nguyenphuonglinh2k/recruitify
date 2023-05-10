import { ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MainLayout } from "layouts";
import {
  ApplicationProcessStatus,
  AttachmentUploadBlock,
  CommonButton,
  CommonUploadAvatar,
  EditTagBlock,
  LoadingSpinner,
  StatusOptionsModal,
  CheckboxOptionsModal,
  TextInputBlock,
} from "components";
import { useNavigation } from "@react-navigation/core";
import { useToast } from "react-native-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationService, TagService } from "services";
import { ApiConstant } from "const";
import JobActions from "reduxStore/job.redux";
import DetailItemRow, { paddingStyle } from "components/DetailItemRow";
import { APPLICATION_STATUS } from "const/app.const";
import { onGetApplicationStatusLabel } from "utils/label.utils";

const JobCandidateCreationScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();

  const JOB = useSelector(({ jobRedux }) => jobRedux.job);

  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [tags, setTags] = useState([]);
  const [tagDataModal, setTagDataModal] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isVisibleStatusModal, setIsVisibleStatusModal] = useState(false);

  const handleChangeText = useCallback(
    (fieldName, newValue) => {
      setFields({ ...fields, [fieldName]: newValue });
    },
    [fields],
  );

  const handleDeleteSkill = useCallback(
    index => {
      const skills = [...fields.skills];
      const newData = [...skills.slice(0, index), ...skills.slice(index + 1)];

      handleChangeText(FIELD_NAMES.skills, newData);
    },
    [fields.skills, handleChangeText],
  );

  const handleAddSelectedTags = useCallback(() => {
    const filteredData = tagDataModal.filter(item => item.isChecked);

    handleChangeText(FIELD_NAMES.skills, [...fields.skills, ...filteredData]);

    setIsVisibleModal(false);
  }, [tagDataModal, handleChangeText, fields.skills]);

  const handleGetTags = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await TagService.getTags();

      if (response.status === ApiConstant.STT_OK) {
        setTags(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleValidateFields = useCallback(() => {
    if (!fields.name || !fields.email || !fields.attachments) {
      return toast.show("Please fill out all required fields");
    }
  }, [fields.attachments, fields.email, fields.name, toast]);

  const handleCreateApplication = useCallback(async () => {
    handleValidateFields();
    setIsLoading(true);

    const skillIds = fields.skills.map(skill => skill._id);

    const data = {
      applicantInfo: {
        name: fields.name,
        email: fields.email,
        phoneNumber: fields.phoneNumber,
        address: fields.address,
        avatarUrl: fields.avatarUrl,
      },
      skillIds,
      jobId: JOB._id,
      attachments: [fields.attachments],
      status: fields.status,
    };

    try {
      const response = await ApplicationService.postApplication(data);

      console.log(response.status); // TODO

      if (response.status === ApiConstant.STT_CREATED) {
        navigation.goBack();
        toast("Create successfully", { type: "success" });
      }
    } catch (error) {
      console.log("error", error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [JOB._id, fields, handleValidateFields, navigation, toast]);

  const handleGetJobs = useCallback(() => {
    dispatch(JobActions.getJobsRequest());
  }, [dispatch]);

  useEffect(() => {
    const fieldSkillIds = (fields.skills ?? []).map(tag => tag._id);
    const filterTags = tags.filter(tag => !fieldSkillIds.includes(tag._id));

    const data = filterTags.map(tag => ({
      ...tag,
      isChecked: false,
    }));

    setTagDataModal(data);
  }, [fields.skills, tags]);

  useEffect(() => {
    handleGetJobs();
  }, [handleGetJobs]);

  useEffect(() => {
    handleGetTags();
  }, [handleGetTags]);

  return (
    <MainLayout isBackScreen headerProps={{ title: "Create new application" }}>
      <ScrollView>
        <DetailItemRow
          label="Status"
          content={
            <TouchableOpacity
              style={paddingStyle}
              onPress={() => setIsVisibleStatusModal(true)}
            >
              <ApplicationProcessStatus value={fields.status} />
            </TouchableOpacity>
          }
        />
        <DetailItemRow
          label="Avatar"
          content={
            <CommonUploadAvatar
              value={fields.avatarUrl}
              setValue={newValue =>
                handleChangeText(FIELD_NAMES.avatarUrl, newValue)
              }
              style={paddingStyle}
            />
          }
        />

        <TextInputBlock
          label="Name *"
          value={fields.name}
          onChangeText={value => handleChangeText(FIELD_NAMES.name, value)}
        />
        <TextInputBlock
          label="Email *"
          value={fields.email}
          onChangeText={value => handleChangeText(FIELD_NAMES.email, value)}
        />
        <TextInputBlock
          label="Phone number"
          value={fields.phoneNumber}
          onChangeText={value =>
            handleChangeText(FIELD_NAMES.phoneNumber, value)
          }
        />
        <TextInputBlock
          label="Address"
          value={fields.address}
          onChangeText={value => handleChangeText(FIELD_NAMES.address, value)}
        />
        <EditTagBlock
          label="Skills"
          data={fields.skills}
          onAdd={() => setIsVisibleModal(true)}
          onDelete={handleDeleteSkill}
        />
        <AttachmentUploadBlock
          label="Attachment *"
          data={fields.attachments}
          setIsLoading={setIsLoading}
          setData={newData =>
            handleChangeText(FIELD_NAMES.attachments, newData)
          }
        />
        <DetailItemRow label="Position" content={JOB.name} />
      </ScrollView>

      <CommonButton
        label="Create"
        style={{ margin: 16 }}
        onPress={handleCreateApplication}
      />

      <CheckboxOptionsModal
        isVisible={isVisibleModal}
        data={tagDataModal ?? []}
        setData={setTagDataModal}
        onCloseModal={() => setIsVisibleModal(false)}
        onAdd={handleAddSelectedTags}
      />
      <StatusOptionsModal
        value={fields.status}
        setValue={newValue => handleChangeText(FIELD_NAMES.status, newValue)}
        isVisible={isVisibleStatusModal}
        data={STATUS_DATA}
        onCloseModal={() => setIsVisibleStatusModal(false)}
      />

      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
};

const FIELD_NAMES = {
  name: "name",
  email: "email",
  phoneNumber: "phoneNumber",
  skills: "skills",
  avatarUrl: "avatarUrl",
  address: "address",
  attachments: "attachments",
  status: "status",
};

const DEFAULT_FIELDS = {
  [FIELD_NAMES.avatarUrl]: null,
  [FIELD_NAMES.name]: "",
  [FIELD_NAMES.email]: "",
  [FIELD_NAMES.phoneNumber]: "",
  [FIELD_NAMES.address]: "",
  [FIELD_NAMES.skills]: [],
  [FIELD_NAMES.attachments]: {},
  [FIELD_NAMES.status]: APPLICATION_STATUS.screening,
};

const STATUS_DATA = [
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

export default JobCandidateCreationScreen;
