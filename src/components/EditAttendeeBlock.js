import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import PropTypes from "prop-types";
import { PlusIcon, TrashIcon } from "icons";
import { COLORS } from "utils";
import DetailItemRow, { paddingStyle } from "./DetailItemRow";
import CommonAvatarChip from "./CommonAvatarChip";
import CommonIconButton from "./CommonIconButton";

const EditAttendeeBlock = ({ label, data, setData, onAdd, ...otherProps }) => {
  return (
    <View>
      <DetailItemRow
        label={label}
        labelRightAdornment={
          <TouchableOpacity onPress={onAdd}>
            <PlusIcon color={COLORS.green} />
          </TouchableOpacity>
        }
        content={
          data?.length ? <Attendees data={data} setData={setData} /> : null
        }
        {...otherProps}
      />
    </View>
  );
};

const Attendees = ({ data, setData }) => {
  const handleDeleteItem = index => {
    const newData = [data.slice(0, index), data.slice(index + 1)];
    if (setData) setData(newData);
  };

  return (
    <View>
      {data?.map(({ name, avatarUrl }, index) => (
        <View key={index} style={styles.item}>
          <CommonAvatarChip label={name} source={{ uri: avatarUrl }} />

          <CommonIconButton onPress={() => handleDeleteItem(index)}>
            <TrashIcon />
          </CommonIconButton>
        </View>
      ))}
    </View>
  );
};

EditAttendeeBlock.propTypes = {
  label: PropTypes.string,
  data: PropTypes.array,
  setData: PropTypes.func,
  onAdd: PropTypes.func,
};

Attendees.propTypes = {
  data: PropTypes.array,
  setData: PropTypes.func,
};

export default memo(EditAttendeeBlock);

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...paddingStyle,
  },
});
