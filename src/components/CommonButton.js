import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "utils";

const CommonButton = ({
  color,
  label,
  disabled,
  onPress,
  style,
  labelStyle,
  startAdornment,
  ...otherProps
}) => {
  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.7}
      onPress={disabled ? null : onPress}
      style={[styles.wrapper(color, disabled), style]}
      {...otherProps}
    >
      {startAdornment}
      <Text style={[styles.label, labelStyle]} numberOfLines={1}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

CommonButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  color: PropTypes.string,
  startAdornment: PropTypes.node,
};

CommonButton.defaultProps = {
  color: COLORS.green,
};

const styles = StyleSheet.create({
  wrapper: (color, disabled) => ({
    backgroundColor: disabled ? COLORS.grey[100] : color,
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
