import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import PropTypes from "prop-types";
import { PlusIcon } from "icons";
import { COLORS } from "utils";
import DetailItemRow, { paddingStyle } from "./DetailItemRow";
import CommonDeleteChip from "./CommonDeleteChip";

const EditTagBlock = ({ label, data, onAdd, onDelete, ...otherProps }) => {
  return (
    <DetailItemRow
      label={label}
      labelRightAdornment={
        <TouchableOpacity onPress={onAdd}>
          <PlusIcon color={COLORS.green} />
        </TouchableOpacity>
      }
      content={data?.length ? <Tags data={data} onDelete={onDelete} /> : null}
      {...otherProps}
    />
  );
};

const Tags = ({ data, onDelete }) => {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      nestedScrollEnabled
      data={data ?? []}
      renderItem={({ item, index }) => (
        <CommonDeleteChip
          label={item.name}
          style={styles.item}
          onPress={() => onDelete(index, item)}
        />
      )}
      keyExtractor={(_, i) => i}
      ListEmptyComponent={<View style={styles.empty} />}
      contentContainerStyle={paddingStyle}
    />
  );
};

EditTagBlock.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
};

Tags.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
  onDelete: PropTypes.func,
};

export default memo(EditTagBlock);

const styles = StyleSheet.create({
  item: {
    marginRight: 8,
  },
  empty: {
    ...paddingStyle,
    borderBottomWidth: 0,
  },
});
