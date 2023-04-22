import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { isValidElement } from "react";
import PropTypes from "prop-types";
import DetailItemRow, { contentStyle, paddingStyle } from "./DetailItemRow";
import { CaretIcon } from "icons";

const SelectInputBlock = ({ value, label, onPress, ...otherProps }) => {
  return (
    <DetailItemRow
      label={label}
      content={
        <TouchableOpacity
          activeOpacity={0.8}
          style={[paddingStyle, styles.content]}
          onPress={onPress}
        >
          {isValidElement(value) ? (
            value
          ) : (
            <Text style={contentStyle}>{value ?? ""}</Text>
          )}
          <CaretIcon />
        </TouchableOpacity>
      }
      {...otherProps}
    />
  );
};

SelectInputBlock.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onPress: PropTypes.func,
};

export default SelectInputBlock;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
