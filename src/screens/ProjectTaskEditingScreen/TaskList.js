import React from "react";
import { StyleSheet, View } from "react-native";
import TaskItem from "./TaskItem";
import PropTypes from "prop-types";

const TaskList = ({ data, ...otherProps }) => {
  return (
    <View {...otherProps}>
      {data.map((item, index) => (
        <TaskItem data={item} style={styles.item} key={index} />
      ))}
    </View>
  );
};

export default TaskList;

TaskList.propTypes = {
  data: PropTypes.array,
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
  },
});
