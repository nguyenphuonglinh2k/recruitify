import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "./Header";
import { MainLayout } from "layouts";
import PositionItem from "./PositionItem";

const PositionScreen = () => {
  return (
    <MainLayout>
      <ScrollView style={styles.root}>
        <Header />

        <View style={styles.positions}>
          {MOCK_DATA.map((data, index) => (
            <PositionItem key={index} data={data} style={styles.marginBottom} />
          ))}
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const MOCK_DATA = Array.from(new Array(3)).map(() => ({
  title: "Font-end Engineer",
  isPriority: true,
  appliedResumeTotal: 7,
  startDate: "01/03/2023",
  endDate: "01/04/2023",
  assignees: [
    {
      avatarUrl:
        "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/hinh-anh-avatar-tiktok-cute.jpg",
    },
    {
      avatarUrl:
        "https://toigingiuvedep.vn/wp-content/uploads/2022/01/hinh-avatar-cute-nu.jpg",
    },
    {
      avatarUrl:
        "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl=1",
    },
  ],
}));

export default PositionScreen;

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
