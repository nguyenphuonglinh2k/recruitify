import { ScrollView, StyleSheet, Text } from "react-native";
import React, { useCallback, useState } from "react";
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

  const [newPassword, onChangeNewPassword] = useState("");
  const [oldPassword, onChangeOldPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleValidatePw = useCallback(() => {
    if (!newPassword || !oldPassword) {
      return toast.show("Please fill out all the fields", { type: "warning" });
    } else if (newPassword?.length < AppConstant.MINIMUM_PASSWORD_LENGTH) {
      return toast.show(
        `Password must be at least ${AppConstant.MINIMUM_PASSWORD_LENGTH} characters`,
        {
          type: "warning",
        },
      );
    }
  }, [newPassword, toast]);

  const handleResetPw = useCallback(async () => {
    handleValidatePw();
    setIsLoading(true);

    const data = {
      newPassword,
      oldPassword,
    };

    console.log("run");
    try {
      return;

      const response = await AuthService.putPasswordChange(AUTH_USER._id, data);

      console.log(response.data);

      if (response.status === ApiConstant.STT_OK) {
        toast.show("Update successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [handleValidatePw, newPassword, oldPassword, AUTH_USER._id, toast]);

  return (
    <MainLayout>
      <ScrollView style={styles.root}>
        <Text style={styles.label}>Create new password</Text>
        <Text style={styles.desc}>
          Your new password must be different from previous used password
        </Text>
        <CommonTextInput
          value={oldPassword}
          onChangeText={onChangeOldPassword}
          style={[styles.input]}
          labelStyle={styles.inputLabelStyle}
          secureTextEntry
          label="Old password *"
        />
        <CommonTextInput
          value={newPassword}
          onChangeText={onChangeNewPassword}
          style={[styles.input]}
          labelStyle={styles.inputLabelStyle}
          secureTextEntry
          label="New password *"
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
  root: {
    padding: 16,
    backgroundColor: COLORS.black,
    flex: 1,
  },
  label: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.white,
    marginBottom: 10,
  },
  desc: {
    color: COLORS.white,
    marginBottom: 16,
  },
  input: {
    width: "100%",
  },
  button: {
    width: 180,
    alignSelf: "center",
    marginTop: 40,
  },
  inputLabelStyle: {
    color: COLORS.white,
    marginTop: 16,
  },
});
