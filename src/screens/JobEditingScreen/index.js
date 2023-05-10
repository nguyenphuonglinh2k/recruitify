import { ScrollView } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MainLayout } from "layouts";
import {
  CommonButton,
  DateInputBlock,
  EditAttendeeBlock,
  EditLocationBlock,
  EditTagBlock,
  LoadingSpinner,
  CheckboxOptionsModal,
  TextInputBlock,
} from "components";
import moment from "moment";
import { ApiConstant, AppConstant } from "const";
import { JobService, TagService, UserService } from "services";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { useToast } from "react-native-toast-notifications";

const JobEditingScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();

  const JOB = useSelector(({ jobRedux }) => jobRedux.job);

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkboxData, setCheckboxData] = useState([]);
  const [checkboxModalType, setCheckboxModalType] = useState();
  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);

  const userDataModal = useMemo(() => {
    const fieldAssigneeIds = (fields.assignees ?? []).map(user => user._id);
    const filterUsers = users.filter(
      user => !fieldAssigneeIds.includes(user._id),
    );

    return filterUsers.map(user => ({
      ...user,
      isChecked: false,
    }));
  }, [fields.assignees, users]);

  const tagDataModal = useMemo(() => {
    const fieldTagIds = (fields.tags ?? []).map(tag => tag._id);
    const filterTags = tags.filter(tag => !fieldTagIds.includes(tag._id));

    return filterTags.map(tag => ({
      ...tag,
      isChecked: false,
    }));
  }, [fields.tags, tags]);

  const handleOpenCheckboxModal = useCallback(type => {
    setCheckboxModalType(type);
    setIsVisibleModal(true);
  }, []);

  const handleChangeText = useCallback(
    (fieldName, newValue) => {
      setFields({ ...fields, [fieldName]: newValue });
    },
    [fields],
  );

  const handleAddSelectedCheckboxData = useCallback(() => {
    const filteredData = checkboxData.filter(item => item.isChecked);

    if (checkboxModalType === CHECKBOX_MODAL_TYPES.tag) {
      handleChangeText(FIELD_NAMES.tags, [...fields.tags, ...filteredData]);
    } else if (checkboxModalType === CHECKBOX_MODAL_TYPES.assignee) {
      handleChangeText(FIELD_NAMES.assignees, [
        ...fields.assignees,
        ...filteredData,
      ]);
    }

    setIsVisibleModal(false);
  }, [
    checkboxModalType,
    handleChangeText,
    fields.tags,
    fields.assignees,
    checkboxData,
  ]);

  const handleDeleteTag = useCallback(
    index => {
      const clonedTags = [...fields.tags];
      const newData = [
        ...clonedTags.slice(0, index),
        ...clonedTags.slice(index + 1),
      ];

      handleChangeText(FIELD_NAMES.tags, newData);
    },
    [fields.tags, handleChangeText],
  );

  const handleValidateFields = useCallback(() => {
    if (!fields.name) {
      return toast.show("Please fill out required fields", { type: "warning" });
    }
  }, [fields.name, toast]);

  const handleEditJob = useCallback(async () => {
    handleValidateFields();
    setIsLoading(true);

    const tagIds = fields.tags.map(tag => tag._id);
    const assigneeIds = fields.assignees.map(user => user._id);

    const data = {
      name: fields.name,
      locations: fields.locations,
      startDate: fields.startDate,
      endDate: fields.endDate,
      tagIds,
      assigneeIds,
    };

    try {
      const response = await JobService.putJob(JOB._id, data);

      if (response.status === ApiConstant.STT_OK) {
        navigation.goBack();
        toast.show("Update successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [handleValidateFields, fields, JOB._id, navigation, toast]);

  const handleGetData = useCallback(async () => {
    setIsLoading(true);

    try {
      const getTagsPromise = TagService.getTags();
      const getUsersPromise = UserService.getUsers();

      const responses = await Promise.all([getTagsPromise, getUsersPromise]);

      const hasAllSuccessStatus = responses.every(
        res => res.status === ApiConstant.STT_OK,
      );

      if (hasAllSuccessStatus) {
        const [tagsResponseData, usersResponseData] = [
          responses[0].data,
          responses[1].data,
        ];

        setTags(tagsResponseData);
        setUsers(usersResponseData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let data = [];
    if (checkboxModalType === CHECKBOX_MODAL_TYPES.tag) {
      data = tagDataModal;
    } else if (checkboxModalType === CHECKBOX_MODAL_TYPES.assignee) {
      data = userDataModal;
    }

    setCheckboxData(data);
  }, [checkboxModalType, tagDataModal, userDataModal]);

  useEffect(() => {
    if (JOB) {
      setFields({
        name: JOB.name,
        locations: JOB.locations,
        startDate: JOB.startDate,
        endDate: JOB.endDate,
        tags: JOB.tagIds,
        assignees: JOB.assigneeIds,
      });
    }
  }, [JOB]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  return (
    <MainLayout isBackScreen headerProps={{ title: `Edit position` }}>
      <ScrollView>
        <TextInputBlock
          label="Name *"
          value={fields.name}
          onChangeText={value => handleChangeText(FIELD_NAMES.name, value)}
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
        <EditTagBlock
          label="Tags"
          data={fields.tags}
          onAdd={() => handleOpenCheckboxModal(CHECKBOX_MODAL_TYPES.tag)}
          onDelete={handleDeleteTag}
        />
        <EditLocationBlock
          label="Locations"
          data={fields.locations}
          setData={newData => handleChangeText(FIELD_NAMES.locations, newData)}
        />
        <EditAttendeeBlock
          label="Assignees"
          data={fields.assignees}
          setData={newData => handleChangeText(FIELD_NAMES.assignees, newData)}
          onAdd={() => handleOpenCheckboxModal(CHECKBOX_MODAL_TYPES.assignee)}
        />
      </ScrollView>

      <CommonButton
        label="Save"
        style={{ margin: 16 }}
        onPress={handleEditJob}
      />

      <CheckboxOptionsModal
        isVisible={isVisibleModal}
        data={checkboxData}
        setData={setCheckboxData}
        onCloseModal={() => setIsVisibleModal(false)}
        onAdd={handleAddSelectedCheckboxData}
      />

      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
};

const CHECKBOX_MODAL_TYPES = {
  tag: 1,
  assignee: 2,
};

const FIELD_NAMES = {
  name: "name",
  locations: "locations",
  startDate: "startDate",
  endDate: "endDate",
  tags: "tags",
  assignees: "assignees",
};

const DEFAULT_FIELDS = {
  [FIELD_NAMES.name]: "",
  [FIELD_NAMES.startDate]: moment().format(AppConstant.FORMAT_DATE_WITH_HYPHEN),
  [FIELD_NAMES.endDate]: moment().format(AppConstant.FORMAT_DATE_WITH_HYPHEN),
  [FIELD_NAMES.tags]: [],
  [FIELD_NAMES.assignees]: [],
  [FIELD_NAMES.locations]: [""],
};

export default JobEditingScreen;
