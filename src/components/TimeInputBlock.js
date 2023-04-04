import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import DetailItemRow, { contentStyle, paddingStyle } from "./DetailItemRow";
import TimeInputPickerModal from "./TimeInputPickerModal";
import { COLORS } from "utils";

const TimeInputBlock = ({
  startValue,
  setStartValue,
  endValue,
  setEndValue,
  label,
  ...otherProps
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(
    TIME_INPUT_BLOCK_TYPES.start,
  );

  const onOpenModal = type => {
    setSelectedTime(type);
    setIsVisible(true);
  };

  return (
    <DetailItemRow
      label={label}
      content={
        <>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onOpenModal(TIME_INPUT_BLOCK_TYPES.start)}
              style={[styles.timeItem, styles.start]}
            >
              <Text style={contentStyle}>From: {startValue}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onOpenModal(TIME_INPUT_BLOCK_TYPES.end)}
              style={[styles.timeItem, styles.end]}
            >
              <Text style={contentStyle}>To: {endValue}</Text>
            </TouchableOpacity>
          </View>
          <TimeInputPickerModal
            isVisible={isVisible}
            label={label}
            value={
              selectedTime === TIME_INPUT_BLOCK_TYPES.start
                ? startValue
                : endValue
            }
            setValue={
              selectedTime === TIME_INPUT_BLOCK_TYPES.start
                ? setStartValue
                : setEndValue
            }
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
  startValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setStartValue: PropTypes.func,
  endValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setEndValue: PropTypes.func,
};

export const TIME_INPUT_BLOCK_TYPES = {
  start: 1,
  end: 2,
};

export default memo(TimeInputBlock);

const styles = StyleSheet.create({
  timeItem: { flex: 1 },
  start: {
    ...paddingStyle,
  },
  end: {
    borderLeftWidth: 1,
    borderColor: COLORS.grey[200],
    ...paddingStyle,
  },
});
