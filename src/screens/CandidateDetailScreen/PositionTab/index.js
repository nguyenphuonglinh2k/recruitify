import { FlatList, StyleSheet } from "react-native";
import React from "react";
import PositionItem from "./PositionItem";

const PositionTab = () => {
  return (
    <FlatList
      data={MOCK_DATA}
      renderItem={({ item }) => (
        <PositionItem data={item} style={styles.item} />
      )}
      keyExtractor={(_, index) => index}
      style={styles.root}
    />
  );
};

export default PositionTab;

const MOCK_DATA = Array.from(new Array(3)).map(() => ({
  title: "Font-end Engineer",
  isPriority: true,
  appliedResumeTotal: 7,
  startDate: "01/03/2023",
  endDate: "01/04/2023",
}));

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  item: {
    marginBottom: 10,
  },
});
