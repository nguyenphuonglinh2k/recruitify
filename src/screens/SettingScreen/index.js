import { ScrollView, StyleSheet, Text } from "react-native";
import React from "react";
import { MainLayout } from "layouts";
import { COLORS } from "utils";
import SettingItem from "./SettingItem";
import { useNavigation } from "@react-navigation/core";
import { SCREEN_NAME } from "const/path.const";

const SettingScreen = () => {
  const navigation = useNavigation();

  const handleNavigateToTagSetting = () => {
    navigation.navigate(SCREEN_NAME.settingTagScreen);
  };

  const handleNavigateToUserSetting = () => {
    navigation.navigate(SCREEN_NAME.settingUsersScreen);
  };

  return (
    <MainLayout>
      <ScrollView style={{ margin: 16 }}>
        <Text style={styles.label}>Settings</Text>

        <SettingItem label="Tag Setting" onPress={handleNavigateToTagSetting} />
        <SettingItem
          label="User Account Management"
          style={{ marginTop: 10 }}
          onPress={handleNavigateToUserSetting}
        />
      </ScrollView>
    </MainLayout>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  label: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
});
