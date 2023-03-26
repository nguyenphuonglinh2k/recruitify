import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { CommonFloatButton, DetailItemRow } from "components";
import { PencilIcon } from "icons";
import { COLORS } from "utils";

const ProcessTab = () => {
  return (
    <>
      <ScrollView style={styles.root}>
        <DetailItemRow label="Status" content="On reviewing" />
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

      <CommonFloatButton icon={<PencilIcon color={COLORS.white} />} />
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
