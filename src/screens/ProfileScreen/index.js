import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { MainLayout } from "layouts";
import { CommonIconButton } from "components";
import { COLORS } from "utils";
import { PencilIcon } from "icons";
import Header from "./Header";
import Information from "./Information";

const ProfileScreen = () => {
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
      <ScrollView>
        <Header />
        <Information />
      </ScrollView>
    </MainLayout>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
