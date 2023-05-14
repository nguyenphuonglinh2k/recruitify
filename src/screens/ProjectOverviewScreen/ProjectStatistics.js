import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "utils";
import { onGetProjectAndTaskStatusLabel } from "utils/label.utils";
import { PROGRESS_STATUS } from "const/app.const";
import { PieChart } from "react-native-chart-kit";
import PropTypes from "prop-types";

const ProjectStatistics = ({ style }) => {
  return (
    <View style={[styles.root, style]}>
      <Text style={styles.title}>Project Statistics</Text>
      <PieChart
        data={data}
        width={Dimensions.get("window").width}
        height={200}
        chartConfig={chartConfig}
        accessor={"value"}
        backgroundColor={"transparent"}
        center={[0, 0]}
        absolute
        avoidFalseZero
      />
    </View>
  );
};

ProjectStatistics.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const chartConfig = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
};

const data = [
  {
    name: onGetProjectAndTaskStatusLabel(PROGRESS_STATUS.new),
    value: 100,
    color: COLORS.blue.neutral,
    legendFontSize: 14,
  },
  {
    name: onGetProjectAndTaskStatusLabel(PROGRESS_STATUS.doing),
    value: 100,
    color: COLORS.orange.dark,
    legendFontSize: 14,
  },
  {
    name: onGetProjectAndTaskStatusLabel(PROGRESS_STATUS.done),
    value: 100,
    color: COLORS.green,
    legendFontSize: 14,
  },
];

export default ProjectStatistics;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
});
