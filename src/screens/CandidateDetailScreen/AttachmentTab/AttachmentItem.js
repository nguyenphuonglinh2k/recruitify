import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { COLORS } from "utils";
import { DownloadIcon } from "icons";

const AttachmentItem = ({ style, content, ...otherProps }) => {
  return (
    <TouchableOpacity style={[styles.root, style]} {...otherProps}>
      <Text style={styles.content}>{content}</Text>
      <DownloadIcon color={COLORS.black} />
    </TouchableOpacity>
  );
};

AttachmentItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  content: PropTypes.string,
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
  },
});
