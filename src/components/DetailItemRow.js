import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { COLORS } from "utils";
import { isValidElement } from "react";

const DetailItemRow = ({
  disabled,
  style,
  label,
  content,
  labelRightAdornment,
}) => {
  return (
    <View style={[style]}>
      <View style={[styles.labelWrapper, styles.padding]}>
        <Text style={[styles.label(disabled)]}>{label}</Text>
        {labelRightAdornment}
      </View>

      {isValidElement(content) ? (
        content
      ) : (
        <Text style={[styles.content, styles.padding]}>{content ?? ""}</Text>
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
  labelRightAdornment: PropTypes.node,
};

export default memo(DetailItemRow);

export const labelStyle = {
  color: COLORS.black,
  fontWeight: "500",
  fontSize: 16,
  backgroundColor: COLORS.grey[300],
};

export const paddingStyle = {
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderBottomWidth: 1,
  borderBottomColor: COLORS.grey[200],
};

export const contentStyle = {
  color: COLORS.black,
  fontSize: 16,
};

const styles = StyleSheet.create({
  labelWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: COLORS.grey[300],
  },
  label: disabled => ({
    ...labelStyle,
    flex: 1,
    color: disabled ? COLORS.grey[100] : COLORS.black,
  }),
  padding: paddingStyle,
  content: contentStyle,
});
