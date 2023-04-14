import { Text, TouchableOpacity } from "react-native";
import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import DetailItemRow, { contentStyle, paddingStyle } from "./DetailItemRow";
import CommonTimePickerModal from "./CommonTimePickerModal";
import moment from "moment";
import { AppConstant } from "const";

const DateInputBlock = ({ value, setValue, label, ...otherProps }) => {
  const [isVisible, setIsVisible] = useState(false);

  const onOpenModal = () => {
    setIsVisible(true);
  };

  const onCloseDatePicker = () => {
    setIsVisible(false);
  };

  const onChangeDatePicker = date => {
    if (setValue) setValue(date);
    onCloseDatePicker();
  };

  return (
    <>
      <DetailItemRow
        label={label}
        content={
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onOpenModal}
            style={paddingStyle}
          >
            <Text style={contentStyle}>
              {value
                ? moment(value).format(AppConstant.FORMAT_DATE_WITH_SLASH)
                : ""}
            </Text>
          </TouchableOpacity>
        }
        {...otherProps}
      />
      <CommonTimePickerModal
        isVisible={isVisible}
        value={value}
        onChange={onChangeDatePicker}
        onClose={onCloseDatePicker}
        mode="date"
      />
    </>
  );
};

DateInputBlock.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  setValue: PropTypes.func,
};

export default memo(DateInputBlock);
