import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeIcon, ProjectIcon, TaskIcon } from "icons";
import { DashboardStack, ProjectStack, TaskStack } from "./StackNavigator";
import { TAB_NAME } from "const/path.const";
import { COLORS } from "utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function TrainingTabNavigator() {
  const insets = useSafeAreaInsets();

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
    >
      <Tab.Screen
        name={TAB_NAME.trainingOverview}
        component={DashboardStack}
        options={onGetTabScreenOptions(HomeIcon, { tabBarLabel: "Overview" })}
      />

      <Tab.Screen
        name={TAB_NAME.project}
        component={ProjectStack}
        options={onGetTabScreenOptions(ProjectIcon, {
          tabBarLabel: "Project",
        })}
      />

      <Tab.Screen
        name={TAB_NAME.task}
        component={TaskStack}
        options={onGetTabScreenOptions(TaskIcon, {
          tabBarLabel: "Task",
        })}
      />
    </Tab.Navigator>
  );
}

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
