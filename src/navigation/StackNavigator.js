import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SignInScreen,
  JobsScreen,
  JobDetailScreen,
  CandidatesScreen,
  CandidateDetailScreen,
  OverviewScreen,
  ScheduleScreen,
  ScheduleListScreen,
  ScheduleDetailScreen,
  ScheduleAddition,
  ScheduleDetailEditingScreen,
  ProjectScreen,
  ProjectDetailScreen,
  ProjectCreationScreen,
  TaskScreen,
  TaskDetailScreen,
  ProjectEditingScreen,
  ProjectMemberEditingScreen,
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
      <Stack.Screen
        name={SCREEN_NAME.overviewScreen}
        component={OverviewScreen}
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
      <Stack.Screen
        name={SCREEN_NAME.candidateDetailScreen}
        component={CandidateDetailScreen}
      />
    </Stack.Navigator>
  );
};

const ScheduleStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={SCREEN_NAME.scheduleScreen}
        component={ScheduleScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.scheduleListScreen}
        component={ScheduleListScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.scheduleDetailScreen}
        component={ScheduleDetailScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.scheduleAddition}
        component={ScheduleAddition}
      />
      <Stack.Screen
        name={SCREEN_NAME.scheduleDetailEditingScreen}
        component={ScheduleDetailEditingScreen}
      />
    </Stack.Navigator>
  );
};

const ProjectStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={SCREEN_NAME.projectScreen}
        component={ProjectScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.projectDetailScreen}
        component={ProjectDetailScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.projectCreationScreen}
        component={ProjectCreationScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.projectEditingScreen}
        component={ProjectEditingScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.projectMemberEditingScreen}
        component={ProjectMemberEditingScreen}
      />
    </Stack.Navigator>
  );
};

const TaskStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={SCREEN_NAME.taskScreen} component={TaskScreen} />
      <Stack.Screen
        name={SCREEN_NAME.taskDetailScreen}
        component={TaskDetailScreen}
      />
    </Stack.Navigator>
  );
};

export {
  AuthStack,
  DashboardStack,
  ApplicationStack,
  JobStack,
  ScheduleStack,
  ProjectStack,
  TaskStack,
};
