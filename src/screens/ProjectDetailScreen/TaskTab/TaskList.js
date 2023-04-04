import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { ConfirmDeleteModal } from "components";
import TaskItem from "./TaskItem";

const TaskList = props => {
  return (
    <>
      <FlatList
        data={MOCK_TASKS}
        renderItem={({ item }) => <TaskItem data={item} style={styles.item} />}
        keyExtractor={(_, index) => index}
        style={styles.root}
        {...props}
      />
      <ConfirmDeleteModal description="Do you really want to remove this task out of the project?" />
    </>
  );
};

const MOCK_TASKS = Array.from(new Array(3)).map(() => ({
  name: "Task 01",
  assigneeName: "John Herris",
  endDate: "01/02/2023",
  isSelf: true,
}));

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
