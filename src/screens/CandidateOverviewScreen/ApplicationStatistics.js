import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "utils";
import { PieChart } from "react-native-chart-kit";
import PropTypes from "prop-types";
import { EmptyData } from "components";
import { onGetApplicationStatusLabel } from "utils/label.utils";
import { APPLICATION_STATUS } from "const/app.const";

const ApplicationStatistics = ({ style, data }) => {
  return (
    <View style={[styles.root, style]}>
      <Text style={styles.title}>Application Statistics</Text>

      {data && Object.keys(data).length ? (
        <PieChart
          data={[
            {
              name: onGetApplicationStatusLabel(APPLICATION_STATUS.screening),
              value: data.screening,
              color: COLORS.blue.light,
              legendFontSize: 14,
            },
            {
              name: onGetApplicationStatusLabel(APPLICATION_STATUS.interview),
              value: data.interview,
              color: COLORS.orange[100],
              legendFontSize: 14,
            },
            {
              name: onGetApplicationStatusLabel(APPLICATION_STATUS.hire),
              value: data.hire,
              color: COLORS.darkGreen,
              legendFontSize: 14,
            },
            {
              name: onGetApplicationStatusLabel(APPLICATION_STATUS.reject),
              value: data.reject,
              color: COLORS.pink,
              legendFontSize: 14,
            },
          ]}
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
    </View>
  );
};

ApplicationStatistics.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  data: PropTypes.object,
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
