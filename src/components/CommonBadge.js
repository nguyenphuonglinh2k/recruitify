import React, { memo } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import { AppConstant } from "const";
import { COLORS } from "utils";

const CommonBadge = ({ value, maximum, style, ...otherProps }) => {
  const verifiedValue = value > maximum ? `${value}+` : value;

  return (
    <View style={[styles.root, style]} {...otherProps}>
      <Text style={styles.value}>{verifiedValue}</Text>
    </View>
  );
};

CommonBadge.propTypes = {
  value: PropTypes.number.isRequired,
  maximum: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

CommonBadge.defaultProps = {
  maximum: AppConstant.MAXIMUM_BADGE_NUMBER,
};

export default memo(CommonBadge);

const styles = StyleSheet.create({
  root: {
    backgroundColor: "rgba(2, 224, 121, 0.1)",
    borderRadius: 10,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 20,
  },
  value: {
    fontWeight: "600",
    color: COLORS.green,
    fontSize: 12,
  },
});
