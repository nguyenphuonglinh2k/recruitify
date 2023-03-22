import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ApplicationIcon, BriefcaseIcon, CalendarIcon, HomeIcon } from "icons";
import {
  DashboardStack,
  ApplicationStack,
  PositionStack,
  ScheduleStack,
} from "./StackNavigator";
import { TAB_NAME } from "const/path.const";
import { COLORS } from "utils";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
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
      <Icon color={focused ? COLORS.green : COLORS.grey[200]} />
    ),
    ...otherOptions,
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 50,
        },
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      }}
      initialRouteName={TAB_NAME.dashboard}
    >
      <Tab.Screen
        name={TAB_NAME.dashboard}
        component={DashboardStack}
        options={onGetTabScreenOptions(HomeIcon)}
      />

      <Tab.Screen
        name={TAB_NAME.position}
        component={PositionStack}
        options={onGetTabScreenOptions(BriefcaseIcon)}
        // listeners={() => ({
        //   tabPress: onPressTab(TabName.search, RouteName.search),
        // })}
      />

      <Tab.Screen
        name={TAB_NAME.application}
        component={ApplicationStack}
        options={onGetTabScreenOptions(ApplicationIcon)}
      />

      <Tab.Screen
        name={TAB_NAME.scheduled}
        component={ScheduleStack}
        options={onGetTabScreenOptions(CalendarIcon)}
      />
    </Tab.Navigator>
  );
}
