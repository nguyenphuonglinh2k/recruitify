import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { ConfirmDeleteModal } from "components";
import TaskItem from "./TaskItem";

const TaskList = props => {
  return (
    <>
      <FlatList
        renderItem={({ item }) => <TaskItem data={item} style={styles.item} />}
        keyExtractor={(_, index) => index}
        style={styles.root}
        {...props}
      />
      <ConfirmDeleteModal description="Do you really want to remove this task out of the project?" />
    </>
  );
};

export default TaskList;

TaskList.propTypes = {};

const styles = StyleSheet.create({
  root: {
    margin: 16,
  },
  item: {
    marginBottom: 10,
  },
});
