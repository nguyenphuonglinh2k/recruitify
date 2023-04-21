import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import React from "react";
import { CommonAvatar } from "components";
import { COLORS } from "utils";
import { useSelector } from "react-redux";

const Creator = ({ style }) => {
  const job = useSelector(({ jobRedux }) => jobRedux.job);

  return (
    <View style={style}>
      <Text style={styles.label}>Creator</Text>

      <View style={styles.contentWrapper}>
        <CommonAvatar
          source={{
            uri: job.creatorId?.avatarUrl,
          }}
          style={styles.avatar}
        />
        <Text style={styles.textValue}>{job.creatorId?.name}</Text>
      </View>
    </View>
  );
};

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
    fontWeight: "500",
    marginLeft: 10,
    fontSize: 16,
  },
});
