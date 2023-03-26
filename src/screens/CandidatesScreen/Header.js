import { CommonIconButton } from "components";
import { FilterSearchIcon, SearchIcon } from "icons";
import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "utils";

const Header = ({ style }) => {
  return (
    <View style={[styles.header, style]}>
      <Text style={styles.title}>Candidate (3)</Text>
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

Header.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

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
