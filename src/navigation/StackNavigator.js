import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SignInScreen,
  JobsScreen,
  JobDetailScreen,
  CandidatesScreen,
  CandidateDetailScreen,
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
  ProjectTaskEditingScreen,
  ProjectTaskCreationScreen,
  TaskCreationScreen,
  TaskEditingScreen,
  CandidateEditingInfoScreen,
  CandidateCreationScreen,
  JobCreationScreen,
  JobEditingScreen,
  JobCandidateCreationScreen,
  ProfileScreen,
  ProfileEditingScreen,
  SettingScreen,
  SettingTagScreen,
  SettingUsersScreen,
  SettingUserCreationScreen,
  ProjectOverviewScreen,
  TrainingResultScreen,
  TrainingResultDetailScreen,
  TrainingResultEditingScreen,
  TrainingResultCreationScreen,
  CandidateOverviewScreen,
  CandidateEditingProcessScreen,
  ForgotPasswordScreen,
} from "screens";
import { SCREEN_NAME } from "const/path.const";

const Stack = createNativeStackNavigator();
const screenOptions = { headerShown: false };

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={SCREEN_NAME.profileScreen}
        component={ProfileScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.profileEditingScreen}
        component={ProfileEditingScreen}
      />
    </Stack.Navigator>
  );
};

const SettingStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={SCREEN_NAME.settingScreen}
        component={SettingScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.settingTagScreen}
        component={SettingTagScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.settingUsersScreen}
        component={SettingUsersScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.settingUserCreationScreen}
        component={SettingUserCreationScreen}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={SCREEN_NAME.signInScreen} component={SignInScreen} />
      <Stack.Screen
        name={SCREEN_NAME.forgotPasswordScreen}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

const CandidateOverviewStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={SCREEN_NAME.candidateOverviewScreen}
        component={CandidateOverviewScreen}
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
      <Stack.Screen
        name={SCREEN_NAME.jobCreationScreen}
        component={JobCreationScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.jobEditingScreen}
        component={JobEditingScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.jobCandidateCreationScreen}
        component={JobCandidateCreationScreen}
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
      <Stack.Screen
        name={SCREEN_NAME.candidateEditingInfoScreen}
        component={CandidateEditingInfoScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.candidateCreationScreen}
        component={CandidateCreationScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.candidateEditingProcessScreen}
        component={CandidateEditingProcessScreen}
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

const TrainingOverviewStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={SCREEN_NAME.projectOverviewScreen}
        component={ProjectOverviewScreen}
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
      <Stack.Screen
        name={SCREEN_NAME.projectTaskEditingScreen}
        component={ProjectTaskEditingScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.projectTaskCreationScreen}
        component={ProjectTaskCreationScreen}
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
      <Stack.Screen
        name={SCREEN_NAME.taskCreationScreen}
        component={TaskCreationScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.taskEditingScreen}
        component={TaskEditingScreen}
      />
    </Stack.Navigator>
  );
};

const TrainingResultStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={SCREEN_NAME.trainingResultScreen}
        component={TrainingResultScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.trainingResultDetailScreen}
        component={TrainingResultDetailScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.trainingResultEditingScreen}
        component={TrainingResultEditingScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.trainingResultCreationScreen}
        component={TrainingResultCreationScreen}
      />
    </Stack.Navigator>
  );
};

export {
  ProfileStack,
  SettingStack,
  AuthStack,
  CandidateOverviewStack,
  ApplicationStack,
  JobStack,
  ScheduleStack,
  ProjectStack,
  TaskStack,
  TrainingOverviewStack,
  TrainingResultStack,
};
