import { StyleSheet, TextInput, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SearchIcon } from "icons";
import { COLORS } from "utils";
import FilterButton from "./FilterButton";
import TaskList from "./TaskList";
import { ProjectService } from "services";
import { ApiConstant } from "const";
import { LoadingSpinner } from "components";

const TaskTab = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await ProjectService.getTasksOfProject(projectId);

      if (response.status === ApiConstant.STT_OK) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    handleGetTasks();
  }, [handleGetTasks]);

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

      <TaskList data={tasks} />

      <LoadingSpinner isVisible={isLoading} />
    </View>
  );
};

TaskTab.propTypes = {
  projectId: PropTypes.number.isRequired,
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
