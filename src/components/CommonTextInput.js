import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TextInput } from "react-native";
import { COLORS } from "utils";

const CommonTextInput = ({ label, style, labelStyle, ...otherProps }) => {
  return (
    <>
      {Boolean(label) && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      <TextInput style={[styles.input, style]} {...otherProps} />
    </>
  );
};

CommonTextInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeText: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
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
  label: {
    color: COLORS.black,
    fontWeight: "500",
    marginBottom: 6,
    fontSize: 13,
  },
});
