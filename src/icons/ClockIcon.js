import React from "react";
import Svg, { Path } from "react-native-svg";
import PropTypes from "prop-types";
import { COLORS } from "utils";
import { memo } from "react";

const ClockIcon = ({ height, width, color, ...otherProps }) => {
  return (
    <Svg height={height} width={width} {...otherProps}>
      <Path
        d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
        fill={color}
      />
      <Path
        d="M15.7101 15.93C15.5801 15.93 15.4501 15.9 15.3301 15.82L12.2301 13.97C11.4601 13.51 10.8901 12.5 10.8901 11.61V7.51001C10.8901 7.10001 11.2301 6.76001 11.6401 6.76001C12.0501 6.76001 12.3901 7.10001 12.3901 7.51001V11.61C12.3901 11.97 12.6901 12.5 13.0001 12.68L16.1001 14.53C16.4601 14.74 16.5701 15.2 16.3601 15.56C16.2101 15.8 15.9601 15.93 15.7101 15.93Z"
        fill={color}
      />
    </Svg>
  );
};

ClockIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

ClockIcon.defaultProps = {
  color: COLORS.grey[100],
  width: 24,
  height: 24,
};

export default memo(ClockIcon);
