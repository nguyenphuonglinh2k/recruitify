import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SignInScreen,
  JobsScreen,
  JobDetailScreen,
  CandidatesScreen,
} from "screens";
import { SCREEN_NAME } from "const/path.const";

const Stack = createNativeStackNavigator();
const screenOptions = { headerShown: false };

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={SCREEN_NAME.signInScreen} component={SignInScreen} />
    </Stack.Navigator>
  );
};

const DashboardStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={SCREEN_NAME.jobScreen} component={JobsScreen} />
      <Stack.Screen
        name={SCREEN_NAME.jobDetailScreen}
        component={JobDetailScreen}
      />
    </Stack.Navigator>
  );
};

const JobStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={SCREEN_NAME.jobScreen} component={JobsScreen} />
      <Stack.Screen
        name={SCREEN_NAME.jobDetailScreen}
        component={JobDetailScreen}
      />
    </Stack.Navigator>
  );
};

const ApplicationStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={SCREEN_NAME.candidateScreen}
        component={CandidatesScreen}
      />
    </Stack.Navigator>
  );
};

const ScheduleStack = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile</Text>
    </View>
  );
};

export { AuthStack, DashboardStack, ApplicationStack, JobStack, ScheduleStack };
