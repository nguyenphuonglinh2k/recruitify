import React from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PropTypes from "prop-types";
import moment from "moment";

const CommonTimePickerModal = ({
  isVisible,
  value,
  onChange,
  onClose,
  ...rest
}) => {
  const onConfirm = date => {
    onChange(date);
    onClose();
  };

  return (
    <DateTimePickerModal
      isVisible={isVisible}
      date={value ? moment(value).toDate() : undefined}
      mode="time"
      onConfirm={onConfirm}
      onCancel={onClose}
      is24Hour={true}
      locale="en_GB"
      cancelTextIOS="Cancel"
      confirmTextIOS="OK"
      {...rest}
    />
  );
};

export default CommonTimePickerModal;

CommonTimePickerModal.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
  isVisible: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};
