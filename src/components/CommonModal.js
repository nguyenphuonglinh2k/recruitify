import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "utils";

const CommonModal = ({ children, visible, onCloseModal, styles, ...rest }) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      backdropColor="rgb(5, 22, 45)"
      backdropOpacity={0.3}
      animationType="fade"
      isVisible={visible}
      onBackdropPress={onCloseModal}
      style={[defaultStyles.modal, styles?.modal, { paddingTop: insets.top }]}
      {...rest}
    >
      <View style={[defaultStyles.modelBox, styles?.root]}>{children}</View>
    </Modal>
  );
};

export default CommonModal;

CommonModal.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  onCloseModal: PropTypes.func,
  styles: PropTypes.object,
};
CommonModal.defaultProps = {
  visible: false,
};

const defaultStyles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modelBox: {
    borderRadius: 8,
    backgroundColor: COLORS.white,
    overflow: "hidden",
    shadowColor: "#565f6b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    elevation: 6,
    minWidth: Dimensions.get("window").width * 0.5,
  },
});
