import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "utils";
import { StarIcon } from "icons";
import { CommonBadge } from "components";
import { useNavigation } from "@react-navigation/core";
import { PathConstant } from "const";

const PositionItem = ({ data, style }) => {
  const navigation = useNavigation();

  const { isPriority, title, appliedResumeTotal, startDate, endDate } = data;

  const onNavigateToDetail = () => {
    navigation.navigate(PathConstant.TAB_NAME.position, {
      screen: PathConstant.SCREEN_NAME.jobDetailScreen,
    });
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
          <Text style={styles.title}>{title}</Text>
        </View>

        <CommonBadge value={appliedResumeTotal} />
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

  bottom: {
    flexDirection: "row",
    marginTop: 12,
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
