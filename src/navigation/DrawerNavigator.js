import React, { useMemo } from "react";
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
import { useSelector } from "react-redux";
import { USER_ROLE } from "const/app.const";

export const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const AUTH_USER = useSelector(({ authRedux }) => authRedux.user);

  const hasAccessRecruitmentTab = useMemo(
    () =>
      [USER_ROLE.admin, USER_ROLE.hr, USER_ROLE.manager].includes(
        AUTH_USER?.role,
      ),
    [AUTH_USER?.role],
  );

  const isAdmin = useMemo(
    () => AUTH_USER?.role === USER_ROLE.admin,
    [AUTH_USER?.role],
  );

  return (
    <Drawer.Navigator
      screenOptions={drawerScreenOptions}
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName={DRAWER_TAB_NAME.recruitmentProcess}
    >
      {hasAccessRecruitmentTab && (
        <Drawer.Screen
          name={DRAWER_TAB_NAME.recruitmentProcess}
          component={RecruitmentTabNavigator}
          options={{
            drawerLabel: "Recruitment Process",
            drawerIcon: () => <BriefcaseIcon />,
          }}
        />
      )}
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

      {isAdmin && (
        <Drawer.Screen
          name={DRAWER_TAB_NAME.settingStack}
          component={SettingStack}
          options={{
            drawerLabel: "Settings",
            drawerIcon: () => <SettingIcon />,
          }}
        />
      )}

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
