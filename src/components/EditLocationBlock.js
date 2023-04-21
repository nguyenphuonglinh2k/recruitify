import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import PropTypes from "prop-types";
import { LocationIcon, PlusIcon, TrashIcon } from "icons";
import { COLORS } from "utils";
import DetailItemRow, { paddingStyle } from "./DetailItemRow";
import CommonIconButton from "./CommonIconButton";

const EditLocationBlock = ({ label, data, setData, ...otherProps }) => {
  const handleAddLocation = () => {
    const newData = [...data, ""];
    setData(newData);
  };

  return (
    <DetailItemRow
      label={label}
      labelRightAdornment={
        <TouchableOpacity onPress={handleAddLocation}>
          <PlusIcon color={COLORS.green} />
        </TouchableOpacity>
      }
      content={<Locations data={data} setData={setData} />}
      {...otherProps}
    />
  );
};

const Locations = ({ data, setData }) => {
  const handleDeleteItem = index => {
    const newData = [...data.slice(0, index), ...data.slice(index + 1)];
    if (setData) setData(newData);
  };

  const handleChangeText = (index, newValue) => {
    const clonedData = [...data];
    clonedData[index] = newValue;

    setData(clonedData);
  };

  return (
    <View>
      {data?.map((value, index) => (
        <View key={index} style={styles.itemWrapper}>
          <View key={index} style={styles.item}>
            <LocationIcon color={COLORS.grey[400]} />
            <TextInput
              style={styles.content}
              value={value}
              onChangeText={newValue => handleChangeText(index, newValue)}
            />
          </View>

          {data.length > 1 && (
            <CommonIconButton onPress={() => handleDeleteItem(index)}>
              <TrashIcon />
            </CommonIconButton>
          )}
        </View>
      ))}
    </View>
  );
};

EditLocationBlock.propTypes = {
  label: PropTypes.string,
  data: PropTypes.array,
  setData: PropTypes.func,
};

Locations.propTypes = {
  data: PropTypes.array,
  setData: PropTypes.func,
};

export default memo(EditLocationBlock);

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...paddingStyle,
    paddingVertical: 0,
    flex: 1,
  },
  content: {
    color: COLORS.black,
    fontSize: 16,
    paddingLeft: 10,
    flex: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
});
