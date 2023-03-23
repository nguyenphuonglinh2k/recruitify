import { Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import React from "react";

const CommonAvatar = ({ source, style, ...otherProps }) => {
  return <Image source={source} style={[styles.root, style]} {...otherProps} />;
};

CommonAvatar.propTypes = {
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default CommonAvatar;

const styles = StyleSheet.create({
  root: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
