import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "utils";
import {
  ApplicationProcessStatus,
  CommonAvatar,
  CommonRating,
} from "components";

const CandidateItem = ({ status, data, style, ...otherProps }) => {
  const { avatarUrl, name, star, email } = data;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.root, style]}
      {...otherProps}
    >
      <CommonAvatar source={{ uri: avatarUrl }} style={styles.left} />
      <View style={styles.right}>
        <Text style={styles.name}>{name}</Text>
        <Text>{email}</Text>
        <ApplicationProcessStatus value={status} style={{ marginTop: 6 }} />

        {star && <CommonRating value={star} style={{ marginTop: 8 }} />}
      </View>
    </TouchableOpacity>
  );
};

CandidateItem.propTypes = {
  data: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
    star: PropTypes.number,
    email: PropTypes.string,
  }),
  status: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default CandidateItem;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    borderRadius: 10,
    borderColor: COLORS.grey[200],
    borderWidth: 2,
    padding: 12,
    flexDirection: "row",
    backgroundColor: COLORS.grey[300],
  },
  left: {
    height: 50,
    width: 50,
  },
  right: {
    marginLeft: 10,
  },
  name: {
    fontWeight: "600",
    color: COLORS.black,
    fontSize: 16,
  },
});
