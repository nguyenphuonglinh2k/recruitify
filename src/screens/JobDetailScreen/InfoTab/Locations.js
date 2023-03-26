import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { COLORS } from "utils";
import { LocationIcon } from "icons";

const Locations = ({ style }) => {
  return (
    <View style={style}>
      <Text style={styles.label}>Locations</Text>
      {MOCK_LOCATIONS.map((location, index) => (
        <View key={index} style={styles.itemWrapper}>
          <LocationIcon color={COLORS.grey[400]} />
          <Text style={styles.content}>{location}</Text>
        </View>
      ))}
    </View>
  );
};

const MOCK_LOCATIONS = ["Warsaw, Poland", "Krakow, Poland"];

Locations.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default memo(Locations);

const styles = StyleSheet.create({
  label: {
    color: COLORS.black,
    fontWeight: "600",
    fontSize: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.grey[500],
    paddingHorizontal: 16,
  },
  content: {
    color: COLORS.black,
    fontSize: 16,
    marginLeft: 10,
  },
  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[200],
  },
});
