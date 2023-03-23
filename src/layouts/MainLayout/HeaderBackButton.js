import React from "react";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { ArrowIcon } from "icons";

const HeaderBackButton = ({
  title,
  titleProps,
  headerRight,
  style,
  ...otherProps
}) => {
  const navigation = useNavigation();

  const { style: titleStyle, ...otherTitleProps } = titleProps;

  const onGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.wrapper, style]} {...otherProps}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={onGoBack} style={{ paddingRight: 16 }}>
          <ArrowIcon />
        </TouchableOpacity>
        {Boolean(title) && (
          <Text style={[styles.title, titleStyle]} {...otherTitleProps}>
            {title}
          </Text>
        )}
      </View>

      {headerRight}
    </View>
  );
};

HeaderBackButton.propTypes = {
  title: PropTypes.string,
  headerRight: PropTypes.node,
  style: PropTypes.object,
  titleProps: PropTypes.shape({
    style: PropTypes.object,
  }),
};

HeaderBackButton.defaultProps = {
  titleProps: { style: {} },
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#C4C4C4",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default HeaderBackButton;
