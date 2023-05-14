import { StyleSheet, Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { RESULT_STATUS } from "const/app.const";
import { COLORS } from "utils";
import { onGetResultStatusLabel } from "utils/label.utils";

const ResultStatus = ({ value, style }) => {
  return (
    <Text style={[styles.root, onGetStatusStyle(value), style]}>
      {onGetResultStatusLabel(value)}
    </Text>
  );
};

const onGetStatusStyle = status => {
  switch (status) {
    case RESULT_STATUS.qualified:
      return styles.qualifiedLabel;
    case RESULT_STATUS.unqualified:
      return styles.unqualifiedLabel;
    default:
      return styles.notEvaluatedLabel;
  }
};

ResultStatus.propTypes = {
  value: PropTypes.oneOf(Object.values(RESULT_STATUS)),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default ResultStatus;

const styles = StyleSheet.create({
  root: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    fontWeight: "600",
    fontSize: 13,
  },
  unqualifiedLabel: {
    color: COLORS.pink,
    backgroundColor: COLORS.lightPink,
  },
  qualifiedLabel: {
    color: COLORS.darkGreen,
    backgroundColor: COLORS.lightGreen,
  },
  notEvaluatedLabel: {
    color: COLORS.orange.dark,
    backgroundColor: COLORS.orange.light,
  },
});
