import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { COLORS } from "utils";
import PropTypes from "prop-types";
import { PROGRESS_STATUS } from "const/app.const";

const Detail = ({ data }) => {
  const [totalNew, totalDoing, totalDone] = useMemo(() => {
    const news = data?.filter(task => task.status === PROGRESS_STATUS.new);
    const doings = data?.filter(task => task.status === PROGRESS_STATUS.doing);
    const done = data?.filter(task => task.status === PROGRESS_STATUS.done);

    return [news?.length ?? 0, doings?.length ?? 0, done?.length ?? 0];
  }, [data]);

  return (
    <View style={{ margin: 16 }}>
      <View style={{ flexDirection: "row" }}>
        <Box
          label="Total"
          value={data?.length ?? 0}
          bgColor={COLORS.lightPurple}
          color={COLORS.purple}
          style={{ flex: 1, marginRight: 8 }}
        />
        <Box
          label="New"
          value={totalNew}
          bgColor={COLORS.blue[100]}
          color={COLORS.blue.neutral}
          style={{ flex: 1, marginLeft: 8 }}
        />
      </View>

      <View style={{ flexDirection: "row", marginTop: 16 }}>
        <Box
          label="Doing"
          value={totalDoing}
          bgColor={COLORS.orange.light}
          color={COLORS.orange.dark}
          style={{ flex: 1, marginRight: 8 }}
        />
        <Box
          label="Completed"
          value={totalDone}
          bgColor={COLORS.lightGreen}
          color={COLORS.darkGreen}
          style={{ flex: 1, marginLeft: 8 }}
        />
      </View>
    </View>
  );
};

Detail.propTypes = {
  data: PropTypes.array,
};

const Box = ({ label, value, bgColor, color, style }) => {
  return (
    <View style={[styles.boxRoot, { backgroundColor: bgColor }, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { borderColor: color }]}>{value}</Text>
    </View>
  );
};

Box.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Detail;

const styles = StyleSheet.create({
  boxRoot: {
    borderRadius: 6,
    padding: 20,
  },
  label: {
    textTransform: "uppercase",
    marginBottom: 6,
    fontSize: 12,
    fontWeight: "600",
  },
  value: {
    borderLeftWidth: 4,
    borderRadius: 2,
    paddingLeft: 10,
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "600",
  },
});
