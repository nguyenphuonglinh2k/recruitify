import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { EmptyData } from "components";

const DocumentTab = ({ style }) => {
  return (
    <ScrollView style={[styles.root, style]}>
      <EmptyData description="There is no documents!" />
    </ScrollView>
  );
};

DocumentTab.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default DocumentTab;

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
});
