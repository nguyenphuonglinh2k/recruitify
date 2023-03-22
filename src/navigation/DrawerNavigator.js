import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { StyleSheet, Text } from "react-native";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: "75%" },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "space-between",
        paddingBottom: 10,
      }}
      {...props}
    >
      <Text style={styles.greet}>Good Morning</Text>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({});

export default DrawerNavigator;
