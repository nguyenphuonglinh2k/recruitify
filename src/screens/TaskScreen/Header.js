import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "utils";
import PropTypes from "prop-types";

const Header = ({ totalTask }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Task ({totalTask ?? 0})</Text>
    </View>
  );
};

export default Header;

Header.propTypes = {
  totalTask: PropTypes.number,
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    color: COLORS.black,
  },
  notLastIcon: {
    marginRight: 16,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
});
