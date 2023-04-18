import { StyleSheet, TouchableOpacity, View } from "react-native";
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
    <View style={[styles.list, paddingStyle]}>
      {data?.map((item, index) => (
        <CommonDeleteChip
          key={index}
          label={item.name}
          onPress={() => onDelete(index, item)}
          style={index !== 0 ? styles.item : {}}
        />
      ))}
    </View>
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
  list: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
  },
  item: {
    marginLeft: 8,
  },
});
