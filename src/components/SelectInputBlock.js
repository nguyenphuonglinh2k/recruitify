import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { isValidElement } from "react";
import PropTypes from "prop-types";
import DetailItemRow, { contentStyle, paddingStyle } from "./DetailItemRow";
import { CaretIcon } from "icons";

const SelectInputBlock = ({
  value,
  label,
  onPress,
  disabled,
  ...otherProps
}) => {
  return (
    <DetailItemRow
      label={label}
      content={
        <TouchableOpacity
          activeOpacity={disabled ? 1 : 0.8}
          style={[paddingStyle, styles.content]}
          onPress={disabled ? null : onPress}
        >
          {isValidElement(value) ? (
            value
          ) : (
            <Text style={contentStyle}>{value ?? ""}</Text>
          )}
          <CaretIcon />
        </TouchableOpacity>
      }
      disabled={disabled}
      {...otherProps}
    />
  );
};

SelectInputBlock.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.node,
  ]),
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SelectInputBlock;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
