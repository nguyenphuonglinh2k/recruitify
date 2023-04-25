import { ScrollView, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { MainLayout } from "layouts";
import { COLORS } from "utils";
import { CommonButton, CommonTextInput, LoadingSpinner } from "components";
import { ApiConstant, AppConstant } from "const";
import { AuthService } from "services";
import { useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";

const ChangePasswordScreeen = () => {
  const toast = useToast();

  const AUTH_USER = useSelector(({ authRedux }) => authRedux.user);

  const [newPassword, onChangeNewPassword] = useState();
  const [oldPassword, onChangeOldPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleValidatePw = () => {
    if (newPassword.length < AppConstant.MINIMUM_PASSWORD_LENGTH) {
      return toast.show(
        `Password must be at least ${AppConstant.MINIMUM_PASSWORD_LENGTH} characters`,
        {
          type: "warning",
        },
      );
    }
  };

  const handleResetPw = async () => {
    handleValidatePw();
    setIsLoading(true);

    const data = {
      newPassword,
      oldPassword,
    };

    try {
      const response = await AuthService.putPasswordChange(AUTH_USER._id, data);

      if (response.status === ApiConstant.STT_OK) {
        toast.show("Update successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <ScrollView>
        <Text style={styles.label}>Create new password</Text>
        <CommonTextInput
          value={oldPassword}
          onChangeText={onChangeOldPassword}
          style={[styles.input, { marginTop: 50, marginBottom: 16 }]}
          secureTextEntry
          label="Old password"
        />
        <CommonTextInput
          value={newPassword}
          onChangeText={onChangeNewPassword}
          style={[styles.input]}
          secureTextEntry
          label="New password"
        />

        <CommonButton
          label="Reset password"
          style={styles.button}
          onPress={handleResetPw}
        />
      </ScrollView>

      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
};

export default ChangePasswordScreeen;

const styles = StyleSheet.create({
  label: {
    color: COLORS.black,
    fontSize: 19,
    fontWeight: "600",
  },
  input: {
    width: "100%",
  },
  button: {
    width: 200,
    alignSelf: "center",
    marginTop: 40,
  },
});
