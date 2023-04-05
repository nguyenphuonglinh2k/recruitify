import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { COLORS } from "utils";
import PropTypes from "prop-types";
import { CommonAvatar, CommonIconButton } from "components";
import { TrashIcon } from "icons";

const MemberItem = ({ data, style, onDelete }) => {
  const { name, avatarUrl } = data;

  return (
    <View style={[styles.root, style]}>
      <View style={styles.left}>
        <CommonAvatar style={styles.avatar} source={{ uri: avatarUrl }} />
        <Text style={styles.username}>{name}</Text>
      </View>

      {Boolean(onDelete) && (
        <CommonIconButton onPress={onDelete ?? null}>
          <TrashIcon />
        </CommonIconButton>
      )}
    </View>
  );
};

MemberItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onDelete: PropTypes.func,
};

export default MemberItem;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[200],
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  username: {
    color: COLORS.black,
    fontSize: 16,
    marginLeft: 10,
  },
});
