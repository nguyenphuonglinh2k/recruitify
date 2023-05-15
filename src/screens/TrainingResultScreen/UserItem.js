import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CommonAvatar } from "components";
import PropTypes from "prop-types";
import { ArrowIcon } from "icons";
import { COLORS } from "utils";

const UserItem = ({ data, style, onDelete, onPress, ...otherProps }) => {
  const { name, avatarUrl, email } = data;

  return (
    <TouchableOpacity
      style={[styles.root, style]}
      onPress={onPress}
      {...otherProps}
    >
      <View style={styles.userWrapper}>
        <CommonAvatar source={{ uri: avatarUrl }} style={styles.avatar} />
        <View style={styles.infoWrapper}>
          <Text style={styles.name}>{name}</Text>
          <Text>{email}</Text>
        </View>
      </View>

      <ArrowIcon color={COLORS.black} style={styles.icon} />
    </TouchableOpacity>
  );
};

UserItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  data: PropTypes.object,
  onDelete: PropTypes.func,
  onPress: PropTypes.func,
};

export default UserItem;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
    borderColor: COLORS.grey[200],
    borderWidth: 2,
    padding: 12,
    backgroundColor: COLORS.grey[300],
  },
  userWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  infoWrapper: {
    marginLeft: 10,
    alignItems: "flex-start",
  },
  name: {
    color: COLORS.black,
    fontWeight: "600",
    marginBottom: 4,
    fontSize: 16,
  },
  avatar: {
    height: 50,
    width: 50,
  },
  icon: {
    transform: [{ rotate: "180deg" }],
  },
});
