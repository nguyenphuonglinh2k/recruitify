import React from "react";
import { StyleSheet, View } from "react-native";
import TaskItem from "./TaskItem";
import PropTypes from "prop-types";

const TaskList = ({
  displayData,
  data,
  setData,
  setDisplayData,
  ...otherProps
}) => {
  const handleChangeValue = (item, index) => {
    const newDisplayData = [
      ...displayData.slice(0, index),
      { ...displayData[index], isChecked: !displayData[index].isChecked },
      ...displayData.slice(index + 1),
    ];

    const indexData = data.findIndex(task => task._id === item._id);
    const newData = [
      ...data.slice(0, indexData),
      { ...data[indexData], isChecked: !data[indexData].isChecked },
      ...data.slice(indexData + 1),
    ];

    if (setDisplayData) {
      setDisplayData(newDisplayData);
    }

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
          onPress={() => handleChangeValue(item, index)}
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
  setDisplayData: PropTypes.func,
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
  },
});
