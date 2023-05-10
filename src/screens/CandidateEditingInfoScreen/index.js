import { ScrollView } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MainLayout } from "layouts";
import { useDispatch, useSelector } from "react-redux";
import {
  CommonButton,
  EditTagBlock,
  LoadingSpinner,
  TextInputBlock,
  CheckboxOptionsModal,
  CommonUploadAvatar,
  DetailItemRow,
  StatusOptionsModal,
  SelectInputBlock,
  AttachmentUploadBlock,
} from "components";
import { ApplicationService, TagService } from "services";
import { ApiConstant } from "const";
import { useNavigation } from "@react-navigation/core";
import { useToast } from "react-native-toast-notifications";
import { paddingStyle } from "components/DetailItemRow";
import JobActions from "reduxStore/job.redux";

const CandidateEditingInfoScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();

  const application = useSelector(
    ({ applicationRedux }) => applicationRedux.application,
  );
  const JOBS = useSelector(({ jobRedux }) => jobRedux.jobs);

  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isVisibleJobModal, setIsVisibleJobModal] = useState(false);
  const [tagDataModal, setTagDataModal] = useState([]);

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

  const handleSaveInfo = useCallback(async () => {
    setIsLoading(true);

    const skillIds = fields.skills.map(skill => skill._id);

    const newInfo = {
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
    };

    try {
      const response = await ApplicationService.putApplication(
        application._id,
        newInfo,
      );

      if (response.status === ApiConstant.STT_OK) {
        navigation.goBack();
        toast.show("Update successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [application, fields, navigation, toast]);

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
    if (application) {
      setFields({
        name: application.applicantInfo?.name,
        email: application.applicantInfo?.email,
        phoneNumber: application.applicantInfo?.phoneNumber,
        avatarUrl: application.applicantInfo?.avatarUrl,
        address: application.applicantInfo?.address,
        skills: application.skillIds,
        attachments: application.attachments[0],
        jobId: application.jobId._id,
      });
    }
  }, [application]);

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
    <MainLayout
      isBackScreen
      headerProps={{ title: `Edit ${application.applicantInfo?.name}'s info` }}
    >
      <ScrollView>
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
          label="Name"
          value={fields.name}
          onChangeText={value => handleChangeText(FIELD_NAMES.name, value)}
        />
        <TextInputBlock
          label="Email"
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
          label="Position"
          value={selectedJobName}
          onPress={() => setIsVisibleJobModal(true)}
        />
      </ScrollView>

      <CommonButton
        label="Save"
        style={{ margin: 16 }}
        onPress={handleSaveInfo}
      />

      <LoadingSpinner isVisible={isLoading} />

      <CheckboxOptionsModal
        isVisible={isVisibleModal}
        data={tagDataModal ?? []}
        setData={setTagDataModal}
        onCloseModal={() => setIsVisibleModal(false)}
        onAdd={handleAddSelectedTags}
      />
      <StatusOptionsModal
        value={fields.status}
        setValue={newData => handleChangeText(FIELD_NAMES.jobId, newData)}
        isVisible={isVisibleJobModal}
        data={jobData}
        onCloseModal={() => setIsVisibleJobModal(false)}
      />
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
  jobId: "jobId",
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
};

export default CandidateEditingInfoScreen;
