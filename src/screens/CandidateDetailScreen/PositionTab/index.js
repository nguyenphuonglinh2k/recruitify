import { FlatList, StyleSheet } from "react-native";
import React, { useContext } from "react";
import PositionItem from "./PositionItem";
import { CandidateDetailContext } from "..";

const PositionTab = () => {
  const { application } = useContext(CandidateDetailContext);

  return (
    <FlatList
      data={[application.jobId]}
      renderItem={({ item }) => (
        <PositionItem data={item} style={styles.item} />
      )}
      keyExtractor={(_, index) => index}
      style={styles.root}
    />
  );
};

export default PositionTab;

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  item: {
    marginBottom: 10,
  },
});
