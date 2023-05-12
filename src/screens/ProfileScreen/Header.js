import { ImageBackground, StyleSheet, Text } from "react-native";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { ImageSource } from "assets";
import { CommonAvatar, Role } from "components";
import { COLORS } from "utils";
import { useSelector } from "react-redux";
import moment from "moment";
import { AppConstant } from "const";

const Header = ({ data }) => {
  const authUser = useSelector(({ authRedux }) => authRedux.user);

  const user = useMemo(() => data ?? authUser, [data, authUser]);

  return (
    <>
      <ImageBackground
        source={ImageSource.ProfileHeaderBannerImage}
        style={{ height: 150, marginBottom: 30 }}
      >
        <CommonAvatar style={styles.avatar} source={{ uri: user.avatarUrl }} />
      </ImageBackground>

      <Role value={user.role} style={{ marginTop: 10, alignSelf: "center" }} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.joinedTime}>
        {`Joined ${moment(user.createdAt).format(
          AppConstant.FORMAT_DATE_WITH_SLASH,
        )}`}
      </Text>
    </>
  );
};

Header.propTypes = {
  data: PropTypes.object,
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
