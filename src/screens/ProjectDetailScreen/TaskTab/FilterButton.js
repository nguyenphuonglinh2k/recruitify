import { StyleSheet } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { CommonButton } from "components";
import { CaretIcon } from "icons";
import { COLORS } from "utils";

const FilterButton = ({ label, style, labelStyle, ...otherProps }) => {
  return (
    <CommonButton
      style={[styles.root, style]}
      labelStyle={[{ color: COLORS.black }, labelStyle]}
      label={label}
      startAdornment={
        <CaretIcon style={{ marginRight: 4 }} color={COLORS.black} />
      }
      {...otherProps}
    />
  );
};

FilterButton.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default FilterButton;

const styles = StyleSheet.create({
  root: {
    borderRadius: 6,
    backgroundColor: COLORS.grey[200],
  },
});
