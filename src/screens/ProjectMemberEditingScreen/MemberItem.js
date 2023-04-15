import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { CommonAvatar, CommonCheckbox } from "components";
import { COLORS } from "utils";

const MemberItem = ({ isCreator, data, style, ...otherProps }) => {
  return (
    <CommonCheckbox
      isChecked={data.isChecked}
      disabled={isCreator}
      textComponent={
        <View style={styles.left}>
          <View style={styles.infoRow}>
            <CommonAvatar source={{ uri: data.avatarUrl }} />
            <Text style={styles.username}>{data.name}</Text>
          </View>
          {isCreator && <Text style={styles.label}>Creator</Text>}
        </View>
      }
      style={[styles.root, style]}
      innerIconStyle={{
        borderRadius: 6,
      }}
      iconStyle={{ borderRadius: 6 }}
      {...otherProps}
    />
  );
};

MemberItem.propTypes = {
  isCreator: PropTypes.bool,
  data: PropTypes.shape({
    isChecked: PropTypes.bool,
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default MemberItem;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 16,
    justifyContent: "space-between",
  },
  username: {
    color: COLORS.black,
    fontSize: 16,
    marginLeft: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  label: {
    color: COLORS.blue.neutral,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: COLORS.blue[100],
    borderRadius: 6,
  },
});
