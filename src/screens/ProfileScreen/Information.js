import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import React, { useMemo, memo } from "react";
import PropTypes from "prop-types";
import { DetailItemRow } from "components";
import { COLORS } from "utils";
import { contentStyle, paddingStyle } from "components/DetailItemRow";
import { useSelector } from "react-redux";

const Information = ({ data, style }) => {
  const authUser = useSelector(({ authRedux }) => authRedux.user);

  const user = useMemo(() => data ?? authUser, [data, authUser]);

  const resume = useMemo(() => {
    if (
      user?.applicationIds?.length &&
      user?.applicationIds[0]?.attachments?.length
    ) {
      const attachment = user.applicationIds[0].attachments[0];
      return attachment ?? {};
    } else {
      return {};
    }
  }, [user?.applicationIds]);

  const handleOpenResume = () => {
    if (user?.applicationIds?.length) {
      Linking.openURL(user?.applicationIds[0]?.attachments[0]?.url);
    }
  };

  return (
    <View style={[styles.root, style]}>
      <DetailItemRow label="Email" content={user.email} />
      <DetailItemRow label="Phone number" content={user?.phoneNumber} />
      <DetailItemRow label="Current Address" content={user?.address} />
      <DetailItemRow
        label="Application link"
        content={
          <View style={paddingStyle}>
            <TouchableOpacity onPress={handleOpenResume}>
              <Text style={styles.resumeName}>{resume?.name ?? ""}</Text>
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

Information.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default memo(Information);

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
