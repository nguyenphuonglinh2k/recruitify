import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { COLORS } from "utils";
import { ArrowIcon } from "icons";

const SettingItem = ({ label, style, ...otherProps }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.root, style]}
      {...otherProps}
    >
      <Text style={styles.label}>{label}</Text>
      <ArrowIcon color={COLORS.black} style={styles.icon} />
    </TouchableOpacity>
  );
};

SettingItem.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default SettingItem;

const styles = StyleSheet.create({
  root: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.grey[200],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    color: COLORS.black,
    fontWeight: "600",
    fontSize: 16,
    flex: 1,
  },
  icon: {
    transform: [{ rotate: "180deg" }],
  },
});
