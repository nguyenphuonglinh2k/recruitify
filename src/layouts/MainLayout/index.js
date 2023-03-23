import React, { memo } from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import HeaderBackButton from "./HeaderBackButton";

const MainLayout = ({
  children,
  style,
  isBackScreen,
  headerProps,
  ...otherProps
}) => {
  return (
    <SafeAreaView
      style={[styles.container, style]}
      edges={["right", "top", "left"]}
      {...otherProps}
    >
      {isBackScreen ? (
        <HeaderBackButton {...headerProps} />
      ) : (
        <Header {...headerProps} />
      )}
      {children}
    </SafeAreaView>
  );
};

export default memo(MainLayout);

MainLayout.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  headerProps: PropTypes.object,
  isBackScreen: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
