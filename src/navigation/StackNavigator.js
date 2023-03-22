import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignInScreen } from "screens";
import { PathConstant } from "const";

const Stack = createNativeStackNavigator();
const screenOptions = { headerShown: false };

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={PathConstant.SCREEN_NAME.signInScreen}
        component={SignInScreen}
      />
    </Stack.Navigator>
  );
};

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>home</Text>
    </View>
  );
};

const DashboardStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const SearchScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>search</Text>
    </View>
  );
};

const PositionStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

const ApplicationStack = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Chat</Text>
    </View>
  );
};

const ScheduleStack = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile</Text>
    </View>
  );
};

export {
  AuthStack,
  DashboardStack,
  ApplicationStack,
  PositionStack,
  ScheduleStack,
};
