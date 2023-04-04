import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "utils";

const CommonButton = ({
  color,
  label,
  style,
  labelStyle,
  startAdornment,
  ...otherProps
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.wrapper(color), style]}
      {...otherProps}
    >
      {startAdornment}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

CommonButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  color: PropTypes.string,
  startAdornment: PropTypes.node,
};

CommonButton.defaultProps = {
  color: COLORS.green,
};

const styles = StyleSheet.create({
  wrapper: color => ({
    backgroundColor: color,
    borderRadius: 15,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  }),
  label: {
    color: "white",
    fontWeight: "600",
  },
});

export default CommonButton;
