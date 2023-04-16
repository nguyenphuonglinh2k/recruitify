import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import { PencilIcon, TrashIcon } from "icons";
import { CommonIconButton } from "components";
import { useMemo } from "react";
import { COLORS } from "utils";
import { AppConstant } from "const";
import { useSelector } from "react-redux";

const TaskItem = ({ data, onPressTrash, onPressDetail, style }) => {
  const { name, assigneeId, endDate } = data;

  const authUser = useSelector(({ authRedux }) => authRedux.user);

  const isPassedDeadline = useMemo(() => {
    return moment(endDate).isBefore(moment());
  }, [endDate]);

  const isSelf = useMemo(() => {
    return authUser._id === assigneeId._id;
  }, [authUser, assigneeId]);

  return (
    <View style={[styles.root, style]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name}</Text>

        <View style={styles.contentWrapper}>
          <Text style={styles.label}>Assignee: </Text>
          <Text style={styles.content}>{assigneeId?.name}</Text>
        </View>

        <View style={[styles.contentWrapper]}>
          <Text style={styles.label}>Deadline: </Text>
          <Text
            style={[styles.content, isPassedDeadline && styles.passedDeadline]}
          >
            {`${
              endDate
                ? moment(endDate).format(AppConstant.FORMAT_DATE_WITH_SLASH)
                : "None"
            }`}
          </Text>
        </View>
      </View>

      <View style={styles.right}>
        {isSelf && (
          <CommonIconButton style={{ flex: 1 }} onPress={onPressDetail}>
            <PencilIcon color={COLORS.green} />
          </CommonIconButton>
        )}
        <CommonIconButton onPress={onPressTrash}>
          <TrashIcon />
        </CommonIconButton>
      </View>
    </View>
  );
};

export default TaskItem;

TaskItem.propTypes = {
  data: PropTypes.object,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPressTrash: PropTypes.func,
  onPressDetail: PropTypes.func,
};

TaskItem.defaultProps = {};

const styles = StyleSheet.create({
  root: {
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    borderRadius: 6,
    backgroundColor: COLORS.grey[300],
    flexDirection: "row",
  },
  right: {
    justifyContent: "center",
    alignItems: "center",
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
