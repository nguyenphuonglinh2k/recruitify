import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { MainLayout } from "layouts";
import ApplicationStatistics from "./ApplicationStatistics";
import Activities from "./Activities";

const CandidateOverviewScreen = () => {
  return (
    <MainLayout>
      <ScrollView style={{ margin: 16 }} showsVerticalScrollIndicator={false}>
        <ApplicationStatistics style={styles.bottomSpacing} />

        <Activities />
      </ScrollView>
    </MainLayout>
  );
};

export default CandidateOverviewScreen;

const styles = StyleSheet.create({
  bottomSpacing: {
    marginBottom: 16,
  },
});
