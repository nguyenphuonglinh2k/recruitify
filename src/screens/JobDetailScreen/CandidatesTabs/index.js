import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import CandidateItem from "./CandidateItem";

const CandidatesTab = ({ style }) => {
  return (
    <ScrollView style={[styles.root, style]}>
      {MOCK_CANDIDATES.map((candidate, index) => (
        <CandidateItem
          key={index}
          data={candidate}
          style={index !== 0 ? styles.marginTop : {}}
        />
      ))}
    </ScrollView>
  );
};

const MOCK_CANDIDATES = Array.from(new Array(3)).map(() => ({
  name: "Alexandar Greg",
  email: "grek@gmail.com",
  avatarUrl:
    "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/hinh-anh-avatar-tiktok-cute.jpg",
  status: 1,
  star: 2,
}));

CandidatesTab.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default CandidatesTab;

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  marginTop: {
    marginTop: 10,
  },
});
