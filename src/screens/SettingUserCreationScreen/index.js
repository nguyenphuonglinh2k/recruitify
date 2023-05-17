import { ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MainLayout } from "layouts";
import {
  CommonButton,
  DetailItemRow,
  LoadingSpinner,
  Role,
  SelectInputBlock,
  StatusOptionsModal,
  TextInputBlock,
} from "components";
import { APPLICATION_STATUS, USER_ROLE } from "const/app.const";
import { onGetUserRoleLabel } from "utils/label.utils";
import { paddingStyle } from "components/DetailItemRow";
import { ApplicationService, AuthService } from "services";
import { ApiConstant } from "const";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/core";

const SettingUserCreationScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();

  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [applications, setApplications] = useState([]);

  const applicationData = useMemo(() => {
    return applications.map(item => ({
      ...item,
      label: `${item?.applicantInfo?.name}'s application`,
      value: item._id,
    }));
  }, [applications]);

  const selectedApplication = useMemo(
    () => applicationData.find(item => item.value === fields.applicationId),
    [applicationData, fields.applicationId],
  );

  const [modalData, modalValue] = useMemo(() => {
    switch (modalType) {
      case MODAL_TYPES.role:
        return [ROLE_DATA, fields.role];
      case MODAL_TYPES.application:
        return [applicationData, fields.applicationId];
      default:
        return [];
    }
  }, [applicationData, fields.applicationId, fields.role, modalType]);

  const handleChangeText = useCallback(
    (fieldName, newValue) => {
      setFields({ ...fields, [fieldName]: newValue });
    },
    [fields],
  );

  const handleOpenModal = useCallback(type => {
    setModalType(type);
    setIsVisibleModal(true);
  }, []);

  const handleSetModalValue = useCallback(
    newValue => {
      if (modalType === MODAL_TYPES.application) {
        const currentApplication = applicationData.find(
          item => item.value === newValue,
        );

        const { name, phoneNumber, address, email } =
          currentApplication?.applicantInfo ?? {};

        setFields({
          ...fields,
          name,
          email,
          phoneNumber,
          address,
          [FIELD_NAMES.applicationId]: newValue,
        });
      } else if (modalType === MODAL_TYPES.role) {
        setFields({
          ...fields,
          [FIELD_NAMES.role]: newValue,
        });
      }
    },
    [applicationData, fields, modalType],
  );

  const handleCreateUser = useCallback(async () => {
    if (!fields.name || !fields.email || !fields.password || !fields.role) {
      return toast.show("Please fill out all required fields", {
        type: "warning",
      });
    }

    setIsLoading(true);

    const data = {
      name: fields.name,
      email: fields.email,
      phoneNumber: fields.phoneNumber,
      address: fields.address,
      role: fields.role,
      password: fields.password,
      applicationIds: [fields.applicationId] ?? [],
    };

    try {
      const response = await AuthService.postSignUp(data);

      if (response.status === ApiConstant.STT_CREATED) {
        navigation.goBack();
        toast.show("Create successfully", { type: "success" });
      } else {
        toast.show(response?.data?.message, { type: "warning" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [fields, navigation, toast]);

  const handleGetApplications = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await ApplicationService.getApplications({
        params: { status: APPLICATION_STATUS.hire },
      });

      if (response.status === ApiConstant.STT_OK) {
        setApplications(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetApplications();
  }, [handleGetApplications]);

  return (
    <MainLayout isBackScreen headerProps={{ title: "Create new user" }}>
      <ScrollView>
        <DetailItemRow
          label="Role *"
          content={
            <TouchableOpacity
              style={paddingStyle}
              onPress={() => handleOpenModal(MODAL_TYPES.role)}
            >
              <Role value={fields.role} />
            </TouchableOpacity>
          }
        />
        <TextInputBlock
          label="Name *"
          value={fields.name}
          onChangeText={value => handleChangeText(FIELD_NAMES.name, value)}
        />
        <TextInputBlock
          label="Email *"
          keyboardType="email-address"
          value={fields.email}
          onChangeText={value => handleChangeText(FIELD_NAMES.email, value)}
        />
        <TextInputBlock
          label="Password *"
          value={fields.password}
          onChangeText={value => handleChangeText(FIELD_NAMES.password, value)}
          secureTextEntry
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
        <SelectInputBlock
          label="Application"
          value={selectedApplication?.label}
          onPress={() => handleOpenModal(MODAL_TYPES.application)}
        />
      </ScrollView>

      <CommonButton
        label="Create"
        style={{ margin: 16 }}
        onPress={handleCreateUser}
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
  role: 1,
  application: 2,
};

const FIELD_NAMES = {
  name: "name",
  email: "email",
  phoneNumber: "phoneNumber",
  address: "address",
  role: "role",
  password: "password",
  applicationId: "applicationId",
};

const DEFAULT_FIELDS = {
  [FIELD_NAMES.name]: "",
  [FIELD_NAMES.email]: "",
  [FIELD_NAMES.phoneNumber]: "",
  [FIELD_NAMES.address]: "",
  [FIELD_NAMES.password]: "",
  [FIELD_NAMES.role]: USER_ROLE.candidate,
  [FIELD_NAMES.applicationId]: null,
};

const ROLE_DATA = [
  {
    value: USER_ROLE.admin,
    label: onGetUserRoleLabel(USER_ROLE.admin),
  },
  {
    value: USER_ROLE.hr,
    label: onGetUserRoleLabel(USER_ROLE.hr),
  },
  {
    value: USER_ROLE.manager,
    label: onGetUserRoleLabel(USER_ROLE.manager),
  },
  {
    value: USER_ROLE.candidate,
    label: onGetUserRoleLabel(USER_ROLE.candidate),
  },
];

export default SettingUserCreationScreen;
