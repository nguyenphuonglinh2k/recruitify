import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { COLORS } from "utils";

const DetailItem = ({ style, label, content }) => {
  return (
    <View style={[styles.root, style]}>
      <Text style={[styles.label, styles.padding]}>{label}</Text>
      <Text style={[styles.content, styles.padding]}>{content}</Text>
    </View>
  );
};

DetailItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default memo(DetailItem);

const styles = StyleSheet.create({
  root: {},
  label: {
    color: COLORS.black,
    fontWeight: "600",
    fontSize: 16,
    backgroundColor: COLORS.grey[300],
  },
  padding: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[200],
  },
  content: {
    color: COLORS.black,
    fontSize: 16,
  },
});
