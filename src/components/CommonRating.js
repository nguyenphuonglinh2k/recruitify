import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { OutlineStarIcon, StarIcon } from "icons";
import { AppConstant } from "const";

const CommonRating = ({ value, readonly, style, ...otherProps }) => {
  const notFulfilStarTotal = useMemo(
    () => AppConstant.MAXIMUM_STAR_RATING - value,
    [value],
  );

  const activeOpacity = useMemo(() => (readonly ? 1 : 0.5), [readonly]);

  return (
    <View style={[styles.root, style]} {...otherProps}>
      {Array.from(new Array(value)).map((_, index) => (
        <TouchableOpacity key={index} activeOpacity={activeOpacity}>
          <StarIcon />
        </TouchableOpacity>
      ))}
      {notFulfilStarTotal > 0 &&
        Array.from(new Array(notFulfilStarTotal)).map((_, index) => (
          <TouchableOpacity key={index} activeOpacity={activeOpacity}>
            <OutlineStarIcon />
          </TouchableOpacity>
        ))}
    </View>
  );
};

CommonRating.propTypes = {
  value: PropTypes.number,
  readonly: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

CommonRating.defaultProps = {
  value: 3,
  readonly: true,
};

export default memo(CommonRating);

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
  },
});
