import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { COLORS } from "utils";
import PropTypes from "prop-types";

const CommonCheckbox = props => {
  return (
    <BouncyCheckbox
      size={20}
      fillColor={COLORS.green}
      innerIconStyle={{
        borderRadius: 6,
      }}
      iconStyle={{ borderRadius: 6 }}
      disableBuiltInState
      {...props}
    />
  );
};

export default CommonCheckbox;

CommonCheckbox.propTypes = {
  isChecked: PropTypes.bool,
  onPress: PropTypes.func,
  textComponent: PropTypes.element,
};
