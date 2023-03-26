import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { CommonAvatar, DetailItemRow } from "components";

const InformationTab = ({ style }) => {
  return (
    <ScrollView style={[styles.root, style]}>
      <DetailItemRow
        label="Avatar"
        content={
          <CommonAvatar
            source={{
              uri: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/hinh-anh-avatar-tiktok-cute.jpg",
            }}
            style={styles.avatar}
          />
        }
      />

      <DetailItemRow label="Email" content={MOCK_INFORMATION.email} />
      <DetailItemRow
        label="Phone number"
        content={MOCK_INFORMATION.phoneNumber}
      />
      <DetailItemRow
        label="Current Address"
        content={MOCK_INFORMATION.currentAddress}
      />
      <DetailItemRow label="Updated at" content={MOCK_INFORMATION.updatedAt} />
    </ScrollView>
  );
};

const MOCK_INFORMATION = {
  email: "PaulHarris@gmail.com",
  phoneNumber: "0123456789",
  currentAddress: "Warsaw, Poland",
  updatedAt: "15/03/2022 8:56 AM",
};

InformationTab.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default InformationTab;

const styles = StyleSheet.create({
  root: {
    paddingVertical: 16,
  },
  avatar: {
    height: 50,
    width: 50,
    marginVertical: 10,
    marginHorizontal: 16,
  },
});
