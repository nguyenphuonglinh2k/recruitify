import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { memo } from "react";
import { ClockIcon, UserIcon } from "icons";
import { COLORS } from "utils";

const ScheduleItem = ({ data, style, ...otherProps }) => {
  const { title, time, assignees } = data;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.root, style]}
      {...otherProps}
    >
      <Text style={[styles.title, styles.spacingBottom]}>{title}</Text>

      <View style={[styles.contentWrapper, styles.spacingBottom]}>
        <ClockIcon style={styles.icon} />
        <View>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.content}>{time}</Text>
        </View>
      </View>

      <View style={styles.contentWrapper}>
        <UserIcon style={styles.icon} color={COLORS.grey[100]} />
        <View>
          <Text style={styles.label}>Attendees</Text>
          <Text style={styles.content}>
            {`${assignees?.length || 0} people`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ScheduleItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    assignees: PropTypes.array,
  }),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default memo(ScheduleItem);

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
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.black,
  },
  contentWrapper: {
    flexDirection: "row",
  },
  label: {
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 4,
  },
  content: {
    fontWeight: "500",
    color: COLORS.grey[600],
  },
  icon: {
    marginRight: 10,
  },
  spacingBottom: {
    marginBottom: 10,
  },
});
