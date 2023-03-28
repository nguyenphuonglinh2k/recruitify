import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import PropTypes from "prop-types";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import TabNavigator from "./TabNavigator";
import { ImageSource } from "assets";
import { COLORS } from "utils";
import LogoutIcon from "icons/LogoutIcon";
import { BriefcaseIcon, SettingIcon, TeacherIcon, UserIcon } from "icons";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: "75%" },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "space-between",
      }}
      {...props}
    >
      <View>
        <View style={styles.logoWrapper}>
          <Image source={ImageSource.LogoImage} style={styles.logo} />
        </View>

        <View style={{ margin: 10 }}>
          <ButtonItem
            label="Recruitment Process"
            icon={<BriefcaseIcon />}
            isActive
          />
          <ButtonItem label="Candidate Training" icon={<TeacherIcon />} />
          <ButtonItem
            label="My profile"
            icon={<UserIcon color={COLORS.black} />}
          />
          <ButtonItem label="Settings" icon={<SettingIcon />} />
        </View>
      </View>

      <ButtonItem
        label="Log out"
        icon={<LogoutIcon />}
        labelStyle={{ color: COLORS.red }}
      />
    </DrawerContentScrollView>
  );
};

const ButtonItem = ({ label, icon, style, labelStyle, isActive }) => {
  return (
    <TouchableOpacity
      style={[styles.buttonWrapper, style, isActive ? styles.activeButton : {}]}
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
});

export default DrawerNavigator;
