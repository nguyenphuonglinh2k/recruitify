import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";
import { AppConstant } from "const";
import CommonAvatar from "./CommonAvatar";
import { COLORS } from "utils";

const CommonAvatarGroup = ({
  data,
  max,
  style,
  avatarStyle,
  ...otherProps
}) => {
  const [displayedData, isOverMaxSize] = useMemo(() => {
    const reversedData = data.reverse();
    const isOverSize = reversedData.length > max;
    const newData = isOverSize ? reversedData.slice(0, max) : reversedData;

    return [newData, isOverSize];
  }, [data, max]);

  return (
    <View style={[styles.root, style]} {...otherProps}>
      {isOverMaxSize && (
        <View style={styles.lastCircle}>
          <Text style={styles.lastText}>{`+${data.length - max}`}</Text>
        </View>
      )}
      {displayedData.map((source, index) => (
        <CommonAvatar
          key={index}
          source={source}
          style={[styles.avatar, avatarStyle]}
        />
      ))}
    </View>
  );
};

CommonAvatarGroup.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ).isRequired,
  max: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  avatarStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

CommonAvatarGroup.defaultProps = {
  max: AppConstant.MAXIMUM_AVATAR_TOTAL_IN_GROUP,
  data: [],
};

export default memo(CommonAvatarGroup);

const SPACING = -14;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
  },
  avatar: {
    borderWidth: 2,
    borderColor: COLORS.yellow,
    marginRight: SPACING,
  },
  lastCircle: {
    heigh: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLORS.grey[400],
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING,
  },
  lastText: {
    color: COLORS.white,
    fontWeight: "600",
  },
});
