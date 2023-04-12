import { CommonIconButton } from "components";
import { FilterSearchIcon, SearchIcon } from "icons";
import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "utils";

const Header = ({ total }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Job ({total})</Text>
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

Header.propTypes = {
  total: PropTypes.number,
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
