import { StyleSheet, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { CommonAvatarChip } from "components";

const ChipAvatarList = ({ data, style, onPress, ...otherProp }) => {
  return (
    <View style={[styles.root, style]} {...otherProp}>
      {data?.map(({ name, avatarUrl }, index) => (
        <CommonAvatarChip
          key={index}
          label={name}
          source={{ uri: avatarUrl }}
          style={index !== 0 ? styles.notFirstChild : {}}
          onPress={onPress}
        />
      ))}
    </View>
  );
};

ChipAvatarList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }),
  ),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
};

export default ChipAvatarList;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  notFirstChild: {
    marginLeft: 10,
  },
});
