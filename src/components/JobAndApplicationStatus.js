import { StyleSheet, Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { JOB_AND_APPLICATION_STATUS, PROGRESS_STATUS } from "const/app.const";
import { COLORS } from "utils";
import { onGetJobAndApplicationStatus } from "utils/label.utils";

const JobAndApplicationStatus = ({ value, style }) => {
  return (
    <Text style={[styles.root, onGetStatusStyle(value), style]}>
      {onGetJobAndApplicationStatus(value)}
    </Text>
  );
};

const onGetStatusStyle = status => {
  switch (status) {
    case JOB_AND_APPLICATION_STATUS.active:
      return styles.activeStyle;
    case JOB_AND_APPLICATION_STATUS.closed:
      return styles.closedStyle;
    default:
      return {};
  }
};

JobAndApplicationStatus.propTypes = {
  value: PropTypes.oneOf(Object.values(PROGRESS_STATUS)),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default JobAndApplicationStatus;

const styles = StyleSheet.create({
  root: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    fontWeight: "600",
    fontSize: 13,
  },
  closedStyle: {
    color: COLORS.yellow,
    backgroundColor: COLORS.lightYellow,
  },
  activeStyle: {
    color: COLORS.darkGreen,
    backgroundColor: COLORS.lightGreen,
  },
});
