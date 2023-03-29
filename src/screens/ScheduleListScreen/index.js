import { StyleSheet, View } from "react-native";
import React from "react";
import { MainLayout } from "layouts";
import { CommonFloatButton } from "components";
import ScheduleItem from "./ScheduleItem";
import { useRoute } from "@react-navigation/core";

const ScheduleListScreen = () => {
  const route = useRoute();
  const { date } = route.params;

  return (
    <MainLayout isBackScreen headerProps={{ title: `All schedule ${date}` }}>
      <View style={styles.list}>
        {MOCK_DATA.map((data, index) => (
          <ScheduleItem
            key={index}
            data={data}
            style={index !== 0 ? styles.mt : {}}
          />
        ))}
      </View>

      <CommonFloatButton />
    </MainLayout>
  );
};

const MOCK_DATA = Array.from(new Array(3)).map(() => ({
  title: "Base interview with John",
  date: "Friday, March 12th",
  time: "9:00 - 10:00",
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

export default ScheduleListScreen;

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  mt: {
    marginTop: 10,
  },
});
