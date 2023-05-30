import { RefreshControl, ScrollView } from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import ProjectProgressChart from "./ProgressChart";
import Detail from "./Detail";
import { useSelector } from "react-redux";
import { ProjectService } from "services";
import { ApiConstant } from "const";

const OverviewTab = () => {
  const project = useSelector(({ projectRedux }) => projectRedux.project);

  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleGetTasks = useCallback(async () => {
    if (project._id) {
      setIsLoading(true);

      try {
        const response = await ProjectService.getTasksOfProject(project._id);

        if (response.status === ApiConstant.STT_OK) {
          setTasks(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [project._id]);

  useEffect(() => {
    handleGetTasks();
  }, [handleGetTasks]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleGetTasks} />
      }
    >
      <ProjectProgressChart data={tasks} />
      <Detail data={tasks} />
    </ScrollView>
  );
};

export default memo(OverviewTab);
