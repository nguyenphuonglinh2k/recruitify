import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { ToastProvider } from "react-native-toast-notifications";
import DrawerNavigator from "navigation/DrawerNavigator";
import { AuthStack } from "navigation/StackNavigator";
import { COLORS } from "utils";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white,
    text: COLORS.black,
    border: COLORS.grey[300],
  },
};

const App = () => {
  const [splash, setSplash] = useState(true);
  const isLoggedIn = true;

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
          {isLoggedIn ? <DrawerNavigator /> : <AuthStack />}
        </NavigationContainer>
      </ToastProvider>
    </SafeAreaProvider>
  );
};

export default App;
