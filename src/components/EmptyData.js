import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { ImageSource } from "assets";
import { COLORS } from "utils";

const EmptyData = ({ description, ...otherProps }) => {
  return (
    <View {...otherProps}>
      <Image source={ImageSource.NotFoundImage} style={styles.image} />
      <Text style={styles.title}>{description}</Text>
    </View>
  );
};

EmptyData.propTypes = {
  description: PropTypes.string,
};

EmptyData.defaultProps = {
  description: "No information!",
};

export default EmptyData;

const styles = StyleSheet.create({
  root: {},
  image: {
    width: "100%",
    height: 250,
  },
  title: {
    color: COLORS.black,
    fontWeight: "600",
    marginTop: 10,
    textAlign: "center",
  },
});
