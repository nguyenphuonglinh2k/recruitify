import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { OutlineStarIcon, StarIcon } from "icons";
import { AppConstant } from "const";
import { COLORS } from "utils";

const CommonRating = ({ color, value, style, ...otherProps }) => {
  const notFulfilStarTotal = useMemo(
    () => AppConstant.MAXIMUM_STAR_RATING - (value ?? 0),
    [value],
  );

  return (
    <View style={[styles.root, style]} {...otherProps}>
      {Array.from(new Array(value)).map((_, index) => (
        <StarIcon color={color} key={index} />
      ))}
      {notFulfilStarTotal > 0 &&
        Array.from(new Array(notFulfilStarTotal)).map((_, index) => (
          <OutlineStarIcon color={color} key={index} />
        ))}
    </View>
  );
};

CommonRating.propTypes = {
  value: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  color: PropTypes.string,
};

CommonRating.defaultProps = {
  value: 0,
  color: COLORS.yellow,
};

export default memo(CommonRating);

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
  },
});
