import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import { PlusIcon } from "icons";
import { COLORS } from "utils";
import { isValidElement } from "react";

const CommonRoundAddButton = ({
  color,
  style,
  iconStyle,
  icon,
  ...otherProps
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.wrapper(color), style]}
      {...otherProps}
    >
      {isValidElement(icon) ? icon : <PlusIcon style={iconStyle} />}
    </TouchableOpacity>
  );
};

CommonRoundAddButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  color: PropTypes.string,
  icon: PropTypes.node,
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
