import { StyleSheet, TextInput } from "react-native";
import React from "react";
import { COLORS } from "utils";
import PropTypes from "prop-types";
import DetailItemRow, { contentStyle, paddingStyle } from "./DetailItemRow";

const TextInputBlock = ({
  value,
  onChangeText,
  label,
  placeholder = "",
  styles,
  textInputProps,
  ...otherProps
}) => {
  return (
    <DetailItemRow
      label={label}
      content={
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[currentStyles.textInput, styles?.textInput]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.grey[200]}
          {...textInputProps}
        />
      }
      {...otherProps}
    />
  );
};

TextInputBlock.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  styles: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    textInput: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  }),
  textInputProps: PropTypes.object,
};

export default TextInputBlock;

const currentStyles = StyleSheet.create({
  label: {},
  textInput: {
    ...contentStyle,
    ...paddingStyle,
    paddingVertical: 10,
  },
});