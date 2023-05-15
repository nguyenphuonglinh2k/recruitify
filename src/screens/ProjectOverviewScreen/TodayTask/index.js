import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS } from "utils";
import PropTypes from "prop-types";
import TaskItem from "./TaskItem";
import { TaskService } from "services";
import { PROGRESS_STATUS } from "const/app.const";
import { ApiConstant } from "const";
import { EmptyData, LoadingSpinner } from "components";
import { useIsFocused } from "@react-navigation/core";

const TodayTask = ({ userId, style }) => {
  const isFocused = useIsFocused();

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetTasks = useCallback(async () => {
    setIsLoading(true);

    try {
      const getTasksNewPromise = TaskService.getTodayTasks(userId, {
        params: { status: PROGRESS_STATUS.new },
      });

      const getTasksDoingPromise = TaskService.getTodayTasks(userId, {
        params: { status: PROGRESS_STATUS.doing },
      });

      const responses = await Promise.all([
        getTasksNewPromise,
        getTasksDoingPromise,
      ]);

      const hasAllSuccessStatus = responses.every(
        res => res.status === ApiConstant.STT_OK,
      );

      if (hasAllSuccessStatus) {
        const [taskNewResponseData, taskDoingResponseData] = [
          responses[0].data,
          responses[1].data,
        ];

        setTasks([...taskNewResponseData, ...taskDoingResponseData]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, userId]);

  useEffect(() => {
    if (isFocused) handleGetTasks();
  }, [handleGetTasks, isFocused]);

  return (
    <View style={[styles.root, style]}>
      <Text style={styles.title}>Today Task</Text>
      {tasks.length ? (
        tasks.map((task, index) => (
          <TaskItem key={index} data={task} style={styles.item} />
        ))
      ) : (
        <EmptyData description="No today's tasks found!" />
      )}

      <LoadingSpinner isVisible={isLoading} />
    </View>
  );
};

TodayTask.propTypes = {
  userId: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setIsLoading: PropTypes.func,
};

export default TodayTask;

const styles = StyleSheet.create({
  root: {},
  title: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
  item: {
    marginBottom: 10,
  },
});