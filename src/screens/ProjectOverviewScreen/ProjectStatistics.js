import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS } from "utils";
import { onGetProjectAndTaskStatusLabel } from "utils/label.utils";
import { PROGRESS_STATUS } from "const/app.const";
import { PieChart } from "react-native-chart-kit";
import PropTypes from "prop-types";
import { ProjectService } from "services";
import { ApiConstant } from "const";
import { EmptyData } from "components";

const ProjectStatistics = ({ style, setIsLoading }) => {
  const [data, setData] = useState([]);

  const handleGetProjectStatistics = useCallback(async () => {
    if (setIsLoading) setIsLoading(true);

    try {
      const response = await ProjectService.getProjectStatistics();

      if (response.status === ApiConstant.STT_OK) {
        const responseData = response.data;

        const newData = [
          {
            name: onGetProjectAndTaskStatusLabel(PROGRESS_STATUS.new),
            value: responseData.new,
            color: COLORS.blue.neutral,
            legendFontSize: 14,
          },
          {
            name: onGetProjectAndTaskStatusLabel(PROGRESS_STATUS.doing),
            value: responseData.doing,
            color: COLORS.orange.dark,
            legendFontSize: 14,
          },
          {
            name: onGetProjectAndTaskStatusLabel(PROGRESS_STATUS.done),
            value: responseData.done,
            color: COLORS.green,
            legendFontSize: 14,
          },
        ];

        setData(newData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (setIsLoading) setIsLoading(false);
    }
  }, [setIsLoading]);

  useEffect(() => {
    handleGetProjectStatistics();
  }, [handleGetProjectStatistics]);

  return (
    <View style={[styles.root, style]}>
      <Text style={styles.title}>Project Statistics</Text>

      {data.length ? (
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
      ) : (
        <EmptyData description="No project found!" />
      )}
    </View>
  );
};

ProjectStatistics.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setIsLoading: PropTypes.func,
};

const chartConfig = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
};

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
