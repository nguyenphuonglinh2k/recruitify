import React, { useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import { COLORS } from "utils";
import { AppConstant } from "const";
import { CommonCheckbox } from "components";

const TaskItem = ({ data, style, ...otherProps }) => {
  const { name, assigneeId, endDate, isChecked } = data;

  const isPassedDeadline = useMemo(() => {
    return moment(endDate).isBefore(moment());
  }, [endDate]);

  return (
    <CommonCheckbox
      isChecked={isChecked}
      textComponent={
        <View style={styles.item}>
          <Text style={styles.name}>{name}</Text>

          <View style={styles.contentWrapper}>
            <Text style={styles.label}>Assignee: </Text>
            <Text style={styles.content}>{assigneeId?.name}</Text>
          </View>

          <View style={[styles.contentWrapper]}>
            <Text style={styles.label}>Deadline: </Text>
            <Text
              style={[
                styles.content,
                isPassedDeadline && styles.passedDeadline,
              ]}
            >
              {`${
                endDate
                  ? moment(endDate).format(AppConstant.FORMAT_DATE_WITH_SLASH)
                  : "None"
              }`}
            </Text>
          </View>
        </View>
      }
      style={[styles.root, style]}
      {...otherProps}
    />
  );
};

export default TaskItem;

TaskItem.propTypes = {
  data: PropTypes.object,
  isSelf: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const styles = StyleSheet.create({
  root: {
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    borderRadius: 6,
    backgroundColor: COLORS.grey[300],
  },
  item: {
    marginLeft: 16,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    flex: 1,
    color: COLORS.black,
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  label: {
    color: COLORS.black,
    fontWeight: "500",
  },
  passedDeadline: {
    color: COLORS.red,
  },
  content: {
    color: COLORS.grey[600],
    fontWeight: "500",
  },
});
