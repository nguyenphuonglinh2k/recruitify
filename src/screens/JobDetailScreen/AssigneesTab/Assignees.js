import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import React from "react";
import { CommonAvatar } from "components";
import { COLORS } from "utils";
import { useSelector } from "react-redux";

const Assignees = ({ style }) => {
  const job = useSelector(({ jobRedux }) => jobRedux.job);

  return (
    <View style={style}>
      <Text style={styles.label}>Assignees</Text>

      <View>
        {job?.assigneeIds.map(({ avatarUrl, name }, index) => (
          <View key={index} style={styles.itemWrapper}>
            <CommonAvatar source={{ uri: avatarUrl }} style={styles.avatar} />
            <Text style={styles.name}>{name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

Assignees.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Assignees;

const styles = StyleSheet.create({
  label: {
    color: COLORS.black,
    fontWeight: "600",
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
