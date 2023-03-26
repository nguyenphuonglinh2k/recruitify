import { ScrollView, StyleSheet, Text } from "react-native";
import React from "react";
import { COLORS } from "utils";
import AttachmentItem from "./AttachmentItem";

const AttachmentTab = () => {
  return (
    <ScrollView style={styles.root}>
      <Text style={styles.label}>Resume</Text>
      {MOCK_ATTACHMENTS.map(({ name }, index) => (
        <AttachmentItem key={index} content={name} />
      ))}

      <Text style={styles.label}>Others</Text>
      {MOCK_OTHER_ATTACHMENTS.map(({ name }, index) => (
        <AttachmentItem key={index} content={name} />
      ))}
    </ScrollView>
  );
};

const MOCK_ATTACHMENTS = [{ name: "Paul_Harris_CV.pdf" }];

const MOCK_OTHER_ATTACHMENTS = [{ name: "AWS Certification.pdf" }];

export default AttachmentTab;

const styles = StyleSheet.create({
  root: {
    paddingVertical: 16,
  },
  label: {
    color: COLORS.black,
    fontWeight: "600",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.grey[500],
  },
});
