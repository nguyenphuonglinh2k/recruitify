import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import PropTypes from "prop-types";
import { COLORS } from "utils";

const CircleXMarkIcon = ({ height, width, color, ...otherProps }) => {
  return (
    <Svg height={height} width={width} {...otherProps}>
      <G clip-path="url(#clip0_286_10)">
        <Path
          d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM5.46875 5.46875C5.7625 5.175 6.2375 5.175 6.52812 5.46875L7.99687 6.9375L9.46562 5.46875C9.75937 5.175 10.2344 5.175 10.525 5.46875C10.8156 5.7625 10.8187 6.2375 10.525 6.52812L9.05625 7.99687L10.525 9.46562C10.8187 9.75937 10.8187 10.2344 10.525 10.525C10.2312 10.8156 9.75625 10.8187 9.46562 10.525L7.99687 9.05625L6.52812 10.525C6.23437 10.8187 5.75938 10.8187 5.46875 10.525C5.17812 10.2312 5.175 9.75625 5.46875 9.46562L6.9375 7.99687L5.46875 6.52812C5.175 6.23437 5.175 5.75938 5.46875 5.46875Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_286_10">
          <Rect width={width} height={height} fill="transparent" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

CircleXMarkIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

CircleXMarkIcon.defaultProps = {
  color: COLORS.grey[600],
  width: 16,
  height: 16,
};

export default CircleXMarkIcon;
