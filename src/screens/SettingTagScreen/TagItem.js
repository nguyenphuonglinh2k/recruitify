import { StyleSheet, View } from "react-native";
import React from "react";
import { contentStyle, paddingStyle } from "components/DetailItemRow";
import PropTypes from "prop-types";
import { TrashIcon } from "icons";
import { CommonIconButton, CommonTextButton } from "components";

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
    ...paddingStyle,
    paddingVertical: 0,
  },
  textInput: {
    ...contentStyle,
    paddingVertical: 10,
  },
});
