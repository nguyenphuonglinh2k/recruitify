import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import PropTypes from "prop-types";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ImageSource } from "assets";
import { COLORS, StorageUtils } from "utils";
import LogoutIcon from "icons/LogoutIcon";
import { AppConstant } from "const";
import { useDispatch } from "react-redux";
import AuthActions from "reduxStore/auth.redux";

const CustomDrawerContent = props => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(
      AuthActions.authSuccess({
        isLoggedIn: false,
      }),
    );
    StorageUtils.remove(AppConstant.AUTH_TOKEN_KEY);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        contentContainerStyle={styles.contentContainerStyle}
        {...props}
      >
        <View>
          <View style={styles.logoWrapper}>
            <Image source={ImageSource.LogoImage} style={styles.logo} />
          </View>

          <View style={styles.drawerItemListWrapper}>
            <DrawerItemList {...props} />
          </View>
        </View>

        <ButtonItem
          onPress={handleLogout}
          label="Log out"
          icon={<LogoutIcon />}
          labelStyle={{ color: COLORS.red }}
          style={{ borderTopWidth: 1, borderColor: COLORS.grey[200] }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

const ButtonItem = ({
  label,
  icon,
  style,
  labelStyle,
  isActive,
  ...otherProps
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonWrapper, style, isActive ? styles.activeButton : {}]}
      {...otherProps}
    >
      {icon}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

ButtonItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isActive: PropTypes.bool,
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 0,
  },
  logoWrapper: {
    padding: 20,
    backgroundColor: COLORS.black,
  },
  logo: {
    height: 35,
    width: 136,
    alignSelf: "center",
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  activeButton: {
    backgroundColor: "rgba(1, 50, 67, 0.15)",
    borderRadius: 6,
  },
  label: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 16,
    marginLeft: 12,
    width: "100%",
  },
  drawerItemListWrapper: {
    marginVertical: 6,
  },
});

export default CustomDrawerContent;
