import { FlatList, StyleSheet } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import MemberItem from "./MemberItem";

const MemberTab = ({ style, ...otherProps }) => {
  return (
    <FlatList
      data={MOCK_MEMBERS}
      renderItem={({ item }) => <MemberItem data={item} style={styles.item} />}
      keyExtractor={(_, index) => index}
      style={[styles.root, style]}
      {...otherProps}
    />
  );
};

MemberTab.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const MOCK_MEMBERS = Array.from(new Array(3)).map(() => ({
  name: "Alexandar Greg",
  avatarUrl:
    "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/hinh-anh-avatar-tiktok-cute.jpg",
}));

export default MemberTab;

const styles = StyleSheet.create({
  root: {
    // margin: 16,
  },
  item: {
    // marginBottom: 10,
  },
});
