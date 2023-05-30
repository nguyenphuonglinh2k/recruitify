import { StyleSheet, View, Text, FlatList } from "react-native";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { COLORS } from "utils";
import { CommonChip } from "components";
import { useSelector } from "react-redux";
import { paddingStyle } from "components/DetailItemRow";

const Skills = ({ style }) => {
  const application = useSelector(
    ({ applicationRedux }) => applicationRedux.application,
  );

  return (
    <View style={[style]}>
      <Text style={styles.label}>Skills</Text>

      <View style={styles.tags}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          nestedScrollEnabled
          data={application.skillIds ?? []}
          renderItem={({ item }) => (
            <CommonChip label={item.name} style={styles.item} />
          )}
          keyExtractor={(_, i) => i}
          ListEmptyComponent={<View style={styles.empty} />}
        />
      </View>
    </View>
  );
};

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
  item: {
    marginRight: 4,
  },
  empty: {
    ...paddingStyle,
    borderBottomWidth: 0,
  },
});
