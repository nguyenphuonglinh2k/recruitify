import { ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MainLayout } from "layouts";
import {
  ApplicationProcessStatus,
  AttachmentUploadBlock,
  CommonButton,
  CommonUploadAvatar,
  EditTagBlock,
  LoadingSpinner,
  SelectInputBlock,
  StatusOptionsModal,
  TagOptionsModal,
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

const CandidateCreationScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();

  const JOBS = useSelector(({ jobRedux }) => jobRedux.jobs);

  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedStatusType, setSelectedStatusType] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isVisibleStatusModal, setIsVisibleStatusModal] = useState(false);

  const jobData = useMemo(() => {
    return JOBS.map(job => ({
      label: job.name,
      value: job._id,
    }));
  }, [JOBS]);

  const selectedJobName = useMemo(() => {
    if (fields.jobId) {
      const selectedJob = jobData.find(job => job.value === fields.jobId);

      return selectedJob?.label;
    } else {
      return "";
    }
  }, [fields.jobId, jobData]);

  const tagDataModal = useMemo(() => {
    const fieldSkillIds = (fields.skills ?? []).map(tag => tag._id);
    const filterTags = tags.filter(tag => !fieldSkillIds.includes(tag._id));

    return filterTags.map(tag => ({
      ...tag,
      isChecked: false,
    }));
  }, [fields.skills, tags]);

  const statusModalData = useMemo(() => {
    if (selectedStatusType === STATUS_MODAL_TYPES.job) {
      return jobData;
    } else if (selectedStatusType === STATUS_MODAL_TYPES.status) {
      return STATUS_DATA;
    } else {
      return [];
    }
  }, [jobData, selectedStatusType]);

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

  const handleDeleteSkill = useCallback(
    index => {
      const skills = [...fields.skills];
      const newData = [...skills.slice(0, index), ...skills.slice(index + 1)];

      handleChangeText(FIELD_NAMES.skills, newData);
    },
    [fields.skills, handleChangeText],
  );

  const handleAddSelectedTags = useCallback(() => {
    handleChangeText(FIELD_NAMES.skills, [...fields.skills, ...selectedTags]);
    setIsVisibleModal(false);
  }, [fields.skills, selectedTags, handleChangeText]);

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
    if (!fields.name || !fields.email || !fields.attachments || !fields.jobId) {
      return toast.show("Please fill out all required fields");
    }
  }, [fields.attachments, fields.email, fields.jobId, fields.name, toast]);

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
      jobId: fields.jobId,
      attachments: [fields.attachments],
      status: fields.status,
    };

    try {
      const response = await ApplicationService.postApplication(data);

      if (response.status === ApiConstant.STT_CREATED) {
        navigation.goBack();
        toast("Create successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [fields, handleValidateFields, navigation, toast]);

  const handleChangeStatusModalValue = useCallback(
    newValue => {
      if (selectedStatusType === STATUS_MODAL_TYPES.status) {
        handleChangeText(FIELD_NAMES.status, newValue);
      } else {
        handleChangeText(FIELD_NAMES.jobId, newValue);
      }
    },
    [handleChangeText, selectedStatusType],
  );

  const handleGetJobs = useCallback(() => {
    dispatch(JobActions.getJobsRequest());
  }, [dispatch]);

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
              onPress={() => handleOpenStatusModal(STATUS_MODAL_TYPES.status)}
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
        <SelectInputBlock
          label="Position *"
          value={selectedJobName}
          onPress={() => handleOpenStatusModal(STATUS_MODAL_TYPES.job)}
        />
      </ScrollView>

      <CommonButton
        label="Create"
        style={{ margin: 16 }}
        onPress={handleCreateApplication}
      />

      <TagOptionsModal
        isVisible={isVisibleModal}
        data={tagDataModal ?? []}
        setData={setSelectedTags}
        onCloseModal={() => setIsVisibleModal(false)}
        onAdd={handleAddSelectedTags}
      />
      <StatusOptionsModal
        value={fields.status}
        setValue={handleChangeStatusModalValue}
        isVisible={isVisibleStatusModal}
        data={statusModalData}
        onCloseModal={() => setIsVisibleStatusModal(false)}
      />

      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
};

const STATUS_MODAL_TYPES = {
  status: 1,
  job: 2,
};

const FIELD_NAMES = {
  name: "name",
  email: "email",
  phoneNumber: "phoneNumber",
  skills: "skills",
  avatarUrl: "avatarUrl",
  address: "address",
  attachments: "attachments",
  jobId: "jobId",
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
  [FIELD_NAMES.jobId]: "",
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

export default CandidateCreationScreen;
