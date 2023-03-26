import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import React, { memo } from "react";
import CommonRoundAddButton from "./CommonRoundAddButton";
import { COLORS } from "utils";

const CommonFloatButton = ({ style, ...otherProps }) => {
  return <CommonRoundAddButton style={[styles.root, style]} {...otherProps} />;
};

CommonFloatButton.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default memo(CommonFloatButton);

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.green,
    boxShadow: "0px 4px 4px 0px #B5BBBE",
    elevation: 5,
  },
});
