import React, { memo } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";

const LoadingSpinner = ({ isVisible, style, ...otherProps }) => {
  return (
    <Modal
      backdropColor="rgba(0, 0, 0, .15)"
      visible={isVisible}
      animationInTiming={0}
      animationOutTiming={0}
      style={[styles.modal, style]}
      {...otherProps}
    >
      <ActivityIndicator size="large" />
    </Modal>
  );
};

export default memo(LoadingSpinner);

LoadingSpinner.propTypes = {
  isVisible: PropTypes.bool,
  style: PropTypes.object,
};

LoadingSpinner.defaultProps = { style: {} };

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    margin: 0,
    pointerEvents: "none",
  },
});
