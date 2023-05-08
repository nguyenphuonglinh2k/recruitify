import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DRAWER_TAB_NAME } from "const/path.const";
import { ProfileScreen, SettingScreen } from "screens";
import { BriefcaseIcon, SettingIcon, TeacherIcon, UserIcon } from "icons";
import { COLORS } from "utils";
import CustomDrawerContent from "./CustomDrawerContent";
import TrainingTabNavigator from "./TrainingTabNavigator";
import RecruitmentTabNavigator from "./RecruitmentTabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={drawerScreenOptions}
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName={DRAWER_TAB_NAME.recruitmentProcess}
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
        name={DRAWER_TAB_NAME.profileScreen}
        component={ProfileScreen}
        options={{
          drawerLabel: "My Profile",
          drawerIcon: () => <UserIcon />,
        }}
      />
      <Drawer.Screen
        name={DRAWER_TAB_NAME.settingScreen}
        component={SettingScreen}
        options={{
          drawerLabel: "Settings",
          drawerIcon: () => <SettingIcon />,
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
