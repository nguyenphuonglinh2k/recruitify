import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import FilterButton from "./FilterButton";
import TaskList from "./TaskList";
import { ProjectService } from "services";
import { ApiConstant } from "const";
import {
  EmptyData,
  LoadingSpinner,
  SearchBox,
  StatusOptionsModal,
} from "components";
import { useIsFocused } from "@react-navigation/core";
import { PROGRESS_STATUS } from "const/app.const";
import { onGetProjectAndTaskStatusLabel } from "utils/label.utils";
import { useSelector } from "react-redux";

const TaskTab = ({ projectId }) => {
  const isFocused = useIsFocused();

  const MEMBERS = useSelector(
    ({ projectRedux }) => projectRedux.project.memberIds,
  );

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const CONVERTED_MEMBERS = useMemo(() => {
    const members = MEMBERS.map(member => ({
      label: member.name,
      value: member._id,
    }));

    return [
      {
        label: "All member",
        value: DEFAULT_FILTERS[FILTER_KEYS.member],
      },
      ...members,
    ];
  }, [MEMBERS]);

  const isSelectedMember = useMemo(
    () => filters.selected === FILTER_KEYS.member,
    [filters.selected],
  );

  const handleGetUsername = useCallback(() => {
    const user = CONVERTED_MEMBERS.find(mem => mem.value === filters.member);
    return user.label;
  }, [CONVERTED_MEMBERS, filters.member]);

  const handleGetStatus = useCallback(() => {
    const status = STATUS_DATA.find(item => item.value === filters.status);

    return status.label;
  }, [filters.status]);

  const handleOpenModal = useCallback(
    type => {
      setFilters({ ...filters, selected: type });
      setIsVisibleModal(true);
    },
    [filters],
  );

  const handleChangeFilter = useCallback(
    newValue => {
      setFilters({
        ...filters,
        ...(isSelectedMember ? { member: newValue } : { status: newValue }),
      });
    },
    [filters, isSelectedMember],
  );

  const handleGetTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await ProjectService.getTasksOfProject(projectId, {
        params: {
          status: filters.status,
          memberId: filters.member,
        },
      });

      if (response.status === ApiConstant.STT_OK) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [filters.member, filters.status, projectId]);

  useEffect(() => {
    if (isFocused) handleGetTasks();
  }, [handleGetTasks, isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.filterBox}>
        <FilterButton
          label={handleGetUsername()}
          style={{ flex: 1, marginRight: 4 }}
          onPress={() => handleOpenModal(FILTER_KEYS.member)}
        />
        <FilterButton
          label={handleGetStatus()}
          style={{ flex: 1, marginLeft: 4 }}
          onPress={() => handleOpenModal(FILTER_KEYS.status)}
        />
      </View>

      <SearchBox style={{ margin: 16, marginTop: 0 }} />

      {tasks.length ? (
        <TaskList
          data={tasks}
          setIsLoading={setIsLoading}
          onRefetchData={handleGetTasks}
        />
      ) : (
        <EmptyData description="No tasks found" />
      )}

      <StatusOptionsModal
        data={isSelectedMember ? CONVERTED_MEMBERS : STATUS_DATA}
        isVisible={isVisibleModal}
        onCloseModal={() => setIsVisibleModal(false)}
        value={isSelectedMember ? filters.member : filters.status}
        setValue={handleChangeFilter}
      />

      <LoadingSpinner isVisible={isLoading} />
    </View>
  );
};

const FILTER_KEYS = {
  member: "member",
  status: "status",
};

const DEFAULT_FILTERS = {
  [FILTER_KEYS.member]: null,
  [FILTER_KEYS.status]: null,
  selected: null, // FILTER_KEYS.member or FILTER_KEYS.status
};

const STATUS_DATA = [
  {
    value: DEFAULT_FILTERS[FILTER_KEYS.status],
    label: "All status",
  },
  {
    value: PROGRESS_STATUS.new,
    label: onGetProjectAndTaskStatusLabel(PROGRESS_STATUS.new),
  },
  {
    value: PROGRESS_STATUS.doing,
    label: onGetProjectAndTaskStatusLabel(PROGRESS_STATUS.doing),
  },
  {
    value: PROGRESS_STATUS.done,
    label: onGetProjectAndTaskStatusLabel(PROGRESS_STATUS.done),
  },
];

TaskTab.propTypes = {
  projectId: PropTypes.string.isRequired,
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
});
