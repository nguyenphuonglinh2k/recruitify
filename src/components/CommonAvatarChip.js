import { StyleSheet } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import CommonChip from "components/CommonChip";
import { memo } from "react";
import CommonAvatar from "./CommonAvatar";
import { COLORS } from "utils";

const CommonAvatarChip = ({ source, style, avatarStyle, ...otherProps }) => {
  return (
    <CommonChip
      startAdornment={
        <CommonAvatar source={source} style={[styles.avatar, avatarStyle]} />
      }
      style={[styles.root, style]}
      {...otherProps}
    />
  );
};

CommonAvatarChip.propTypes = {
  label: PropTypes.string,
  source: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  avatarStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default memo(CommonAvatarChip);

const styles = StyleSheet.create({
  avatar: {
    marginRight: 4,
    height: 30,
    width: 30,
  },
  root: {
    borderRadius: 50,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: COLORS.grey[100],
  },
});
