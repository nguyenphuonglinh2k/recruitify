import { ScrollView } from "react-native";
import React from "react";
import { MainLayout } from "layouts";
import { CommonIconButton } from "components";
import { COLORS } from "utils";
import { PencilIcon } from "icons";
import Header from "./Header";
import Information from "./Information";
import { useNavigation } from "@react-navigation/core";
import { SCREEN_NAME } from "const/path.const";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleNavigateToEdit = () => {
    navigation.navigate(SCREEN_NAME.profileEditingScreen);
  };

  return (
    <MainLayout
      headerProps={{
        headerRight: (
          <CommonIconButton onPress={handleNavigateToEdit}>
            <PencilIcon color={COLORS.black} />
          </CommonIconButton>
        ),
      }}
    >
      <ScrollView>
        <Header />
        <Information />
      </ScrollView>
    </MainLayout>
  );
};

export default ProfileScreen;
