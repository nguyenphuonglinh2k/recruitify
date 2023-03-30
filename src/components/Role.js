import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { onGetUserRoleLabel } from "utils/label.utils";
import { AppConstant } from "const";
import { memo } from "react";
import {
  onGetUserRoleBackgroundColor,
  onGetUserRoleLabelColor,
} from "utils/color.utils";

const Role = ({ value, style, labelStyle, ...otherProps }) => {
  const styles = useStyles(value);

  return (
    <View style={[styles.root, style]} {...otherProps}>
      <Text style={[styles.label, labelStyle]}>
        {onGetUserRoleLabel(value)}
      </Text>
    </View>
  );
};

Role.propTypes = {
  value: PropTypes.oneOf(Object.values(AppConstant.USER_ROLE)).isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default memo(Role);

const useStyles = value =>
  StyleSheet.create({
    root: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      backgroundColor: onGetUserRoleBackgroundColor(value),
      borderRadius: 8,
      alignSelf: "center",
    },
    label: {
      textAlign: "center",
      color: onGetUserRoleLabelColor(value),
      fontWeight: "500",
    },
  });
