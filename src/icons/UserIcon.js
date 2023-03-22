import React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import PropTypes from "prop-types";

const UserIcon = ({ height, width, color, ...otherProps }) => {
  return (
    <Svg height={height} width={width} {...otherProps}>
      <Path
        opacity="0.4"
        d="M4 20.28C4 16.7012 6.9012 13.8 10.48 13.8H13.36C16.9388 13.8 19.84 16.7012 19.84 20.28V20.28C19.84 20.6776 19.5176 21 19.12 21H4.72C4.32236 21 4 20.6776 4 20.28V20.28Z"
        fill={color}
      />
      <Circle cx="11.56" cy="7.68" r="4.68" fill={color} />
    </Svg>
  );
};

UserIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

UserIcon.defaultProps = {
  color: "#A19FA8",
  width: 24,
  height: 24,
};

export default UserIcon;
