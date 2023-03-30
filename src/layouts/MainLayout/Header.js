import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Image } from "react-native";
import { NotificationIcon } from "icons";
import { CommonIconButton } from "components";
import { ImageSource } from "assets";
import { COLORS } from "utils";
import { isValidElement } from "react";

const Header = ({ style, iconProps, headerRight, ...otherProps }) => {
  return (
    <View style={[styles.root, style]} {...otherProps}>
      <Image source={ImageSource.LogoDarkImage} style={styles.logo} />

      {isValidElement(headerRight) ? (
        headerRight
      ) : (
        <CommonIconButton>
          <NotificationIcon {...iconProps} />
        </CommonIconButton>
      )}
    </View>
  );
};

Header.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  iconProps: PropTypes.object,
  headerRight: PropTypes.node,
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey["200"],
  },
  logo: {
    height: 29,
    width: 105,
  },
});

export default Header;
