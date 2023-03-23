import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import PropTypes from "prop-types";
import { COLORS } from "utils";

const StarIcon = ({ height, width, color, ...otherProps }) => {
  return (
    <Svg height={height} width={width} {...otherProps}>
      <G clipPath="url(#clip0_69_42)">
        <Path
          d="M12.104 0.703125C11.9016 0.273438 11.4738 0 11.004 0C10.5342 0 10.1103 0.273438 9.90403 0.703125L7.44813 5.87109L1.96341 6.69922C1.50507 6.76953 1.12313 7.09766 0.981811 7.54687C0.840491 7.99609 0.955075 8.49219 1.28355 8.82422L5.26341 12.8516L4.32382 18.543C4.24744 19.0117 4.43841 19.4883 4.81653 19.7656C5.19466 20.043 5.69501 20.0781 6.10751 19.8555L11.0079 17.1797L15.9082 19.8555C16.3207 20.0781 16.821 20.0469 17.1992 19.7656C17.5773 19.4844 17.7683 19.0117 17.6919 18.543L16.7485 12.8516L20.7283 8.82422C21.0568 8.49219 21.1752 7.99609 21.0301 7.54687C20.8849 7.09766 20.5068 6.76953 20.0485 6.69922L14.5599 5.87109L12.104 0.703125Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_69_42">
          <Rect width={width} height={height} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

StarIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

StarIcon.defaultProps = {
  color: COLORS.yellow,
  width: 22,
  height: 20,
};

export default StarIcon;
