import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "utils";
import PropTypes from "prop-types";

const Header = ({ total, style }) => {
  return (
    <View style={[styles.header, style]}>
      <Text style={styles.title}>Project ({total})</Text>
    </View>
  );
};

Header.propTypes = {
  total: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    color: COLORS.black,
  },
});
