import { ScrollView, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { ApplicationProcessStatus, DetailItemRow } from "components";
import { COLORS } from "utils";
import { paddingStyle } from "components/DetailItemRow";
import { CandidateDetailContext } from "..";

const ProcessTab = () => {
  const { application } = useContext(CandidateDetailContext);

  return (
    <>
      <ScrollView style={styles.root}>
        <DetailItemRow
          label="Status"
          content={
            <View style={paddingStyle}>
              <ApplicationProcessStatus value={application.status} />
            </View>
          }
        />
        <DetailItemRow label="Responsible for interviewing" content="" />
        <DetailItemRow
          label="Schedule time for interview"
          content="25/04/2023 9AM"
        />
        <DetailItemRow
          disabled
          label="Evaluation"
          content={""} //<CommonRating value={4} style={styles.rating} />
        />
      </ScrollView>
    </>
  );
};

export default ProcessTab;

const styles = StyleSheet.create({
  root: {
    paddingVertical: 16,
    flex: 1,
  },
  rating: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: COLORS.grey[200],
    borderBottomWidth: 1,
  },
});
