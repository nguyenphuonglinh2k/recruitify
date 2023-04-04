import { FlatList, StyleSheet } from "react-native";
import React from "react";
import ProjectItem from "./ProjectItem";

const ProjectList = props => {
  return (
    <FlatList
      data={MOCK_DATA}
      renderItem={({ item }) => <ProjectItem data={item} style={styles.item} />}
      keyExtractor={(_, index) => index}
      {...props}
    />
  );
};

const MOCK_DATA = Array.from(new Array(3)).map(() => ({
  title: "Recruitify mobile app project",
  isPriority: true,
  startDate: "01/03/2023",
  endDate: "01/04/2023",
  memberTotal: 2,
  taskTotal: 10,
}));

export default ProjectList;

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
  },
});
