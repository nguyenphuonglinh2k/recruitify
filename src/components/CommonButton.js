import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CommonButton = ({ color, label, style, labelStyle, ...otherProps }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.wrapper(color), style]}
      {...otherProps}
    >
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
};

CommonButton.defaultProps = {
  color: "#02e079",
};

const styles = StyleSheet.create({
  wrapper: color => ({
    backgroundColor: color,
    borderRadius: 15,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
  }),
  label: {
    color: "white",
    fontWeight: "600",
  },
});

export default CommonButton;
