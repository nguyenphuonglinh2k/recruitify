import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { COLORS } from "utils";
import { CommonChip, CommonProgressBar } from "components";
import moment from "moment";
import { AppConstant } from "const";
import { useNavigation } from "@react-navigation/core";
import { SCREEN_NAME } from "const/path.const";

const TaskItem = ({ style, data, ...otherProps }) => {
  const navigation = useNavigation();

  const { name, progress, endDate, projectId } = data;

  const onNavigateToDetail = () => {
    navigation.navigate(SCREEN_NAME.taskDetailScreen, { task: data });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.root, style]}
      onPress={onNavigateToDetail}
      {...otherProps}
    >
      <View style={styles.top}>
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.projectName}>
            {projectId?.name ?? "No project"}
          </Text>
        </View>
      </View>

      <View style={styles.center}>
        <View style={styles.progressLabelWrapper}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressValue}>{progress}/10</Text>
        </View>
        <CommonProgressBar progress={progress / 10} />
      </View>

      <CommonChip
        label={`Due ${
          endDate
            ? moment(endDate).format(AppConstant.FORMAT_DATE_WITH_SLASH)
            : "null"
        }`}
        color={COLORS.grey[500]}
      />
    </TouchableOpacity>
  );
};

TaskItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  data: PropTypes.shape({
    name: PropTypes.string,
    progress: PropTypes.number,
    endDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
    projectId: PropTypes.object,
  }),
};

export default TaskItem;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    borderRadius: 10,
    borderColor: COLORS.grey[200],
    borderWidth: 2,
    padding: 12,
    backgroundColor: COLORS.grey[300],
  },
  title: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "600",
  },
  top: {
    flexDirection: "row",
    marginRight: 16,
  },
  startIcon: {
    marginRight: 10,
  },

  projectName: {
    fontWeight: "600",
    color: COLORS.grey[400],
    marginTop: 4,
  },

  center: {
    marginVertical: 16,
  },
  progressLabelWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  progressLabel: {
    fontWeight: "500",
    color: COLORS.grey[600],
  },
  progressValue: {
    color: COLORS.black,
    fontWeight: "500",
  },
});
