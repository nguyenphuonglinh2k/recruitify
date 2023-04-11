import { StyleSheet, Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { PROGRESS_STATUS } from "const/app.const";
import { COLORS } from "utils";
import { onGetProjectAndTaskStatusLabel } from "utils/label.utils";

const ProgressStatus = ({ value, style }) => {
  return (
    <Text style={[styles.root, onGetStatusStyle(value), style]}>
      {onGetProjectAndTaskStatusLabel(value)}
    </Text>
  );
};

const onGetStatusStyle = status => {
  switch (status) {
    case PROGRESS_STATUS.new:
      return styles.notStartedLabel;
    case PROGRESS_STATUS.doing:
      return styles.unFinishLabel;
    case PROGRESS_STATUS.done:
      return styles.finishLabel;
    default:
      return {};
  }
};

ProgressStatus.propTypes = {
  value: PropTypes.oneOf(Object.values(PROGRESS_STATUS)),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default ProgressStatus;

const styles = StyleSheet.create({
  root: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    fontWeight: "600",
    fontSize: 13,
  },
  finishLabel: {
    color: COLORS.darkGreen,
    backgroundColor: COLORS.lightGreen,
  },
  unFinishLabel: {
    color: COLORS.orange.dark,
    backgroundColor: COLORS.orange.light,
  },
  notStartedLabel: {
    color: COLORS.black,
    backgroundColor: COLORS.grey[200],
  },
});
