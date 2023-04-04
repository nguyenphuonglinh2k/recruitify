import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { SearchIcon } from "icons";
import { COLORS } from "utils";
import FilterButton from "./FilterButton";
import TaskList from "./TaskList";

const TaskTab = () => {
  return (
    <View style={styles.container}>
      <View style={styles.filterBox}>
        <FilterButton
          label={"All member"}
          style={{ flex: 1, marginRight: 4 }}
        />
        <FilterButton label={"All status"} style={{ flex: 1, marginLeft: 4 }} />
      </View>

      <View style={styles.searchBox}>
        <SearchIcon />
        <TextInput style={styles.input} placeholder="Search..." />
      </View>

      <TaskList />
    </View>
  );
};

export default TaskTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  filterBox: {
    flexDirection: "row",
    margin: 16,
  },

  searchBox: {
    height: 40,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.grey[200],
    borderRadius: 4,
    marginHorizontal: 16,
  },
  input: {
    marginLeft: 5,
    flex: 1,
  },
});
