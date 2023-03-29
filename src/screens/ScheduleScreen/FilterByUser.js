import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { COLORS } from "utils";
import { memo } from "react";
import { FilterSearchIcon } from "icons";

const FilterByUser = ({ value, style, ...otherProps }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.root, style]}
      {...otherProps}
    >
      <FilterSearchIcon color={COLORS.black} />
      <Text style={styles.value}>{value}</Text>
    </TouchableOpacity>
  );
};

FilterByUser.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default memo(FilterByUser);

const styles = StyleSheet.create({
  root: {
    alignSelf: "flex-start",
    padding: 12,
    borderRadius: 10,
    backgroundColor: COLORS.lightGreen,
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    color: COLORS.black,
    fontWeight: "500",
    marginLeft: 8,
  },
});
