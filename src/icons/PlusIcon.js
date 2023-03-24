import React from "react";
import Svg, { Path } from "react-native-svg";
import PropTypes from "prop-types";
import { COLORS } from "utils";

const PlusIcon = ({ height, width, color, ...otherProps }) => {
  return (
    <Svg height={height} width={width} {...otherProps}>
      <Path
        d="M18 11.4294H2C0.906667 11.4294 0 10.7818 0 10.0008C0 9.21988 0.906667 8.57227 2 8.57227H18C19.0933 8.57227 20 9.21988 20 10.0008C20 10.7818 19.0933 11.4294 18 11.4294Z"
        fill={color}
      />
      <Path
        d="M9.99937 20C9.21842 20 8.5708 19.0933 8.5708 18V2C8.5708 0.906667 9.21842 0 9.99937 0C10.7803 0 11.4279 0.906667 11.4279 2V18C11.4279 19.0933 10.7803 20 9.99937 20Z"
        fill={color}
      />
    </Svg>
  );
};

PlusIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

PlusIcon.defaultProps = {
  color: COLORS.white,
  width: 20,
  height: 20,
};

export default PlusIcon;
