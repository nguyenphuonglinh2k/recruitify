import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { COLORS } from "utils";
import { CommonChip } from "components";

const Skills = ({ style }) => {
  return (
    <View style={[style]}>
      <Text style={styles.label}>Skills</Text>

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

Skills.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default memo(Skills);

const styles = StyleSheet.create({
  label: {
    color: COLORS.black,
    fontWeight: "600",
    fontSize: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.grey[300],
    paddingHorizontal: 16,
  },
  tags: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: COLORS.grey[200],
  },
  notFirstTag: {
    marginLeft: 4,
  },
});