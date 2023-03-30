import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RecruitmentTabNavigator from "./RecruitmentTabNavigator";
import { DRAWER_TAB_NAME } from "const/path.const";
import { ProfileScreen } from "screens";
import CustomDrawerContent from "./CustomDrawerContent";
import { BriefcaseIcon, SettingIcon, TeacherIcon, UserIcon } from "icons";
import { COLORS } from "utils";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: "75%" },
        drawerActiveBackgroundColor: COLORS.lightBlack,
        drawerActiveTintColor: COLORS.black,
        drawerInactiveTintColor: COLORS.black,
        drawerLabelStyle: {
          marginLeft: -20,
          fontWeight: "600",
          fontSize: 16,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name={DRAWER_TAB_NAME.recruitmentProcess}
        component={RecruitmentTabNavigator}
        options={{
          drawerLabel: "Recruitment Process",
          drawerIcon: () => <BriefcaseIcon />,
        }}
      />
      <Drawer.Screen
        name={DRAWER_TAB_NAME.candidateTraining}
        component={ProfileScreen}
        options={{
          drawerLabel: "Candidate Training",
          drawerIcon: () => <TeacherIcon />,
        }}
      />
      <Drawer.Screen
        name={DRAWER_TAB_NAME.profileScreen}
        component={ProfileScreen}
        options={{
          drawerLabel: "My Profile",
          drawerIcon: () => <UserIcon />,
        }}
      />
      <Drawer.Screen
        name={DRAWER_TAB_NAME.settingScreen}
        component={ProfileScreen}
        options={{
          drawerLabel: "Settings",
          drawerIcon: () => <SettingIcon />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
