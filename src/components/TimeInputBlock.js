import { Text, TouchableOpacity } from "react-native";
import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import DetailItemRow, { contentStyle, paddingStyle } from "./DetailItemRow";
import TimeInputPickerModal from "./TimeInputPickerModal";

const TimeInputBlock = ({ value, setValue, label, ...otherProps }) => {
  const [isVisible, setIsVisible] = useState(false);

  const onOpenModal = () => {
    setIsVisible(true);
  };

  return (
    <DetailItemRow
      label={label}
      content={
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            style={paddingStyle}
            onPress={onOpenModal}
          >
            <Text style={contentStyle}>{value}</Text>
          </TouchableOpacity>
          <TimeInputPickerModal
            isVisible={isVisible}
            label={label}
            value={value}
            setValue={setValue}
            setIsVisible={setIsVisible}
          />
        </>
      }
      {...otherProps}
    />
  );
};

TimeInputBlock.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setValue: PropTypes.func,
};

export default memo(TimeInputBlock);
