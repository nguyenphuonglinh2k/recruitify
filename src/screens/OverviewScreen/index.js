import { StyleSheet } from "react-native";
import React from "react";
import { MainLayout } from "layouts";
import { CommonCalendar } from "components";

const OverviewScreen = () => {
  return (
    <MainLayout>
      <CommonCalendar />
    </MainLayout>
  );
};

export default OverviewScreen;

const styles = StyleSheet.create({});
