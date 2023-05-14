import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DRAWER_TAB_NAME } from "const/path.const";
import { ChangePasswordScreen } from "screens";
import {
  BriefcaseIcon,
  LockIcon,
  SettingIcon,
  TeacherIcon,
  UserIcon,
} from "icons";
import { COLORS } from "utils";
import CustomDrawerContent from "./CustomDrawerContent";
import TrainingTabNavigator from "./TrainingTabNavigator";
import RecruitmentTabNavigator from "./RecruitmentTabNavigator";
import { ProfileStack, SettingStack } from "./StackNavigator";

export const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={drawerScreenOptions}
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName={DRAWER_TAB_NAME.candidateTraining}
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
        component={TrainingTabNavigator}
        options={{
          drawerLabel: "Candidate Training",
          drawerIcon: () => <TeacherIcon />,
        }}
      />
      <Drawer.Screen
        name={DRAWER_TAB_NAME.profileStack}
        component={ProfileStack}
        options={{
          drawerLabel: "My Profile",
          drawerIcon: () => <UserIcon />,
        }}
      />
      <Drawer.Screen
        name={DRAWER_TAB_NAME.settingStack}
        component={SettingStack}
        options={{
          drawerLabel: "Settings",
          drawerIcon: () => <SettingIcon />,
        }}
      />

      <Drawer.Screen
        name={DRAWER_TAB_NAME.changePassword}
        component={ChangePasswordScreen}
        options={{
          drawerLabel: "Change password",
          drawerIcon: () => <LockIcon />,
        }}
      />
    </Drawer.Navigator>
  );
};

const drawerScreenOptions = {
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
};

export default DrawerNavigator;
