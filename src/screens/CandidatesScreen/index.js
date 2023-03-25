import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "./Header";
import { MainLayout } from "layouts";
import CandidateItem from "./CandidateItem";

const CandidatesScreen = () => {
  return (
    <MainLayout>
      <ScrollView style={styles.root}>
        <Header />

        <View style={styles.positions}>
          {MOCK_CANDIDATES.map((data, index) => (
            <CandidateItem
              key={index}
              data={data}
              style={styles.marginBottom}
            />
          ))}
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const MOCK_CANDIDATES = Array.from(new Array(3)).map(() => ({
  name: "Alexandar Greg",
  email: "grek@gmail.com",
  avatarUrl:
    "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/hinh-anh-avatar-tiktok-cute.jpg",
  status: 1,
  star: 2,
  position: "Junior Cloud Computing",
}));

export default CandidatesScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  positions: {
    flex: 1,
    marginTop: 16,
  },
  marginBottom: {
    marginBottom: 10,
  },
});
