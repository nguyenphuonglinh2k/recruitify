import React from "react";
import Svg, { Path } from "react-native-svg";
import PropTypes from "prop-types";
import { COLORS } from "utils";

const ArrowIcon = ({ height, width, color, ...otherProps }) => {
  return (
    <Svg height={height} width={width} {...otherProps}>
      <Path
        d="M14.9998 20.67C14.8098 20.67 14.6198 20.6 14.4698 20.45L7.94979 13.93C6.88979 12.87 6.88979 11.13 7.94979 10.07L14.4698 3.55C14.7598 3.26 15.2398 3.26 15.5298 3.55C15.8198 3.84 15.8198 4.32 15.5298 4.61L9.00979 11.13C8.52979 11.61 8.52979 12.39 9.00979 12.87L15.5298 19.39C15.8198 19.68 15.8198 20.16 15.5298 20.45C15.3798 20.59 15.1898 20.67 14.9998 20.67Z"
        fill={color}
      />
    </Svg>
  );
};

ArrowIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

ArrowIcon.defaultProps = {
  color: COLORS.grey[100],
  width: 24,
  height: 24,
};

export default ArrowIcon;
