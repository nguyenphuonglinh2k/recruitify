import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "utils";
import { StarIcon } from "icons";
import { CommonAvatarGroup, CommonBadge } from "components";
import { useNavigation } from "@react-navigation/core";
import { PathConstant } from "const";

const JobItem = ({ data, style }) => {
  const navigation = useNavigation();

  const {
    _id: jobId,
    isPriority,
    name,
    appliedResumeTotal,
    startDate,
    endDate,
    assignees,
  } = data;

  const onNavigateToDetail = () => {
    navigation.navigate(PathConstant.SCREEN_NAME.jobDetailScreen, { jobId });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.root, style]}
      onPress={onNavigateToDetail}
    >
      <View style={styles.top}>
        <View style={styles.titleLeftWrapper}>
          {isPriority && (
            <StarIcon style={styles.startIcon} color={COLORS.yellow} />
          )}
          <Text style={styles.title}>{name}</Text>
        </View>

        <CommonBadge value={appliedResumeTotal ?? 0} />
      </View>

      <View style={styles.center}>
        <Text style={[styles.label, { marginBottom: 4 }]}>
          Assignee: {assignees ? "" : "null"}
        </Text>
        <CommonAvatarGroup
          data={assignees?.map(({ avatarUrl }) => ({
            uri: avatarUrl,
          }))}
        />
      </View>

      <View style={styles.bottom}>
        <View style={styles.dateColumn}>
          <Text style={styles.label}>Start date</Text>
          <Text style={styles.dateContent}>{startDate ?? "null"}</Text>
        </View>
        <View style={styles.dateColumn}>
          <Text style={styles.label}>End date</Text>
          <Text style={styles.dateContent}>{endDate ?? "null"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

JobItem.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    isPriority: PropTypes.bool,
    name: PropTypes.string,
    appliedResumeTotal: PropTypes.number,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    assignees: PropTypes.arrayOf(
      PropTypes.shape({
        avatarUrl: PropTypes.string,
      }),
    ),
  }),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default JobItem;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    borderRadius: 10,
    borderColor: COLORS.grey[200],
    borderWidth: 2,
    padding: 12,
    backgroundColor: COLORS.grey[300],
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "600",
  },
  titleLeftWrapper: {
    flexDirection: "row",
    marginRight: 16,
  },
  startIcon: {
    marginRight: 10,
  },

  center: {
    marginVertical: 12,
  },

  bottom: {
    flexDirection: "row",
  },
  dateColumn: {
    flex: 1,
  },
  label: {
    color: COLORS.grey[400],
    fontWeight: "600",
  },
  dateContent: {
    fontWeight: "600",
    fontSize: 13,
    color: COLORS.black,
  },
});
