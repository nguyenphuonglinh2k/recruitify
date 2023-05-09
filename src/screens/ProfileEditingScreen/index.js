import { ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MainLayout } from "layouts";
import { useDispatch, useSelector } from "react-redux";
import {
  CommonButton,
  CommonUploadAvatar,
  DetailItemRow,
  LoadingSpinner,
  TextInputBlock,
} from "components";
import { paddingStyle } from "components/DetailItemRow";
import { UserService } from "services";
import { ApiConstant } from "const";
import { useNavigation } from "@react-navigation/core";
import { useToast } from "react-native-toast-notifications";
import AuthActions from "reduxStore/auth.redux";

const ProfileEditingScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();

  const AUTH_USER = useSelector(({ authRedux }) => authRedux.user);

  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeText = useCallback(
    (fieldName, newValue) => {
      setFields({ ...fields, [fieldName]: newValue });
    },
    [fields],
  );

  const handleSaveInfo = useCallback(async () => {
    if (!fields.name || !fields.email) {
      return toast.show("Please fill out all required fields", {
        type: "warning",
      });
    }

    setIsLoading(true);

    try {
      const response = await UserService.putUserInfo(AUTH_USER._id, fields);

      if (response.status === ApiConstant.STT_OK) {
        dispatch(
          AuthActions.authSuccess({
            user: response.data?.data,
          }),
        );

        navigation.goBack();
        toast.show("Update successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [AUTH_USER._id, dispatch, fields, navigation, toast]);

  useEffect(() => {
    if (AUTH_USER) {
      setFields({
        name: AUTH_USER.name,
        email: AUTH_USER.email,
        phoneNumber: AUTH_USER.phoneNumber,
        address: AUTH_USER.address,
        avatarUrl: AUTH_USER.avatarUrl,
      });
    }
  }, [AUTH_USER]);

  return (
    <MainLayout
      isBackScreen
      headerProps={{ title: `Edit ${AUTH_USER.name}'s information` }}
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
      </ScrollView>

      <CommonButton
        label="Save"
        style={{ margin: 16 }}
        onPress={handleSaveInfo}
      />
      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
};

const FIELD_NAMES = {
  name: "name",
  email: "email",
  phoneNumber: "phoneNumber",
  avatarUrl: "avatarUrl",
  address: "address",
};

const DEFAULT_FIELDS = {
  [FIELD_NAMES.avatarUrl]: null,
  [FIELD_NAMES.name]: "",
  [FIELD_NAMES.email]: "",
  [FIELD_NAMES.phoneNumber]: "",
  [FIELD_NAMES.address]: "",
};

export default ProfileEditingScreen;
