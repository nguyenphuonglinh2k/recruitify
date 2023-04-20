import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { COLORS } from "utils";
import { DownloadIcon } from "icons";

const AttachmentItem = ({ style, data, onPress, ...otherProps }) => {
  return (
    <TouchableOpacity
      style={[styles.root, style]}
      onPress={onPress}
      {...otherProps}
    >
      <Text style={styles.content}>{data.name}</Text>
      <DownloadIcon color={COLORS.black} style={{ marginLeft: 8 }} />
    </TouchableOpacity>
  );
};

AttachmentItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  data: PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
  }),
  onPress: PropTypes.func,
};

export default memo(AttachmentItem);

const styles = StyleSheet.create({
  root: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[200],
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    color: COLORS.black,
    fontSize: 16,
    flex: 1,
    textDecorationLine: "underline",
    textDecorationColor: COLORS.black,
  },
});
