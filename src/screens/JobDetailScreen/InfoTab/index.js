import { ScrollView, StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import React from "react";
import { COLORS } from "utils";
import Details from "./Details";
import Locations from "./Locations";
import Tags from "./Tags";

const InfoTab = ({ style }) => {
  return (
    <ScrollView style={[styles.root, style]}>
      <Details />

      <View>
        <Text style={styles.label}>Descriptions</Text>
        <Text style={styles.content}>{MOCK_DESCRIPTION}</Text>
      </View>

      <Locations />
      <Tags />
    </ScrollView>
  );
};

const MOCK_DESCRIPTION =
  "The Projects module contains all the tools needed to comprehensively conduct recruitment projects. At every stage, your work is supported by recruitment automation. Sounds interesting? Get in touch with us and start with Recruitify.";

InfoTab.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default InfoTab;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 16,
  },
  label: {
    color: COLORS.black,
    fontWeight: "600",
    fontSize: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.grey[500],
    paddingHorizontal: 16,
  },
  content: {
    color: COLORS.black,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[200],
    fontSize: 16,
  },
});
