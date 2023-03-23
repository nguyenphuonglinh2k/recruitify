import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "utils";
import { StarIcon } from "icons";
import { CommonAvatarGroup, CommonBadge } from "components";

const PositionItem = ({ data, style }) => {
  const {
    isPriority,
    title,
    appliedResumeTotal,
    startDate,
    endDate,
    assignees,
  } = data;

  return (
    <TouchableOpacity style={[styles.root, style]}>
      <View style={styles.top}>
        <View style={styles.titleLeftWrapper}>
          {isPriority && (
            <StarIcon style={styles.startIcon} color={COLORS.yellow} />
          )}
          <Text style={styles.title}>{title}</Text>
        </View>

        <CommonBadge value={appliedResumeTotal} />
      </View>

      <View style={styles.center}>
        <Text style={[styles.label, { marginBottom: 4 }]}>Assignee:</Text>
        <CommonAvatarGroup
          data={assignees.map(({ avatarUrl }) => ({
            uri: avatarUrl,
          }))}
        />
      </View>

      <View style={styles.bottom}>
        <View style={styles.dateColumn}>
          <Text style={styles.label}>Start date</Text>
          <Text style={styles.dateContent}>{startDate}</Text>
        </View>
        <View style={styles.dateColumn}>
          <Text style={styles.label}>End date</Text>
          <Text style={styles.dateContent}>{endDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

PositionItem.propTypes = {
  data: PropTypes.shape({
    isPriority: PropTypes.bool,
    title: PropTypes.string,
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

export default PositionItem;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    borderRadius: 10,
    borderColor: COLORS.grey[200],
    borderWidth: 2,
    padding: 12,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "700",
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
    fontWeight: "700",
    fontSize: 13,
    color: COLORS.black,
  },
});
