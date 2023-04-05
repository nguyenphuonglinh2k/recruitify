import React, { memo } from "react";
import Svg, { Path } from "react-native-svg";
import PropTypes from "prop-types";
import { COLORS } from "utils";

const PencilIcon = ({ height, width, color, ...otherProps }) => {
  return (
    <Svg height={height} width={width} {...otherProps}>
      <Path
        d="M9.08573 2.91356L13.0862 6.91425L4.39929 15.6016L0.832505 15.9953C0.355018 16.0482 -0.0484094 15.6444 0.00471426 15.1669L0.401579 11.5975L9.08573 2.91356ZM15.5606 2.31793L13.6822 0.43946C13.0962 -0.146487 12.146 -0.146487 11.56 0.43946L9.7929 2.20668L13.7934 6.20737L15.5606 4.44015C16.1465 3.85389 16.1465 2.90388 15.5606 2.31793Z"
        fill={color}
      />
    </Svg>
  );
};

PencilIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

PencilIcon.defaultProps = {
  color: COLORS.green,
  width: 16,
  height: 16,
};

export default memo(PencilIcon);
