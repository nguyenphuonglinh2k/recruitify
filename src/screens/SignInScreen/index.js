import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  ImageBackground,
  Image,
} from "react-native";
import { ImageSource } from "assets";
import { CommonButton, CommonTextButton, CommonTextInput } from "components";

const SignInScreen = () => {
  const [username, onChangeUsername] = useState("user");
  const [password, onChangePassword] = useState("123456");

  const onLogin = () => {};

  return (
    <ImageBackground
      source={ImageSource.LoginBackgroundImage}
      resizeMode="cover"
      style={styles.image}
    >
      <ScrollView contentContainerStyle={styles.root}>
        <Image source={ImageSource.LogoImage} style={styles.logo} />
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subTitle}>
          Sign in and start managing your candidates
        </Text>

        <CommonTextInput
          value={username}
          onChangeText={onChangeUsername}
          style={styles.input}
          keyboardType="email-address"
        />
        <CommonTextInput
          value={password}
          onChangeText={onChangePassword}
          style={[styles.input, styles.pwInput]}
          secureTextEntry
        />

        <CommonButton
          label="Login In"
          labelStyle={styles.buttonLabel}
          style={styles.button}
          onPress={onLogin}
        />
        <CommonTextButton label="Forgot password?" style={styles.textButton} />
      </ScrollView>
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
    width: 147,
    height: 42,
    marginTop: 70,
    marginBottom: 40,
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

export default SignInScreen;
