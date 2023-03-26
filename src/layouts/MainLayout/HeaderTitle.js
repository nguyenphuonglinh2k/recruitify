import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text } from "react-native";
import { COLORS } from "utils";

const HeaderTitle = ({ title, style, ...otherProps }) => {
  return (
    <Text style={[styles.title, style]} numberOfLines={1} {...otherProps}>
      {title}
    </Text>
  );
};

HeaderTitle.propTypes = {
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const styles = StyleSheet.create({
  title: {
    color: COLORS.black,
    fontWeight: "600",
    fontSize: 16,
  },
});

export default HeaderTitle;
