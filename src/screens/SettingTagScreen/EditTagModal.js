import { StyleSheet, TextInput, View } from "react-native";
import React, { memo } from "react";
import PropTypes from "prop-types";
import { CommonButton, CommonModal } from "components";
import { COLORS } from "utils";

const EditTagModal = ({
  isVisible,
  value,
  onChangeText,
  textInputProps,
  onSave,
  ...otherProps
}) => {
  return (
    <CommonModal visible={isVisible} {...otherProps}>
      <View style={styles.root}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          {...textInputProps}
        />
      </View>
      <CommonButton
        label="Save"
        onPress={onSave}
        disabled={value?.length === 0}
        style={styles.button}
      />
    </CommonModal>
  );
};

EditTagModal.propTypes = {
  isVisible: PropTypes.bool,
  value: PropTypes.any,
  onChangeText: PropTypes.func,
  textInputProps: PropTypes.object,
  onSave: PropTypes.func,
};

export default memo(EditTagModal);

const styles = StyleSheet.create({
  root: {
    padding: 16,
    width: 250,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 10,
    borderRadius: 6,
  },
});
