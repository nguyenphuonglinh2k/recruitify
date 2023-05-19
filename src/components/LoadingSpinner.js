import React, { memo } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { Fragment } from "react";

const LoadingSpinner = ({ isVisible, style, hasBackdrop, ...otherProps }) => {
  return hasBackdrop ? (
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
  ) : isVisible ? (
    <View style={[styles.noBackdropWrappers, style]}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <Fragment />
  );
};

export default memo(LoadingSpinner);

LoadingSpinner.propTypes = {
  isVisible: PropTypes.bool,
  style: PropTypes.object,
  hasBackdrop: PropTypes.bool,
};

LoadingSpinner.defaultProps = { style: {}, hasBackdrop: true };

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    margin: 0,
    pointerEvents: "none",
  },
  noBackdropWrappers: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
