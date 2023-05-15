import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import CommonModal from "./CommonModal";
import PropTypes from "prop-types";
import { contentStyle, paddingStyle } from "./DetailItemRow";
import { COLORS } from "utils";
import CommonRating from "./CommonRating";

const RatingOptionsModal = ({
  value,
  setValue,
  isVisible,
  onCloseModal,
  ...otherProps
}) => {
  const handleChangeValue = newValue => {
    if (setValue) {
      setValue(newValue);
    }
    if (onCloseModal) {
      onCloseModal();
    }
  };

  return (
    <CommonModal
      visible={isVisible}
      onCloseModal={onCloseModal}
      {...otherProps}
    >
      {DATA.map((itemValue, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.7}
          onPress={() => handleChangeValue(itemValue)}
          style={[
            paddingStyle,
            contentStyle,
            { paddingVertical: 16 },
            value === itemValue ? styles.selected : {},
          ]}
        >
          <CommonRating value={itemValue} style={styles.item} />
        </TouchableOpacity>
      ))}
    </CommonModal>
  );
};

const DATA = [0, 1, 2, 3, 4, 5];

RatingOptionsModal.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setValue: PropTypes.func,
  isVisible: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default RatingOptionsModal;

const styles = StyleSheet.create({
  selected: {
    backgroundColor: COLORS.grey[200],
  },
  item: {
    alignSelf: "center",
  },
});
