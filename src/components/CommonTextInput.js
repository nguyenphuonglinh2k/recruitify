import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TextInput } from "react-native";

const CommonTextInput = ({ style, ...otherProps }) => {
  return <TextInput style={[styles.input, style]} {...otherProps} />;
};

CommonTextInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeText: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default CommonTextInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#ffffff1c",
    borderRadius: 15,
    paddingHorizontal: 20,
    minHeight: 56,
    color: "white",
  },
});
