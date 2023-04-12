import { StyleSheet, Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { APPLICATION_STATUS } from "const/app.const";
import { COLORS } from "utils";
import { onGetApplicationStatusLabel } from "utils/label.utils";

const ApplicationProcessStatus = ({ value, style }) => {
  return (
    <Text style={[styles.root, onGetStatusStyle(value), style]}>
      {onGetApplicationStatusLabel(value)}
    </Text>
  );
};

const onGetStatusStyle = status => {
  switch (status) {
    case APPLICATION_STATUS.interview:
      return styles.interview;
    case APPLICATION_STATUS.hire:
      return styles.hire;
    case APPLICATION_STATUS.reject:
      return styles.reject;
    case APPLICATION_STATUS.screening:
    default:
      return styles.screening;
  }
};

ApplicationProcessStatus.propTypes = {
  value: PropTypes.oneOf(Object.values(APPLICATION_STATUS)),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default ApplicationProcessStatus;

const styles = StyleSheet.create({
  root: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    fontWeight: "600",
    fontSize: 13,
  },
  reject: {
    color: COLORS.orange.dark,
    backgroundColor: COLORS.orange.light,
  },
  hire: {
    color: COLORS.darkGreen,
    backgroundColor: COLORS.lightGreen,
  },
  screening: {
    color: COLORS.blue.neutral,
    backgroundColor: COLORS.blue[100],
  },
  interview: {
    color: COLORS.pink,
    backgroundColor: COLORS.lightPink,
  },
});
