import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS } from "utils";
import { onGetApplicationStatusLabel } from "utils/label.utils";
import { APPLICATION_STATUS } from "const/app.const";
import { PieChart } from "react-native-chart-kit";
import PropTypes from "prop-types";
import { EmptyData, LoadingSpinner } from "components";
import { useIsFocused } from "@react-navigation/core";
import { ApplicationService } from "services";
import { ApiConstant } from "const";

const ApplicationStatistics = ({ style }) => {
  const isFocused = useIsFocused();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetProjectStatistics = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await ApplicationService.getApplicationStatistics();

      if (response.status === ApiConstant.STT_OK) {
        const responseData = response.data;

        const newData = [
          {
            name: onGetApplicationStatusLabel(APPLICATION_STATUS.screening),
            value: responseData.screening,
            color: COLORS.blue.light,
            legendFontSize: 14,
          },
          {
            name: onGetApplicationStatusLabel(APPLICATION_STATUS.interview),
            value: responseData.interview,
            color: COLORS.orange[100],
            legendFontSize: 14,
          },
          {
            name: onGetApplicationStatusLabel(APPLICATION_STATUS.hire),
            value: responseData.hire,
            color: COLORS.darkGreen,
            legendFontSize: 14,
          },
          {
            name: onGetApplicationStatusLabel(APPLICATION_STATUS.reject),
            value: responseData.reject,
            color: COLORS.pink,
            legendFontSize: 14,
          },
        ];

        setData(newData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  useEffect(() => {
    if (isFocused) handleGetProjectStatistics();
  }, [handleGetProjectStatistics, isFocused]);

  return (
    <View style={[styles.root, style]}>
      <Text style={styles.title}>Application Statistics</Text>

      {data.length ? (
        <PieChart
          data={data}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={chartConfig}
          accessor={"value"}
          backgroundColor={"transparent"}
          center={[0, 0]}
          absolute
          avoidFalseZero
        />
      ) : (
        <EmptyData description="No application found!" />
      )}

      <LoadingSpinner isVisible={isLoading} />
    </View>
  );
};

ApplicationStatistics.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setIsLoading: PropTypes.func,
};

const chartConfig = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
};

export default ApplicationStatistics;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
});
