import { ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { MainLayout } from "layouts";
import {
  CommonButton,
  DetailItemRow,
  LoadingSpinner,
  Role,
  StatusOptionsModal,
  TextInputBlock,
} from "components";
import { USER_ROLE } from "const/app.const";
import { onGetUserRoleLabel } from "utils/label.utils";
import { paddingStyle } from "components/DetailItemRow";
import { AuthService } from "services";
import { ApiConstant } from "const";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/core";

const SettingUserCreationScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();

  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const handleChangeText = useCallback(
    (fieldName, newValue) => {
      setFields({ ...fields, [fieldName]: newValue });
    },
    [fields],
  );

  const handleCreateUser = useCallback(async () => {
    if (!fields.name || !fields.email || !fields.password || !fields.role) {
      return toast.show("Please fill out all required fields", {
        type: "warning",
      });
    }

    setIsLoading(true);

    try {
      const response = await AuthService.postSignUp(fields);

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

  return (
    <MainLayout isBackScreen headerProps={{ title: "Create new user" }}>
      <ScrollView>
        <DetailItemRow
          label="Role *"
          content={
            <TouchableOpacity
              style={paddingStyle}
              onPress={() => setIsVisibleModal(true)}
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
      </ScrollView>

      <CommonButton
        label="Create"
        style={{ margin: 16 }}
        onPress={handleCreateUser}
      />

      <StatusOptionsModal
        value={fields.role}
        setValue={newValue => handleChangeText(FIELD_NAMES.role, newValue)}
        isVisible={isVisibleModal}
        data={ROLE_DATA}
        onCloseModal={() => setIsVisibleModal(false)}
      />

      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
};

const FIELD_NAMES = {
  name: "name",
  email: "email",
  phoneNumber: "phoneNumber",
  address: "address",
  role: "role",
  password: "password",
};

const DEFAULT_FIELDS = {
  [FIELD_NAMES.name]: "",
  [FIELD_NAMES.email]: "",
  [FIELD_NAMES.phoneNumber]: "",
  [FIELD_NAMES.address]: "",
  [FIELD_NAMES.password]: "",
  [FIELD_NAMES.role]: USER_ROLE.candidate,
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
