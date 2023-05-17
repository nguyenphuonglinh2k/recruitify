import { Linking, ScrollView, StyleSheet, Text } from "react-native";
import React from "react";
import { COLORS } from "utils";
import AttachmentItem from "./AttachmentItem";
import { useSelector } from "react-redux";

const AttachmentTab = () => {
  const application = useSelector(
    ({ applicationRedux }) => applicationRedux.application,
  );

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.label}>Resume</Text>
      {application?.attachments.map((item, index) => (
        <AttachmentItem
          key={index}
          data={item}
          onPress={() => {
            Linking.openURL(item.url);
          }}
        />
      ))}
    </ScrollView>
  );
};

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
