import { ImageBackground, StyleSheet, Text } from "react-native";
import React from "react";
import { ImageSource } from "assets";
import { CommonAvatar, Role } from "components";
import { COLORS } from "utils";

const Header = () => {
  return (
    <>
      <ImageBackground
        source={ImageSource.ProfileHeaderBannerImage}
        style={{ height: 150, marginBottom: 30 }}
      >
        <CommonAvatar
          style={styles.avatar}
          source={{ uri: MOCK_INFO.avatarUrl }}
        />
      </ImageBackground>

      <Role value={MOCK_INFO.role} style={{ marginTop: 10 }} />
      <Text style={styles.name}>{MOCK_INFO.name}</Text>
      <Text style={styles.joinedTime}>Joined {MOCK_INFO.createdAt}</Text>
    </>
  );
};

const MOCK_INFO = {
  name: "Arnoly Chafe",
  email: "arnolyChafe@gmail.com",
  avatarUrl:
    "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg",
  role: 4,
  createdAt: "12/03/2023",
  applicationId: 1,
};

export default Header;

const styles = StyleSheet.create({
  avatar: {
    height: 105,
    width: 105,
    position: "absolute",
    bottom: 0,
    marginBottom: -30,
    alignSelf: "center",
    borderWidth: 5,
    borderColor: COLORS.black,
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.black,
    textAlign: "center",
    marginVertical: 4,
  },
  joinedTime: {
    textAlign: "center",
    fontWeight: "500",
    color: COLORS.grey[600],
    fontSize: 13,
  },
});
