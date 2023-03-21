import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CommonTextButton = ({
  color,
  label,
  style,
  labelStyle,
  ...otherProps
}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} style={style} {...otherProps}>
      <Text style={[styles.label(color), labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

CommonTextButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  color: PropTypes.string,
};

CommonTextButton.defaultProps = {
  color: "#02e079",
};

const styles = StyleSheet.create({
  label: color => ({
    color,
  }),
});

export default CommonTextButton;
