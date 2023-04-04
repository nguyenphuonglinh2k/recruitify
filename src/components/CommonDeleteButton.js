import React from "react";
import CommonButton from "./CommonButton";
import { COLORS } from "utils";
import { TrashIcon } from "icons";
import PropTypes from "prop-types";

const CommonDeleteButton = ({ style, ...otherProps }) => {
  return (
    <CommonButton
      label="Delete"
      color={COLORS.red}
      style={[{ borderRadius: 8 }, style]}
      startAdornment={<TrashIcon color="white" style={{ marginRight: 4 }} />}
      {...otherProps}
    />
  );
};

CommonDeleteButton.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default CommonDeleteButton;
