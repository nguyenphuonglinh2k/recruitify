import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { memo } from "react";
import { ClockIcon, UserIcon } from "icons";
import { COLORS } from "utils";
import { useNavigation } from "@react-navigation/core";
import { SCREEN_NAME } from "const/path.const";

const ScheduleItem = ({ data, style, ...otherProps }) => {
  const navigation = useNavigation();

  const { _id: scheduleId, name, startTime, endTime, assigneeIds } = data;

  const onNavigateToDetail = () => {
    navigation.navigate(SCREEN_NAME.scheduleDetailScreen, { scheduleId });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.root, style]}
      onPress={onNavigateToDetail}
      {...otherProps}
    >
      <Text style={[styles.title, styles.spacingBottom]}>{name}</Text>

      <View style={[styles.contentWrapper, styles.spacingBottom]}>
        <ClockIcon style={styles.icon} />
        <View>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.content}>{`${startTime} - ${endTime}`}</Text>
        </View>
      </View>

      <View style={styles.contentWrapper}>
        <UserIcon style={styles.icon} color={COLORS.grey[100]} />
        <View>
          <Text style={styles.label}>Attendees</Text>
          <Text style={styles.content}>
            {`${assigneeIds?.length || 0} people`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ScheduleItem.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    assigneeIds: PropTypes.array,
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
