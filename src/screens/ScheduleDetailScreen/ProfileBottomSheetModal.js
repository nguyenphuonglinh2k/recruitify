import { StyleSheet } from "react-native";
import React, { forwardRef } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import PropTypes from "prop-types";
import { ScrollView } from "react-native-gesture-handler";

import Header from "screens/ProfileScreen/Header";
import Information from "screens/ProfileScreen/Information";

const ProfileBottomSheetModal = forwardRef(
  ({ onChange, ...otherProps }, ref) => {
    return (
      <BottomSheetModal
        enablePanDownToClose
        ref={ref}
        index={1}
        backdropComponent={props => (
          <BottomSheetBackdrop disappearsOnIndex={-1} {...props} />
        )}
        style={{ flex: 1 }}
        snapPoints={["100%", "80%"]}
        onChange={onChange}
        containerStyle={{ flex: 1 }}
        {...otherProps}
      >
        <ScrollView style={styles.contentContainer}>
          <Header />
          <Information />
        </ScrollView>
      </BottomSheetModal>
    );
  },
);

ProfileBottomSheetModal.propTypes = {
  onChange: PropTypes.func,
};

ProfileBottomSheetModal.displayName = "ProfileBottomSheetModal";

export default ProfileBottomSheetModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
