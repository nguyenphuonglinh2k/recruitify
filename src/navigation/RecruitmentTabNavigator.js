import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ApplicationIcon, BriefcaseIcon, CalendarIcon, HomeIcon } from "icons";
import {
  DashboardStack,
  ApplicationStack,
  JobStack,
  ScheduleStack,
} from "./StackNavigator";
import { TAB_NAME } from "const/path.const";
import { COLORS } from "utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function RecruitmentTabNavigator() {
  const insets = useSafeAreaInsets();

  // const onPressTab = (tabName, screenName, params) => {
  //   return e => {
  //     // Prevent default action
  //     e.preventDefault();
  //     navigation.navigate(tabName, {
  //       screen: screenName,
  //       params,
  //     });
  //   };
  // };

  const onGetTabScreenOptions = (Icon, otherOptions = {}) => ({
    tabBarIcon: ({ focused }) => (
      <Icon color={focused ? COLORS.green : COLORS.grey[400]} />
    ),
    tabBarActiveTintColor: COLORS.black,
    tabBarInactiveTintColor: COLORS.grey[400],
    tabBarLabelStyle: {
      fontWeight: "600",
      marginBottom: 6,
    },
    ...otherOptions,
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 50 + insets.bottom,
        },
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
      }}
      initialRouteName={TAB_NAME.dashboard}
    >
      <Tab.Screen
        name={TAB_NAME.dashboard}
        component={DashboardStack}
        options={onGetTabScreenOptions(HomeIcon, { tabBarLabel: "Overview" })}
      />

      <Tab.Screen
        name={TAB_NAME.position}
        component={JobStack}
        options={onGetTabScreenOptions(BriefcaseIcon, {
          tabBarLabel: "Job",
        })}
        // listeners={() => ({
        //   tabPress: onPressTab(TabName.search, RouteName.search),
        // })}
      />

      <Tab.Screen
        name={TAB_NAME.application}
        component={ApplicationStack}
        options={onGetTabScreenOptions(ApplicationIcon, {
          tabBarLabel: "Candidate",
        })}
      />

      <Tab.Screen
        name={TAB_NAME.scheduled}
        component={ScheduleStack}
        options={onGetTabScreenOptions(CalendarIcon, {
          tabBarLabel: "Scheduled",
        })}
      />
    </Tab.Navigator>
  );
}
