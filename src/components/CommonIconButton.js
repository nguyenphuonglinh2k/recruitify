import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";

const CommonIconButton = ({ children, ...otherProps }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} {...otherProps}>
      {children}
    </TouchableOpacity>
  );
};

CommonIconButton.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
};

export default CommonIconButton;
