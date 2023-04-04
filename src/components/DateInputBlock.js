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

  const onChangeDatePicker = date => {
    const formattedDate = moment(date).format(
      AppConstant.FORMAT_DATE_TIME_WITH_SLASH,
    );
    if (setValue) setValue(formattedDate);
    onCloseDatePicker();
  };

  const onCloseDatePicker = () => {
    setIsVisible(false);
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
            <Text style={contentStyle}>{value}</Text>
          </TouchableOpacity>
        }
        {...otherProps}
      />
      <CommonTimePickerModal
        isVisible={isVisible}
        value={moment(value).format(AppConstant.FORMAT_DATE_TIME_WITH_HYPHEN)}
        onChange={onChangeDatePicker}
        onClose={onCloseDatePicker}
        mode="date"
      />
    </>
  );
};

DateInputBlock.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Date),
  setValue: PropTypes.func,
};

export default memo(DateInputBlock);
