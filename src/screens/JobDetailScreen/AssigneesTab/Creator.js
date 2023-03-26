import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import React from "react";
import { CommonAvatar } from "components";
import { COLORS } from "utils";

const Creator = ({ style }) => {
  return (
    <View style={style}>
      <Text style={styles.label}>Creator</Text>

      <View style={styles.contentWrapper}>
        <CommonAvatar
          source={{
            uri: "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
          }}
          style={styles.avatar}
        />
        <Text style={styles.textValue}>{MOCK_CREATOR}</Text>
      </View>
    </View>
  );
};

const MOCK_CREATOR = "Natallia Borum";

Creator.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Creator;

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  label: {
    color: COLORS.black,
    fontWeight: "600",
    fontSize: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.grey[500],
    paddingHorizontal: 16,
  },
  textValue: {
    color: COLORS.black,
    fontWeight: "600",
    marginLeft: 10,
    fontSize: 16,
  },
});
