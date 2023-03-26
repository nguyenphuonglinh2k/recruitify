import { CommonIconButton } from "components";
import { FilterSearchIcon, SearchIcon } from "icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "utils";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Job (3)</Text>
      <View style={styles.icons}>
        <CommonIconButton style={styles.notLastIcon}>
          <SearchIcon />
        </CommonIconButton>
        <CommonIconButton>
          <FilterSearchIcon />
        </CommonIconButton>
      </View>
    </View>
  );
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
  notLastIcon: {
    marginRight: 16,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
});
