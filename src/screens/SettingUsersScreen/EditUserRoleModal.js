import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { USER_ROLE } from "const/app.const";
import { onGetUserRoleLabel } from "utils/label.utils";
import { CommonButton, CommonModal } from "components";
import { contentStyle, paddingStyle } from "components/DetailItemRow";
import { CircleTickIcon } from "icons";

const EditUserRoleModal = ({ value, isVisible, onCloseModal, onOk }) => {
  const [selected, setSelected] = useState(USER_ROLE.admin);

  const handleChangeValue = newValue => {
    setSelected(newValue);
  };

  useEffect(() => {
    if (value && isVisible) {
      setSelected(value);
    }
  }, [value, isVisible]);

  return (
    <CommonModal visible={isVisible} onCloseModal={onCloseModal}>
      <View>
        {ROLE_DATA?.map(({ label, value: itemValue }, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => handleChangeValue(itemValue)}
            style={[styles.item]}
          >
            <View style={{ width: 24, height: 24 }}>
              {selected === itemValue && <CircleTickIcon />}
            </View>
            <Text
              style={[contentStyle, { textAlign: "center", marginLeft: 16 }]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <CommonButton
        label="OK"
        style={styles.button}
        onPress={() => onOk(selected)}
      />
    </CommonModal>
  );
};

const ROLE_DATA = [
  {
    value: USER_ROLE.admin,
    label: onGetUserRoleLabel(USER_ROLE.admin),
  },
  {
    value: USER_ROLE.hr,
    label: onGetUserRoleLabel(USER_ROLE.hr),
  },
  {
    value: USER_ROLE.manager,
    label: onGetUserRoleLabel(USER_ROLE.manager),
  },
  {
    value: USER_ROLE.candidate,
    label: onGetUserRoleLabel(USER_ROLE.candidate),
  },
];

EditUserRoleModal.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setValue: PropTypes.func,
  isVisible: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onOk: PropTypes.func,
};

export default EditUserRoleModal;

const styles = StyleSheet.create({
  button: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  item: {
    ...paddingStyle,
    flexDirection: "row",
    alignItems: "center",
  },
});
