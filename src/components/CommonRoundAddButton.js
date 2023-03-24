import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import { PlusIcon } from "icons";
import { COLORS } from "utils";

const CommonRoundAddButton = ({ color, style, iconStyle, ...otherProps }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.wrapper(color), style]}
      {...otherProps}
    >
      <PlusIcon style={iconStyle} />
    </TouchableOpacity>
  );
};

CommonRoundAddButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  color: PropTypes.string,
};

CommonRoundAddButton.defaultProps = {
  color: COLORS.green,
};

const styles = StyleSheet.create({
  wrapper: color => ({
    backgroundColor: color,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
  }),
});

export default CommonRoundAddButton;
