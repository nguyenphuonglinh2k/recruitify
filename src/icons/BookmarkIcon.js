import React from "react";
import Svg, { Path } from "react-native-svg";
import PropTypes from "prop-types";
import { COLORS } from "utils";

const BookmarkIcon = ({ height, width, color, ...otherProps }) => {
  return (
    <Svg height={height} width={width} fill="none" {...otherProps}>
      <Path
        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17 2.44V12.42C17 14.39 15.59 15.16 13.86 14.12L12.54 13.33C12.24 13.15 11.76 13.15 11.46 13.33L10.14 14.12C8.41 15.15 7 14.39 7 12.42V2.44"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17 2.44V12.42C17 14.39 15.59 15.16 13.86 14.12L12.54 13.33C12.24 13.15 11.76 13.15 11.46 13.33L10.14 14.12C8.41 15.15 7 14.39 7 12.42V2.44"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

BookmarkIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

BookmarkIcon.defaultProps = {
  color: COLORS.grey[100],
  width: 24,
  height: 24,
};

export default BookmarkIcon;
