import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { MainLayout } from "layouts";
import ProjectStatistics from "./ProjectStatistics";
import TodayTask from "./TodayTask";
import TaskStatistics from "./TaskStatistics";
import { useSelector } from "react-redux";
import { PROGRESS_STATUS, USER_ROLE } from "const/app.const";
import { ProjectService, TaskService } from "services";
import { ApiConstant } from "const";
import { useEffect } from "react";

const ProjectOverviewScreen = () => {
  const AUTH_USER = useSelector(({ authRedux }) => authRedux.user); // TODO: filter by user

  const [isLoading, setIsLoading] = useState(false);
  const [projectStatistics, setProjectStatistics] = useState({});
  const [taskStatistics, setTaskStatistics] = useState(DEFAULT_TASK_STATISTICS);
  const [todayTasks, setTodayTasks] = useState([]);

  const canAccess = useMemo(() => {
    return [USER_ROLE.admin, USER_ROLE.manager].includes(AUTH_USER.role);
  }, [AUTH_USER.role]);

  const handleGetApi = useCallback(async () => {
    setIsLoading(true);

    try {
      // Promise
      const getProjectStatisticsPromise = ProjectService.getProjectStatistics();

      const getWeeklyTaskStatisticsPromise =
        TaskService.getWeeklyTaskStatistics(AUTH_USER._id);

      const getTasksNewPromise = TaskService.getTodayTasks(AUTH_USER._id, {
        params: { status: PROGRESS_STATUS.new },
      });

      const getTasksDoingPromise = TaskService.getTodayTasks(AUTH_USER._id, {
        params: { status: PROGRESS_STATUS.doing },
      });

      // Exe promise
      const responses = await Promise.all([
        getProjectStatisticsPromise,
        getWeeklyTaskStatisticsPromise,
        getTasksNewPromise,
        getTasksDoingPromise,
      ]);

      const hasAllSuccessStatus = responses.every(
        res => res.status === ApiConstant.STT_OK,
      );

      if (hasAllSuccessStatus) {
        const { monday, tuesday, wednesday, thursday, friday } =
          responses[1].data;
        const [taskNewResponseData, taskDoingResponseData] = [
          responses[2].data,
          responses[3].data,
        ];

        setProjectStatistics(responses[0].data);
        setTaskStatistics([monday, tuesday, wednesday, thursday, friday]);
        setTodayTasks([...taskNewResponseData, ...taskDoingResponseData]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [AUTH_USER._id]);

  useEffect(() => {
    handleGetApi();
  }, [handleGetApi]);

  return (
    <MainLayout>
      <ScrollView
        style={{ margin: 16 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleGetApi} />
        }
      >
        {canAccess && (
          <ProjectStatistics
            style={styles.bottomSpacing}
            data={projectStatistics}
          />
        )}

        <TaskStatistics style={styles.bottomSpacing} data={taskStatistics} />
        <TodayTask data={todayTasks} />
      </ScrollView>
    </MainLayout>
  );
};

const DEFAULT_TASK_STATISTICS = [0, 0, 0, 0, 0];

export default ProjectOverviewScreen;

const styles = StyleSheet.create({
  bottomSpacing: {
    marginBottom: 16,
  },
});
