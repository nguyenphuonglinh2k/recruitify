import React from "react";
import Svg, { Path } from "react-native-svg";
import PropTypes from "prop-types";

const HomeIcon = ({ height, width, color, ...otherProps }) => {
  return (
    <Svg height={height} width={width} {...otherProps}>
      <Path
        d="M17.79 22.75H6.21C3.47 22.75 1.25 20.52 1.25 17.78V10.37C1.25 9.01 2.09 7.3 3.17 6.46L8.56 2.26C10.18 1 12.77 0.940005 14.45 2.12L20.63 6.45C21.82 7.28 22.75 9.06001 22.75 10.51V17.79C22.75 20.52 20.53 22.75 17.79 22.75ZM9.48 3.44L4.09 7.64C3.38 8.2 2.75 9.47001 2.75 10.37V17.78C2.75 19.69 4.3 21.25 6.21 21.25H17.79C19.7 21.25 21.25 19.7 21.25 17.79V10.51C21.25 9.55 20.56 8.22 19.77 7.68L13.59 3.35C12.45 2.55 10.57 2.59 9.48 3.44Z"
        fill={color}
      />
      <Path
        d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18C12.75 18.41 12.41 18.75 12 18.75Z"
        fill={color}
      />
    </Svg>
  );
};

HomeIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

HomeIcon.defaultProps = {
  color: "#A19FA8",
  width: 24,
  height: 24,
};

export default HomeIcon;
