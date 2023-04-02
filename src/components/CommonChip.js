import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "utils";

const CommonChip = ({
  onPress,
  color,
  label,
  style,
  labelStyle,
  startAdornment,
  endAdornment,
  ...otherProps
}) => {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.7 : 1}
      style={[styles.wrapper(color), style]}
      onPress={onPress}
      {...otherProps}
    >
      {startAdornment ? startAdornment : <Fragment />}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      {endAdornment ? endAdornment : <Fragment />}
    </TouchableOpacity>
  );
};

CommonChip.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  color: PropTypes.string,
  startAdornment: PropTypes.node,
  endAdornment: PropTypes.node,
};

CommonChip.defaultProps = {
  color: COLORS.grey[200],
};

const styles = StyleSheet.create({
  wrapper: color => ({
    backgroundColor: color,
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
  }),
  label: {
    color: COLORS.black,
  },
});

export default CommonChip;
