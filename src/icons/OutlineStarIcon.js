import React from "react";
import Svg, { Path } from "react-native-svg";
import PropTypes from "prop-types";
import { COLORS } from "utils";

const OutlineStarIcon = ({ height, width, color, ...otherProps }) => {
  return (
    <Svg height={height} width={width} {...otherProps}>
      <Path
        d="M11.2461 0C11.6055 0 11.9336 0.205078 12.0899 0.528125L14.7695 6.04688L20.7578 6.93359C21.1094 6.98438 21.3985 7.23047 21.5117 7.56641C21.6211 7.90625 21.5313 8.27734 21.2813 8.52344L16.9375 12.8281L17.9649 18.9023C18.0235 19.2539 17.8789 19.6133 17.586 19.8203C17.2969 20.0273 16.8789 20.0547 16.5977 19.8867L11.2461 17.0273L5.8633 19.8867C5.58205 20.0547 5.19923 20.0273 4.90626 19.8203C4.6172 19.6133 4.47267 19.2539 4.49611 18.9023L5.5547 12.8281L1.21525 8.52344C0.962905 8.27734 0.873452 7.90625 0.98439 7.56641C1.09494 7.23047 1.38673 6.98438 1.73791 6.93359L7.72267 6.04688L10.4024 0.528125C10.5625 0.205039 10.8867 0 11.2461 0ZM11.2461 3.08398L9.19533 7.3125C9.05861 7.58984 8.79298 7.78516 8.4883 7.83203L3.86642 8.51172L7.22267 11.8359C7.43752 12.0508 7.53517 12.3594 7.48439 12.6602L6.69533 17.332L10.8047 15.1367C11.082 14.9883 11.4141 14.9883 11.6875 15.1367L15.7969 17.332L15.0078 12.6602C14.957 12.3594 15.0586 12.0508 15.2735 11.8359L18.6289 8.51172L14.0078 7.83203C13.6992 7.78516 13.4336 7.58984 13.3008 7.3125L11.2461 3.08398Z"
        fill={color}
      />
    </Svg>
  );
};

OutlineStarIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

OutlineStarIcon.defaultProps = {
  color: COLORS.yellow,
  width: 23,
  height: 20,
};

export default OutlineStarIcon;
