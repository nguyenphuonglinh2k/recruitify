import React, { memo } from "react";
import ProgressBar from "react-native-progress/Bar";
import PropTypes from "prop-types";
import { onGetProgressBarColor } from "utils/color.utils";
import { COLORS } from "utils";

const CommonProgressBar = ({ progress, ...otherProps }) => {
  return (
    <ProgressBar
      progress={progress}
      width={null}
      height={6}
      color={onGetProgressBarColor(progress)}
      unfilledColor={COLORS.orange.light}
      borderWidth={0}
      {...otherProps}
    />
  );
};

CommonProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default memo(CommonProgressBar);
