import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { COLORS } from "utils";
import { CommonChip } from "components";
import { useSelector } from "react-redux";

const Tags = ({ style }) => {
  const job = useSelector(({ jobRedux }) => jobRedux.job);

  return (
    <View style={[styles.root, style]}>
      <Text style={styles.label}>Tags</Text>

      <View style={styles.tags}>
        {(job?.tagIds ?? []).map(({ name }, index) => (
          <CommonChip
            key={index}
            label={name}
            style={index !== 0 ? styles.notFirstTag : {}}
          />
        ))}
      </View>
    </View>
  );
};

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
