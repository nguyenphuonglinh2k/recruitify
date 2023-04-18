import React from "react";
import CommonChip from "./CommonChip";
import PropTypes from "prop-types";
import { CircleXMarkIcon } from "icons";

const CommonDeleteChip = ({ label, onPress, ...otherProps }) => {
  return (
    <CommonChip
      label={label}
      onPress={onPress}
      endAdornment={<CircleXMarkIcon style={{ marginLeft: 6 }} />}
      {...otherProps}
    />
  );
};

CommonDeleteChip.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
};

export default CommonDeleteChip;
