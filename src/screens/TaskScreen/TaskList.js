import { FlatList, StyleSheet } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import TaskItem from "./TaskItem";

const TaskList = ({ data, ...otherProps }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <TaskItem data={item} style={styles.item} />}
      keyExtractor={(_, index) => index}
      {...otherProps}
    />
  );
};

TaskList.propTypes = {
  data: PropTypes.array,
};

export default TaskList;

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
  },
});
