import { StyleSheet, View } from "react-native";
import React from "react";
import { contentStyle } from "components/DetailItemRow";
import PropTypes from "prop-types";
import { TrashIcon } from "icons";
import { CommonIconButton, CommonTextButton } from "components";
import { COLORS } from "utils";

const TagItem = ({
  label,
  onDelete,
  style,
  labelStyle,
  onPress,
  ...otherProps
}) => {
  return (
    <View style={[styles.root, style]} {...otherProps}>
      <CommonTextButton
        label={label}
        labelStyle={[styles.textInput, labelStyle]}
        style={{ flex: 1 }}
        onPress={onPress}
      />
      <CommonIconButton onPress={onDelete}>
        <TrashIcon />
      </CommonIconButton>
    </View>
  );
};

export default TagItem;

TagItem.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeText: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textInputProps: PropTypes.object,
  onDelete: PropTypes.func,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 0,
    borderRadius: 10,
    borderColor: COLORS.grey[200],
    borderWidth: 2,
    padding: 12,
    backgroundColor: COLORS.grey[300],
  },
  textInput: {
    ...contentStyle,
    paddingVertical: 10,
  },
});
