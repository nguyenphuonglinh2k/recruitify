import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS } from "utils";
import PropTypes from "prop-types";
import { LoadingSpinner } from "components";
import { ApplicationService } from "services";
import { ApiConstant } from "const";

const Activities = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(DEFAULT_DATA);

  const handleGetStatistics = useCallback(async () => {
    setIsLoading(true);

    try {
      const response =
        await ApplicationService.getApplicationActivityStatistics();

      if (response.status === ApiConstant.STT_OK) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetStatistics();
  }, [handleGetStatistics]);

  return (
    <View>
      <Text style={styles.title}>Activities</Text>

      <View style={{ flexDirection: "row" }}>
        <Box
          currentLabel="Current week"
          prevLabel={`Previous week: ${data.lastWeek}`}
          quantity={data.thisWeek}
          quantityColor={COLORS.yellow}
          quantityBgColor={COLORS.lightYellow}
          style={{ flex: 1, marginRight: 8 }}
        />
        <Box
          currentLabel="Current month"
          prevLabel={`Previous month: ${data.lastMonth}`}
          quantity={data.thisMonth}
          quantityColor={COLORS.darkGreen}
          quantityBgColor={COLORS.lightGreen}
          style={{ flex: 1, marginLeft: 8 }}
        />
      </View>

      <View style={{ flexDirection: "row", marginTop: 16 }}>
        <Box
          currentLabel="Today"
          prevLabel={`Yesterday: ${data.yesterday}`}
          quantity={data.today}
          quantityColor={COLORS.purple}
          quantityBgColor={COLORS.lightPurple}
          style={{ flex: 0.5, marginRight: 40 }}
        />
      </View>

      <LoadingSpinner isVisible={isLoading} />
    </View>
  );
};

const Box = ({
  currentLabel,
  prevLabel,
  quantity,
  quantityBgColor,
  quantityColor,
  style,
}) => {
  return (
    <View style={[styles.box, style]}>
      <Text style={styles.currentLabel}>{currentLabel}</Text>
      <Text style={styles.prevLabel}>{prevLabel}</Text>
      <View style={[styles.quantityWrapper(quantityBgColor)]}>
        <Text style={styles.quantity(quantityColor)}>{quantity ?? 0}</Text>
      </View>
      <Text style={styles.lastLabel}>Applications</Text>
    </View>
  );
};

Box.propTypes = {
  currentLabel: PropTypes.string,
  prevLabel: PropTypes.string,
  quantity: PropTypes.number,
  quantityBgColor: PropTypes.string,
  quantityColor: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const DEFAULT_DATA = {
  today: 0,
  yesterday: 0,
  thisMonth: 0,
  thisWeek: 0,
  lastMonth: 0,
  lastWeek: 0,
};

export default Activities;

const styles = StyleSheet.create({
  title: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  box: {
    width: "100%",
    borderRadius: 10,
    borderColor: COLORS.grey[200],
    borderWidth: 1,
    padding: 12,
    backgroundColor: COLORS.grey[300],
    alignItems: "center",
  },
  currentLabel: {
    color: COLORS.black,
    fontSize: 18,
    marginBottom: 2,
    fontWeight: "600",
  },
  prevLabel: {
    fontWeight: "500",
    color: COLORS.grey[400],
  },
  quantityWrapper: color => ({
    backgroundColor: color,
    height: 50,
    width: 50,
    borderRadius: 50,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  }),
  quantity: color => ({
    color,
    fontWeight: "600",
    fontSize: 18,
  }),
  lastLabel: {
    color: COLORS.black,
    fontWeight: "600",
    fontSize: 16,
  },
});
