import { StyleSheet, View, Text, FlatList } from "react-native";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { COLORS } from "utils";
import { CommonChip } from "components";
import { useSelector } from "react-redux";
import { paddingStyle } from "components/DetailItemRow";

const Tags = ({ style }) => {
  const job = useSelector(({ jobRedux }) => jobRedux.job);

  return (
    <View style={[styles.root, style]}>
      <Text style={styles.label}>Tags</Text>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        nestedScrollEnabled
        data={job?.tagIds ?? []}
        renderItem={({ item }) => (
          <CommonChip label={item.name} style={styles.item} />
        )}
        keyExtractor={(_, i) => i}
        ListEmptyComponent={<View style={styles.padding} />}
        contentContainerStyle={styles.padding}
      />
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
  item: {
    marginRight: 4,
  },
  padding: {
    ...paddingStyle,
    borderBottomWidth: 0,
  },
});
