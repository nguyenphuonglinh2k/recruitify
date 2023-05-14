import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS } from "utils";
import PropTypes from "prop-types";
import { BarChart } from "react-native-chart-kit";
import { TaskService } from "services";
import { ApiConstant } from "const";
import { LoadingSpinner } from "components";

const TaskStatistics = ({ userId, style }) => {
  const [data, setData] = useState([0, 0, 0, 0, 0]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStatistics = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await TaskService.getWeeklyTaskStatistics(userId);

      if (response.status === ApiConstant.STT_OK) {
        const { monday, tuesday, wednesday, thursday, friday } = response.data;

        setData([monday, tuesday, wednesday, thursday, friday]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, userId]);

  useEffect(() => {
    handleGetStatistics();
  }, [handleGetStatistics]);

  return (
    <View style={[styles.root, style]}>
      <Text style={styles.title}>{`Weekly Task Statistics`}</Text>
      <BarChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thur", "Fri"],
          datasets: [{ data }],
        }}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={chartConfig}
        fromZero
        style={{ marginLeft: -16 }}
      />

      <LoadingSpinner isVisible={isLoading} />
    </View>
  );
};

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientTo: "white",
  color: () => COLORS.black,
  barPercentage: 0.8,
};

TaskStatistics.propTypes = {
  userId: PropTypes.string.isRequired,
  setIsLoading: PropTypes.func,
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
