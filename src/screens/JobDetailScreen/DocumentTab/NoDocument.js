import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ImageSource } from "assets";
import { COLORS } from "utils";

const NoDocument = () => {
  return (
    <View>
      <Image source={ImageSource.NotFoundImage} style={styles.image} />
      <Text style={styles.title}>There is no documents!</Text>
    </View>
  );
};

export default NoDocument;

const styles = StyleSheet.create({
  root: {},
  image: {
    width: "100%",
    height: 250,
  },
  title: {
    color: COLORS.black,
    fontWeight: "600",
    marginTop: 10,
    textAlign: "center",
  },
});
