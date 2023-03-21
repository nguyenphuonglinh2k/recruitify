import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { ToastProvider } from "react-native-toast-notifications";
// import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { AuthStack } from "navigation/StackNavigator";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFF",
    text: "#262626",
  },
};

const App = () => {
  const [splash, setSplash] = useState(true);
  const isLoggedIn = false;

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setSplash(false);
    }, 700);

    return () => {
      clearTimeout(splashTimeout);
    };
  }, []);

  return (
    <SafeAreaProvider>
      <ToastProvider
        swipeEnabled
        duration={2000}
        placement="top"
        animationType="slide-in"
      >
        <NavigationContainer theme={navTheme}>
          {!isLoggedIn && <AuthStack />}
          {/* <DrawerNavigator /> */}
        </NavigationContainer>
      </ToastProvider>
    </SafeAreaProvider>
  );
};

export default App;
