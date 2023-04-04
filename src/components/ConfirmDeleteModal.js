import React, { memo } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { CommonButton, CommonModal } from "components";
import PropTypes from "prop-types";
import { COLORS } from "utils";

const ConfirmDeleteModal = props => {
  const { title, description, isVisible, onCancel, onOK, modalStyle } = props;

  if (!isVisible) return null;

  return (
    <CommonModal
      visible={isVisible}
      onCloseModal={onCancel}
      styles={{ root: [styles.modal, modalStyle] }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{`"${title}"`}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.buttons}>
          <CommonButton
            onPress={onCancel}
            label="Cancel"
            color={COLORS.grey[200]}
            labelStyle={{ color: COLORS.black, fontWeight: "500" }}
            style={[styles.button, { marginRight: 4 }]}
          />
          <CommonButton
            onPress={onOK}
            label="Delete"
            color={COLORS.red}
            labelStyle={{ fontWeight: "500" }}
            style={[styles.button, { marginLeft: 4 }]}
          />
        </View>
      </View>
    </CommonModal>
  );
};

export default memo(ConfirmDeleteModal);

ConfirmDeleteModal.propTypes = {
  title: PropTypes.string,
  isVisible: PropTypes.bool,
  description: PropTypes.string,
  onCancel: PropTypes.func,
  onOK: PropTypes.func,
  modalStyle: PropTypes.object,
};

ConfirmDeleteModal.defaultProps = {
  modalStyle: {},
  description: "Do you really want to delete?",
};

const styles = StyleSheet.create({
  modal: {
    width: Dimensions.get("window").width * 0.7,
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontWeight: "600",
    color: COLORS.black,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.black,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    marginTop: 24,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    textAlign: "center",
    flex: 1,
  },
});
