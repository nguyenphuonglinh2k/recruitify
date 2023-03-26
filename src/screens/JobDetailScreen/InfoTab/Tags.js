import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { COLORS } from "utils";
import { CommonChip } from "components";

const Tags = ({ style }) => {
  return (
    <View style={[styles.root, style]}>
      <Text style={styles.label}>Tags</Text>

      <View style={styles.tags}>
        {MOCK_TAGS.map((label, index) => (
          <CommonChip
            key={index}
            label={label}
            style={index !== 0 ? styles.notFirstTag : {}}
          />
        ))}
      </View>
    </View>
  );
};

const MOCK_TAGS = ["React", "HTML", "CSS"];

Tags.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default memo(Tags);

const styles = StyleSheet.create({
  root: {
    paddingBottom: 20,
  },
  label: {
    color: COLORS.black,
    fontWeight: "600",
    fontSize: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.grey[500],
    paddingHorizontal: 16,
  },
  tags: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  notFirstTag: {
    marginLeft: 4,
  },
});
