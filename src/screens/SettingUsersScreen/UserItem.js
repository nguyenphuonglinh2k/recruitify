import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CommonAvatar, CommonIconButton, Role } from "components";
import PropTypes from "prop-types";
import { TrashIcon } from "icons";
import { COLORS } from "utils";

const UserItem = ({ data, style, onDelete, onPress, ...otherProps }) => {
  const { name, role, avatarUrl } = data;

  return (
    <View style={[styles.root, style]} {...otherProps}>
      <TouchableOpacity style={styles.userWrapper} onPress={onPress}>
        <CommonAvatar source={{ uri: avatarUrl }} style={styles.avatar} />
        <View style={styles.infoWrapper}>
          <Text style={styles.name}>{name}</Text>
          <Role value={role} />
        </View>
      </TouchableOpacity>

      <CommonIconButton onPress={onDelete}>
        <TrashIcon />
      </CommonIconButton>
    </View>
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
    marginBottom: 8,
    fontSize: 16,
  },
  avatar: {
    height: 50,
    width: 50,
  },
});
