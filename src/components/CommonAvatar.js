import { Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import React from "react";
import { ImageSource } from "assets";

const CommonAvatar = ({ source, style, ...otherProps }) => {
  return (
    <Image
      source={source ?? ImageSource.DefaultAvatarImage}
      style={[styles.root, style]}
      {...otherProps}
    />
  );
};

CommonAvatar.propTypes = {
  source: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

CommonAvatar.defaultProps = {
  source: ImageSource.DefaultAvatarImage,
};

export default CommonAvatar;

const styles = StyleSheet.create({
  root: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
