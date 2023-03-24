import { ScrollView, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import React from "react";
import Creator from "./Creator";
import Assignees from "./Assignees";

const AssigneesTab = () => {
  return (
    <ScrollView style={styles.root}>
      <Creator />
      <Assignees />
    </ScrollView>
  );
};

AssigneesTab.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default AssigneesTab;

const styles = StyleSheet.create({
  root: {
    paddingVertical: 16,
  },
});
