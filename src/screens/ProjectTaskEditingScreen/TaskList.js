import React from "react";
import { StyleSheet, View } from "react-native";
import TaskItem from "./TaskItem";
import PropTypes from "prop-types";

const TaskList = ({ displayData, data, setData, ...otherProps }) => {
  const handleChangeValue = index => {
    const newData = [
      ...data.slice(0, index),
      { ...data[index], isChecked: !data[index].isChecked },
      ...data.slice(index + 1),
    ];

    if (setData) {
      setData(newData);
    }
  };

  return (
    <View {...otherProps}>
      {displayData.map((item, index) => (
        <TaskItem
          data={item}
          style={styles.item}
          key={index}
          onPress={() => handleChangeValue(index)}
        />
      ))}
    </View>
  );
};

export default TaskList;

TaskList.propTypes = {
  data: PropTypes.array,
  setData: PropTypes.func,
  displayData: PropTypes.array,
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
  },
});
