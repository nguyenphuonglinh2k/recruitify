import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "./Header";
import { MainLayout } from "layouts";
import CandidateItem from "./CandidateItem";
import { CommonIconButton } from "components";
import { useState } from "react";
import { APPLICATION_STATUS } from "const/app.const";
import CandidateTabBar from "./CandidateTabBar";
import { PencilIcon } from "icons";
import { COLORS } from "utils";

const CandidatesScreen = () => {
  const [activatedTab, setActivatedTab] = useState(
    APPLICATION_STATUS.screening,
  );

  return (
    <MainLayout
      headerProps={{
        headerRight: (
          <CommonIconButton>
            <PencilIcon color={COLORS.black} />
          </CommonIconButton>
        ),
      }}
    >
      <CandidateTabBar
        activatedTab={activatedTab}
        setActivatedTab={setActivatedTab}
      />
      <ScrollView style={[styles.root]}>
        <Header style={{ marginTop: 16 }} />

        {activatedTab === APPLICATION_STATUS.screening && (
          <View style={styles.positions}>
            {MOCK_CANDIDATES.map((data, index) => (
              <CandidateItem
                key={index}
                data={data}
                style={styles.marginBottom}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </MainLayout>
  );
};

const MOCK_CANDIDATES = Array.from(new Array(7)).map(() => ({
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
    paddingHorizontal: 16,
  },
  positions: {
    flex: 1,
    marginTop: 16,
  },
  marginBottom: {
    marginBottom: 10,
  },
});
