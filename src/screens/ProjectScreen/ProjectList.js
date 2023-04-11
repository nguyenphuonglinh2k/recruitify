import { FlatList, StyleSheet } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import ProjectItem from "./ProjectItem";

const ProjectList = ({ data, ...otherProps }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ProjectItem data={item} style={styles.item} />}
      keyExtractor={(_, index) => index}
      {...otherProps}
    />
  );
};

export default ProjectList;

ProjectList.propTypes = {
  data: PropTypes.array,
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
  },
});
