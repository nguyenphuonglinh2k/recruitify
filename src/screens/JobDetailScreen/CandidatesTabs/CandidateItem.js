import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "utils";
import { CommonAvatar, CommonRating } from "components";
import { onGetApplicationStatusLabel } from "utils/label.utils";

const CandidateItem = ({ data, style }) => {
  const { avatarUrl, name, status, star } = data;

  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.root, style]}>
      <CommonAvatar source={{ uri: avatarUrl }} style={styles.left} />
      <View style={styles.right}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.status}>{`On ${onGetApplicationStatusLabel(
          status,
        )}`}</Text>
        <CommonRating value={star} style={{ marginTop: 8 }} />
      </View>
    </TouchableOpacity>
  );
};

CandidateItem.propTypes = {
  data: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.number,
    star: PropTypes.number,
  }),
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
