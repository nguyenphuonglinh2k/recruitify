import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "utils";
import PropTypes from "prop-types";
import TaskItem from "./TaskItem";
import { EmptyData } from "components";

const TodayTask = ({ data, style }) => {
  return (
    <View style={[styles.root, style]}>
      <Text style={styles.title}>Today Task</Text>
      {data.length ? (
        data.map((task, index) => (
          <TaskItem key={index} data={task} style={styles.item} />
        ))
      ) : (
        <EmptyData description="No today's tasks found!" />
      )}
    </View>
  );
};

TodayTask.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  data: PropTypes.array,
};

export default TodayTask;

const styles = StyleSheet.create({
  root: {},
  title: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
  item: {
    marginBottom: 10,
  },
});
