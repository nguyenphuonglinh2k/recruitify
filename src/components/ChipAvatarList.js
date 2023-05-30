import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { CommonAvatarChip } from "components";
import { paddingStyle } from "./DetailItemRow";

const ChipAvatarList = ({ data, style, onPress, ...otherProp }) => {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      nestedScrollEnabled
      data={data ?? []}
      renderItem={({ item }) => (
        <CommonAvatarChip
          label={item.name}
          source={{ uri: item.avatarUrl }}
          onPress={() => onPress(item._id)}
          style={styles.item}
        />
      )}
      keyExtractor={(_, i) => i}
      ListEmptyComponent={<View style={styles.empty} />}
      contentContainerStyle={paddingStyle}
    />
  );
};

ChipAvatarList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      _id: PropTypes.string,
    }),
  ),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
};

export default ChipAvatarList;

const styles = StyleSheet.create({
  item: {
    marginRight: 10,
  },
  empty: {
    ...paddingStyle,
    borderBottomWidth: 0,
  },
});
