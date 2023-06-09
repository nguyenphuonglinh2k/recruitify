import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { Fragment } from "react";
import CommonModal from "./CommonModal";
import PropTypes from "prop-types";
import { contentStyle, paddingStyle } from "./DetailItemRow";
import { COLORS } from "utils";

const StatusOptionsModal = ({
  data,
  value,
  setValue,
  isVisible,
  onCloseModal,
}) => {
  const handleChangeValue = newValue => {
    if (setValue) {
      setValue(newValue);
    }
    onCloseModal();
  };
  return data?.length ? (
    <CommonModal visible={isVisible} onCloseModal={onCloseModal}>
      {data?.map(({ label, value: itemValue }, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.7}
          onPress={() => handleChangeValue(itemValue)}
          style={[paddingStyle, value === itemValue ? styles.selected : {}]}
        >
          <Text style={[contentStyle, { textAlign: "center" }]}>{label}</Text>
        </TouchableOpacity>
      ))}
    </CommonModal>
  ) : (
    <Fragment />
  );
};

StatusOptionsModal.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  ),
  value: PropTypes.any,
  setValue: PropTypes.func,
  isVisible: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default StatusOptionsModal;

const styles = StyleSheet.create({
  selected: {
    backgroundColor: COLORS.grey[200],
  },
});
