import React, { isValidElement } from "react";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ArrowIcon } from "icons";
import { COLORS } from "utils";
import HeaderTitle from "./HeaderTitle";

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
        <TouchableOpacity onPress={onGoBack} style={{ paddingRight: 10 }}>
          <ArrowIcon color={COLORS.green} />
        </TouchableOpacity>
        {isValidElement(title)
          ? title
          : Boolean(title) && (
              <HeaderTitle
                title={title}
                style={[styles.title, titleStyle]}
                {...otherTitleProps}
              />
            )}
      </View>

      {headerRight}
    </View>
  );
};

HeaderBackButton.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  headerRight: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  titleProps: PropTypes.shape({
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
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
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: COLORS.black,
    fontWeight: "600",
    fontSize: 16,
  },
});

export default HeaderBackButton;
