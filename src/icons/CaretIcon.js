import React from "react";
import Svg, { Path } from "react-native-svg";
import PropTypes from "prop-types";
import { COLORS } from "utils";
import { memo } from "react";

const CaretIcon = ({ height, width, color, ...otherProps }) => {
  return (
    <Svg height={height} width={width} {...otherProps}>
      <Path
        d="M8.93698 14.5117C9.52292 15.1628 10.4745 15.1628 11.0604 14.5117L17.0604 7.84505C17.4917 7.36589 17.6182 6.65234 17.3839 6.02734C17.1495 5.40234 16.6057 4.99609 15.9964 4.99609L3.99635 4.99609C3.39167 4.99609 2.84323 5.40234 2.60885 6.02734C2.37448 6.65234 2.50573 7.36589 2.93229 7.84505L8.93229 14.5117H8.93698Z"
        fill={color}
      />
    </Svg>
  );
};

CaretIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

CaretIcon.defaultProps = {
  color: COLORS.grey[400],
  width: 20,
  height: 20,
};

export default memo(CaretIcon);
