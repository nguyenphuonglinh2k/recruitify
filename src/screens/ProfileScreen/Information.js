import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { DetailItemRow } from "components";
import { COLORS } from "utils";
import { contentStyle, paddingStyle } from "components/DetailItemRow";

const Information = ({ style }) => {
  return (
    <View style={[styles.root, style]}>
      <DetailItemRow label="Email" content={MOCK_INFO.email} />
      <DetailItemRow
        label="Phone number"
        content={APPLICATION_INFO.phoneNumber}
      />
      <DetailItemRow
        label="Current Address"
        content={APPLICATION_INFO.currentAddress}
      />
      <DetailItemRow
        label="Application link"
        content={
          <View style={paddingStyle}>
            <TouchableOpacity>
              <Text style={styles.resumeName}>
                {APPLICATION_INFO.resumeName}
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const APPLICATION_INFO = {
  currentAddress: "Cali, Poland",
  phoneNumber: "0123456789",
  resumeName: "Arnolu_Chafe_resume",
};

const MOCK_INFO = {
  name: "Arnoly Chafe",
  email: "arnolyChafe@gmail.com",
  avatarUrl:
    "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg",
  role: 4,
  createdAt: "12/03/2023",
  applicationId: 1,
};

Information.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Information;

const styles = StyleSheet.create({
  root: {
    marginVertical: 16,
  },
  skills: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: COLORS.grey[200],
  },
  notFirstTag: {
    marginLeft: 4,
  },
  resumeName: {
    ...contentStyle,
    textDecorationLine: "underline",
    textDecorationColor: COLORS.black,
  },
});
