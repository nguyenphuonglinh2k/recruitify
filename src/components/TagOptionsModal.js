import { StyleSheet, Text } from "react-native";
import React, { useCallback } from "react";
import CommonModal from "./CommonModal";
import PropTypes from "prop-types";
import { contentStyle, paddingStyle } from "./DetailItemRow";
import { COLORS } from "utils";
import CommonCheckbox from "./CommonCheckbox";
import CommonButton from "./CommonButton";
import EmptyData from "./EmptyData";

const TagOptionsModal = ({
  data,
  setData,
  isVisible,
  onCloseModal,
  onAdd,
  ...otherProps
}) => {
  const handleChangeValue = useCallback(
    index => {
      const newData = [
        ...data.slice(0, index),
        { ...data[index], isChecked: !data[index].isChecked },
        ...data.slice(index + 1),
      ];

      if (setData) {
        setData(newData);
      }
    },
    [data, setData],
  );

  return (
    <CommonModal visible={isVisible} onCloseModal={onCloseModal}>
      {data.length ? (
        data?.map(({ name, isChecked }, index) => (
          <CommonCheckbox
            key={index}
            isChecked={isChecked}
            onPress={() => handleChangeValue(index)}
            textComponent={
              <Text style={[contentStyle, { textAlign: "center", flex: 1 }]}>
                {name}
              </Text>
            }
            style={[paddingStyle, isChecked ? styles.selected : {}]}
            {...otherProps}
          />
        ))
      ) : (
        <EmptyData
          style={{ margin: 10 }}
          imageStyle={styles.image}
          description="No skills left!"
        />
      )}
      <CommonButton
        label="Add"
        onPress={onAdd}
        disabled={data.length === 0}
        style={styles.button}
      />
    </CommonModal>
  );
};

TagOptionsModal.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      isChecked: PropTypes.bool,
    }),
  ),
  setData: PropTypes.func,
  isVisible: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onAdd: PropTypes.func,
};

export default TagOptionsModal;

const styles = StyleSheet.create({
  selected: {
    backgroundColor: COLORS.grey[200],
  },
  button: {
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 10,
    borderRadius: 6,
  },
  image: {
    height: 100,
  },
});
