import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { DetailItemRow } from "components";
import { COLORS } from "utils";
import { contentStyle, paddingStyle } from "components/DetailItemRow";
import { useSelector } from "react-redux";

const Information = ({ data, style }) => {
  const authUser = useSelector(({ authRedux }) => authRedux.user);

  const user = useMemo(() => data ?? authUser, [data, authUser]);

  return (
    <View style={[styles.root, style]}>
      <DetailItemRow label="Email" content={user.email} />
      <DetailItemRow label="Phone number" content={user?.phoneNumber} />
      <DetailItemRow label="Current Address" content={user?.address} />
      <DetailItemRow
        label="Application link"
        content={
          <View style={paddingStyle}>
            <TouchableOpacity>
              <Text style={styles.resumeName}>
                {/* TODO */}
                {APPLICATION_INFO.resumeName}
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

Information.propTypes = {
  data: PropTypes.object,
};

const APPLICATION_INFO = {
  currentAddress: "Cali, Poland",
  phoneNumber: "0123456789",
  resumeName: "Arnolu_Chafe_resume",
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
