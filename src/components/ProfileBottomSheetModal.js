import { StyleSheet } from "react-native";
import React, { forwardRef, useCallback } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import PropTypes from "prop-types";
import { ScrollView } from "react-native-gesture-handler";
import Header from "screens/ProfileScreen/Header";
import Information from "screens/ProfileScreen/Information";
import { useState } from "react";
import { UserService } from "services";
import { ApiConstant } from "const";
import { useFocusEffect } from "@react-navigation/core";
import LoadingSpinner from "./LoadingSpinner";
import { Fragment } from "react";

const ProfileBottomSheetModal = forwardRef(
  ({ userId, onChange, ...otherProps }, ref) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useFocusEffect(
      useCallback(() => {
        async function fetchData() {
          if (userId) {
            setIsLoading(true);
            try {
              const response = await UserService.getUserInfo(userId);

              if (response.status === ApiConstant.STT_OK) {
                setUserInfo(response.data);
              }
            } catch (error) {
              console.error(error);
            } finally {
              setIsLoading(false);
            }
          }
        }

        fetchData();
      }, [userId]),
    );

    return userId ? (
      <BottomSheetModal
        enablePanDownToClose
        ref={ref}
        index={1}
        backdropComponent={props => (
          <BottomSheetBackdrop disappearsOnIndex={-1} {...props} />
        )}
        style={{ flex: 1 }}
        snapPoints={["100%", "90%"]}
        onChange={onChange}
        containerStyle={{ flex: 1 }}
        {...otherProps}
      >
        <ScrollView style={styles.contentContainer}>
          <Header data={userInfo} />
          <Information data={userInfo} />

          <LoadingSpinner isVisible={isLoading} />
        </ScrollView>
      </BottomSheetModal>
    ) : (
      <Fragment />
    );
  },
);

ProfileBottomSheetModal.propTypes = {
  onChange: PropTypes.func,
  userId: PropTypes.string,
};

ProfileBottomSheetModal.displayName = "ProfileBottomSheetModal";

export default ProfileBottomSheetModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
