import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  ImageBackground,
  Image,
} from "react-native";
import { ImageSource } from "assets";
import {
  CommonButton,
  CommonTextButton,
  CommonTextInput,
  LoadingSpinner,
} from "components";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/core";
import { SCREEN_NAME } from "const/path.const";
import { AuthService } from "services";
import { ApiConstant } from "const";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();

  const [email, onChangeEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigateToLogin = useCallback(() => {
    navigation.navigate(SCREEN_NAME.signInScreen);
  }, [navigation]);

  const handleSubmit = useCallback(async () => {
    if (!email) {
      return toast.show("Please enter your email", { type: "warning" });
    }

    setIsLoading(true);

    try {
      const response = await AuthService.postForgotPassword({ email });

      if (response.status === ApiConstant.STT_OK) {
        toast.show("Password reset is sent to your email", { type: "success" });
      } else {
        toast.show(response.data?.message ?? "Something went wrong", {
          type: "warning",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [email, toast]);

  return (
    <ImageBackground
      source={ImageSource.LoginBackgroundImage}
      resizeMode="cover"
      style={styles.image}
    >
      <ScrollView contentContainerStyle={styles.root}>
        <Image source={ImageSource.LogoImage} style={styles.logo} />
        <Text style={styles.title}>Reset password</Text>
        <Text style={styles.subTitle}>
          Enter your email address to request a password reset.
        </Text>

        <CommonTextInput
          value={email}
          onChangeText={onChangeEmail}
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
        />

        <CommonButton
          label="Reset"
          labelStyle={styles.buttonLabel}
          style={styles.button}
          onPress={handleSubmit}
        />
        <CommonTextButton
          label="Return to login"
          onPress={handleNavigateToLogin}
          style={styles.textButton}
        />
      </ScrollView>

      <LoadingSpinner isVisible={isLoading} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
  root: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  logo: {
    width: 175,
    height: 50,
    marginTop: 70,
    marginBottom: 50,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  subTitle: {
    color: "white",
    marginTop: 10,
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    width: "100%",
  },
  pwInput: {
    marginTop: 20,
  },
  button: {
    width: 200,
    alignSelf: "center",
    marginTop: 40,
  },
  buttonLabel: {
    textTransform: "uppercase",
  },
  textButton: {
    marginTop: 24,
  },
});

export default ForgotPasswordScreen;
