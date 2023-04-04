import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import DetailItemRow, { contentStyle, paddingStyle } from "./DetailItemRow";
import { CaretIcon } from "icons";
import { COLORS } from "utils";
import CommonModal from "./CommonModal";

const TextInputSelectBlock = ({
  value,
  setValue,
  label,
  data,
  ...otherProps
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const onOpenModal = () => {
    setIsVisible(true);
  };

  const onCloseModal = () => {
    setIsVisible(false);
  };

  const onChangeSelectedItem = newValue => {
    if (setValue) setValue(newValue);
    onCloseModal();
  };

  return (
    <>
      <DetailItemRow
        label={label}
        content={
          <TouchableOpacity
            activeOpacity={0.7}
            style={[paddingStyle, styles.contentWrapper]}
            onPress={onOpenModal}
          >
            <Text style={[contentStyle, { flex: 1 }]}>{value}</Text>
            <CaretIcon color={COLORS.grey[400]} />
          </TouchableOpacity>
        }
        {...otherProps}
      />

      {data && Array.isArray(data) && (
        <CommonModal visible={isVisible} onCloseModal={onCloseModal}>
          {data?.map(({ label: labelItem }, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => onChangeSelectedItem(labelItem)}
              style={paddingStyle}
            >
              <Text style={[contentStyle, { textAlign: "center" }]}>
                {labelItem}
              </Text>
            </TouchableOpacity>
          ))}
        </CommonModal>
      )}
    </>
  );
};

TextInputSelectBlock.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setValue: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
};

export default memo(TextInputSelectBlock);

const styles = StyleSheet.create({
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
