import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import React from "react";
import HeaderTitle from "layouts/MainLayout/HeaderTitle";
import { COLORS } from "utils";
import { JOB_STATUS } from "const/app.const";

const JobTitleWithStatus = ({
  status,
  title,
  style,
  titleStyle,
  ...otherProps
}) => {
  return (
    <View style={[styles.root, style]} {...otherProps}>
      <View style={styles.status(status)} />
      <HeaderTitle title={title} style={titleStyle} />
    </View>
  );
};

JobTitleWithStatus.propTypes = {
  status: PropTypes.oneOf(Object.values(JOB_STATUS)).isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default JobTitleWithStatus;

const onGetJobStatusColor = status => {
  if (status === JOB_STATUS.active) {
    return COLORS.green;
  } else if (status === JOB_STATUS.closed) {
    return COLORS.pink;
  }
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: status => ({
    height: 16,
    width: 16,
    backgroundColor: onGetJobStatusColor(status),
    marginRight: 8,
    borderRadius: 5,
  }),
});
