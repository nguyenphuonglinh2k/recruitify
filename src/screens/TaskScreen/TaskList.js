import { FlatList, StyleSheet } from "react-native";
import React from "react";
import TaskItem from "./TaskItem";

const TaskList = props => {
  return (
    <FlatList
      data={MOCK_DATA}
      renderItem={({ item }) => <TaskItem data={item} style={styles.item} />}
      keyExtractor={(_, index) => index}
      {...props}
    />
  );
};

const MOCK_DATA = Array.from(new Array(3)).map(() => ({
  isPriority: true,
  name: "Create design version 01",
  progress: 0.3,
  endDate: "2023-04-28",
  projectName: "Recruitify mobile design",
}));

export default TaskList;

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
  },
});
