import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { COLORS } from "utils";
import { ProgressStatus } from "components";
import { useNavigation } from "@react-navigation/core";
import { SCREEN_NAME, TAB_NAME } from "const/path.const";

const TaskItem = ({ style, data, ...otherProps }) => {
  const navigation = useNavigation();

  const { name, status, projectId, _id: taskId } = data;

  const onNavigateToDetail = () => {
    navigation.navigate(TAB_NAME.task, {
      screen: SCREEN_NAME.taskDetailScreen,
      params: { taskId },
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.root, style]}
      onPress={onNavigateToDetail}
      {...otherProps}
    >
      <View style={styles.right}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.projectName}>
            {projectId?.name ?? "No project"}
          </Text>
        </View>

        <ProgressStatus value={status} />
      </View>
    </TouchableOpacity>
  );
};

TaskItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  data: PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.number,
    _id: PropTypes.string,
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
  right: {
    flexDirection: "row",
  },
  title: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "600",
  },
  startIcon: {
    marginRight: 10,
  },

  projectName: {
    fontWeight: "600",
    color: COLORS.grey[400],
    marginVertical: 4,
  },
});
