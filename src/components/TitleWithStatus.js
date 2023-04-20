import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import React from "react";
import HeaderTitle from "layouts/MainLayout/HeaderTitle";
import { COLORS } from "utils";
import { JOB_AND_APPLICATION_STATUS } from "const/app.const";

const TitleWithStatus = ({
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

TitleWithStatus.propTypes = {
  status: PropTypes.oneOf(Object.values(JOB_AND_APPLICATION_STATUS)),
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default TitleWithStatus;

const onGetJobStatusColor = status => {
  if (status === JOB_AND_APPLICATION_STATUS.active) {
    return COLORS.green;
  } else if (status === JOB_AND_APPLICATION_STATUS.closed) {
    return COLORS.yellow;
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
