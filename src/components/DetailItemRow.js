import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { COLORS } from "utils";
import { isValidElement } from "react";

const DetailItemRow = ({ disabled, style, label, content }) => {
  return (
    <View style={[style]}>
      <Text style={[styles.label(disabled), styles.padding]}>{label}</Text>
      {isValidElement(content) ? (
        content
      ) : (
        <Text style={[styles.content, styles.padding]}>{content}</Text>
      )}
    </View>
  );
};

DetailItemRow.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
  disabled: PropTypes.bool,
};

export default memo(DetailItemRow);

const styles = StyleSheet.create({
  label: disabled => ({
    color: disabled ? COLORS.grey[100] : COLORS.black,
    fontWeight: "500",
    fontSize: 16,
    backgroundColor: COLORS.grey[300],
  }),
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
