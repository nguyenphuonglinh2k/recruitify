import { StyleSheet, View, Text } from "react-native";
import React, { useMemo } from "react";
import { ProgressChart } from "react-native-chart-kit";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { COLORS } from "utils";
import PropTypes from "prop-types";

const ProjectProgressChart = ({ data }) => {
  const formatPercentage = number => {
    const numberFormat = new Intl.NumberFormat("en-US", { style: "percent" });
    return numberFormat.format(number);
  };

  const percentComplete = useMemo(() => {
    const totalProgress = (data ?? []).reduce((total, item) => {
      if (item.progress) {
        return total + (item.progress ?? 0); // from 0 -> 10
      } else {
        return total;
      }
    }, 0);

    const value = totalProgress / (data.length * 10) ?? 0;
    const fixedValue = value.toFixed(1);

    return isNaN(fixedValue) ? 0 : fixedValue ?? 0;
  }, [data]);

  return (
    <>
      <View style={styles.root}>
        <ProgressChart
          data={{ data: [0.2] }}
          width={SCREEN_WIDTH}
          height={220}
          strokeWidth={25}
          radius={80}
          chartConfig={chartConfig}
          hideLegend
        />
        <Text style={styles.progress}>{formatPercentage(percentComplete)}</Text>
      </View>
      <Text style={styles.text}>of project is completed</Text>
    </>
  );
};

ProjectProgressChart.propTypes = {
  data: PropTypes.array,
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#fff",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(56, 147, 57, ${opacity}) `,
};

export default ProjectProgressChart;

const styles = StyleSheet.create({
  root: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  progress: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "600",
    position: "absolute",
    // margin: "auto",
  },
  text: {
    textAlign: "center",
    color: COLORS.black,
    fontSize: 16,
    marginBottom: 8,
  },
});
