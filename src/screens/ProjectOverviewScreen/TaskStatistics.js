import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "utils";
import PropTypes from "prop-types";
import { BarChart } from "react-native-chart-kit";

const TaskStatistics = ({ style }) => {
  return (
    <View style={[styles.root, style]}>
      <Text style={styles.title}>{`Task Statistics`}</Text>
      <BarChart
        data={data}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={chartConfig}
        fromZero
        style={{ marginLeft: -16 }}
      />
    </View>
  );
};

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientTo: "white",
  color: () => COLORS.black,
  barPercentage: 0.8,
};

const data = {
  labels: ["Mon", "Tue", "Wed", "Thur", "Fri"],
  datasets: [
    {
      data: [3, 4, 2, 4, 5],
    },
  ],
};

TaskStatistics.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default TaskStatistics;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "flex-start",
  },
  title: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
});
