import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "./Header";
import HeaderBackButton from "./HeaderBackButton";

const MainLayout = ({
  children,
  style,
  isBackScreen,
  headerProps,
  ...otherProps
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container(insets), style]} {...otherProps}>
      {isBackScreen ? (
        <HeaderBackButton {...headerProps} />
      ) : (
        <Header {...headerProps} />
      )}
      {children}
    </View>
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
  container: insets => ({
    flex: 1,
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
    position: "relative",
  }),
});
