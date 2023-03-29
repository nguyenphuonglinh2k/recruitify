import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "utils";

const CommonTab = ({ isSelected, label, style, labelStyle, ...otherProps }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.root, isSelected && styles.selectedRoot, style]}
      {...otherProps}
    >
      <Text
        style={[styles.label, isSelected && styles.selectedLabel, labelStyle]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(CommonTab);

CommonTab.propTypes = {
  isSelected: PropTypes.bool,
  label: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const styles = StyleSheet.create({
  label: {
    color: COLORS.grey[400],
    textAlign: "center",
    fontWeight: "600",
  },
  selectedLabel: {
    color: COLORS.black,
    fontWeight: "600",
  },
  selectedRoot: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.green,
  },
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 10,
  },
});
