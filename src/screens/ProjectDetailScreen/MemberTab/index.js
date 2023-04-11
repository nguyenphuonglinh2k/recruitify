import { FlatList, StyleSheet } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import MemberItem from "./MemberItem";

const MemberTab = ({ data, style, ...otherProps }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <MemberItem data={item} style={styles.item} />}
      keyExtractor={(_, index) => index}
      style={[styles.root, style]}
      {...otherProps}
    />
  );
};

MemberTab.propTypes = {
  data: PropTypes.array,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default MemberTab;

const styles = StyleSheet.create({
  root: {
    // margin: 16,
  },
  item: {
    // marginBottom: 10,
  },
});
