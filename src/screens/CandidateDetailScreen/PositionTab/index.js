import { FlatList, StyleSheet } from "react-native";
import React, { useContext } from "react";
import PositionItem from "./PositionItem";
import { CandidateDetailContext } from "..";
import { EmptyData } from "components";

const PositionTab = () => {
  const { application } = useContext(CandidateDetailContext);

  return Object.keys(application?.jobId ?? {}).length ? (
    <FlatList
      data={[application.jobId]}
      renderItem={({ item }) => (
        <PositionItem data={item} style={styles.item} />
      )}
      keyExtractor={(_, index) => index}
      style={styles.root}
    />
  ) : (
    <EmptyData description="Candidate doesn't belong to any position" />
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
