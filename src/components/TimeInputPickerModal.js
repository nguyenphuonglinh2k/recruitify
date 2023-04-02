import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import { CommonTimePickerModal, CommonModal, CommonButton } from "components";
import { COLORS } from "utils";
import { convertDateFromTime } from "utils/time.utils";
import { AppConstant } from "const";

const TimeInputPickerModal = ({
  label,
  value,
  setValue,
  isVisible,
  setIsVisible,
  ...otherProps
}) => {
  const [isVisibleTimePicker, setIsVisibleTimePicker] = useState(false);
  const [pickedTime, setPickedTime] = useState(value);

  const onOpenTimePicker = () => {
    setIsVisibleTimePicker(true);
  };

  const onCloseTimePicker = () => {
    setIsVisibleTimePicker(false);
  };

  const onChangeTimePicker = time => {
    const formattedTime = moment(time).format(AppConstant.HOUR_FORMAT);
    setPickedTime(formattedTime);
    onCloseTimePicker();
  };

  const onSaveTime = () => {
    setValue(pickedTime);
    if (setIsVisible) setIsVisible(false);
  };

  const onCloseModal = () => {
    if (setIsVisible) setIsVisible(false);
    setPickedTime(value);
  };

  return (
    <CommonModal
      styles={{ root: styles.modal }}
      visible={isVisible}
      {...otherProps}
    >
      <View style={styles.root}>
        <Text style={styles.label}>{label}</Text>

        <TouchableOpacity activeOpacity={0.8} onPress={onOpenTimePicker}>
          <Text style={styles.time}>{pickedTime || value}</Text>
        </TouchableOpacity>
        <CommonTimePickerModal
          isVisible={isVisibleTimePicker}
          value={convertDateFromTime(value)}
          onChange={onChangeTimePicker}
          onClose={onCloseTimePicker}
        />

        <View style={styles.actions}>
          <CommonButton
            label="Close"
            color={COLORS.grey[200]}
            labelStyle={{ color: COLORS.black, fontWeight: "500" }}
            style={[styles.button, { marginRight: 4 }]}
            onPress={onCloseModal}
          />
          <CommonButton
            label="Save"
            color={COLORS.black}
            labelStyle={{ fontWeight: "500" }}
            style={[styles.button, { marginLeft: 4 }]}
            onPress={onSaveTime}
          />
        </View>
      </View>
    </CommonModal>
  );
};

export default TimeInputPickerModal;

TimeInputPickerModal.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Date),
  setValue: PropTypes.func,
  isVisible: PropTypes.bool,
  setIsVisible: PropTypes.func,
};

const styles = StyleSheet.create({
  modal: {
    alignSelf: "center",
    width: 280,
  },
  root: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  label: {
    marginBottom: 12,
    fontWeight: "600",
  },
  time: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    marginTop: 24,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    textAlign: "center",
    flex: 1,
  },
});
