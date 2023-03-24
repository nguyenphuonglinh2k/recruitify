import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import React from "react";
import { CommonAvatar } from "components";
import { COLORS } from "utils";

const Assignees = ({ style }) => {
  return (
    <View style={style}>
      <Text style={styles.label}>Assignees</Text>

      <View>
        {MOCK_ASSIGNEES.map(({ avatarUrl, name }, index) => (
          <View key={index} style={styles.itemWrapper}>
            <CommonAvatar source={{ uri: avatarUrl }} style={styles.avatar} />
            <Text style={styles.name}>{name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const MOCK_ASSIGNEES = [
  {
    name: "Alexandar Greg",
    avatarUrl:
      "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/hinh-anh-avatar-tiktok-cute.jpg",
  },
  {
    name: "Alexandar Greg",
    avatarUrl:
      "https://toigingiuvedep.vn/wp-content/uploads/2022/01/hinh-avatar-cute-nu.jpg",
  },
  {
    name: "Alexandar Greg",
    avatarUrl:
      "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl=1",
  },
];

Assignees.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Assignees;

const styles = StyleSheet.create({
  label: {
    color: COLORS.black,
    fontWeight: "700",
    fontSize: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.grey[500],
    paddingHorizontal: 16,
  },
  avatar: {
    height: 50,
    width: 50,
  },
  itemWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[200],
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});
