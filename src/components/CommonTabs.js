import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import CommonTab from "./CommonTab";

const CommonTabs = ({ value, setValue, data }) => {
  const onChange = newValue => {
    if (setValue) {
      setValue(newValue);
    }
  };

  return (
    <View style={styles.wrapper}>
      {data.map(({ label, tabValue }) => (
        <CommonTab
          key={tabValue}
          label={label}
          isSelected={value === tabValue}
          onPress={() => onChange(tabValue)}
        />
      ))}
    </View>
  );
};

export default memo(CommonTabs);

CommonTabs.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  setValue: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      tabValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  ).isRequired,
};

CommonTabs.defaultProps = {
  data: [],
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
