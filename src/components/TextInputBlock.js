import { StyleSheet, TextInput } from "react-native";
import React from "react";
import { COLORS } from "utils";
import PropTypes from "prop-types";
import DetailItemRow, { contentStyle, paddingStyle } from "./DetailItemRow";

const TextInputBlock = ({
  value,
  onChangeText,
  label,
  keyboardType,
  placeholder = "",
  styles,
  disabled,
  textInputProps,
  secureTextEntry,
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
          keyboardType={keyboardType}
          editable={!disabled}
          secureTextEntry={secureTextEntry}
          {...textInputProps}
        />
      }
      disabled={disabled}
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
  keyboardType: PropTypes.string,
  textInputProps: PropTypes.object,
  disabled: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
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
