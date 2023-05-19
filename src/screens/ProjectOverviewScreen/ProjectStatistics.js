import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "utils";
import { onGetProjectAndTaskStatusLabel } from "utils/label.utils";
import { PROGRESS_STATUS } from "const/app.const";
import { PieChart } from "react-native-chart-kit";
import PropTypes from "prop-types";
import { EmptyData } from "components";
import { memo } from "react";

const ProjectStatistics = ({ style, data }) => {
  return (
    <View style={[styles.root, style]}>
      <Text style={styles.title}>Project Statistics</Text>

      {data && Object.keys(data).length ? (
        <PieChart
          data={[
            {
              name: onGetProjectAndTaskStatusLabel(PROGRESS_STATUS.new),
              value: data.new,
              color: COLORS.blue.neutral,
              legendFontSize: 14,
            },
            {
              name: onGetProjectAndTaskStatusLabel(PROGRESS_STATUS.doing),
              value: data.doing,
              color: COLORS.orange.dark,
              legendFontSize: 14,
            },
            {
              name: onGetProjectAndTaskStatusLabel(PROGRESS_STATUS.done),
              value: data.done,
              color: COLORS.green,
              legendFontSize: 14,
            },
          ]}
          width={Dimensions.get("window").width}
          height={200}
          chartConfig={chartConfig}
          accessor={"value"}
          backgroundColor={"transparent"}
          center={[0, 0]}
          absolute
          avoidFalseZero
        />
      ) : (
        <EmptyData description="No project found!" />
      )}
    </View>
  );
};

ProjectStatistics.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setIsLoading: PropTypes.func,
  data: PropTypes.shape({
    new: PropTypes.number,
    doing: PropTypes.number,
    done: PropTypes.number,
  }),
};

const chartConfig = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
};

export default memo(ProjectStatistics);

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
