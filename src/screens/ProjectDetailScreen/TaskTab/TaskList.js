import React, { memo, useCallback, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ConfirmDeleteModal } from "components";
import TaskItem from "./TaskItem";
import { ProjectService } from "services";
import { ApiConstant, PathConstant } from "const";
import { useToast } from "react-native-toast-notifications";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";

const TaskList = ({ data, setIsLoading, onRefetchData, ...otherProps }) => {
  const toast = useToast();
  const navigation = useNavigation();

  const PROJECT = useSelector(({ projectRedux }) => projectRedux.project);

  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const handleOpenModal = useCallback(item => {
    setSelectedItem(item);
    setIsVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleDeleteTask = useCallback(async () => {
    if (setIsLoading) setIsLoading(true);

    try {
      const response = await ProjectService.deleteTaskOutOfProject({
        taskId: selectedItem._id,
        projectId: PROJECT._id,
      });

      if (response.status === ApiConstant.STT_OK) {
        toast.show("Delete successfully", { type: "success" });

        if (onRefetchData) onRefetchData();
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (setIsLoading) setIsLoading(false);
      handleCloseModal();
    }
  }, [
    PROJECT._id,
    selectedItem._id,
    setIsLoading,
    toast,
    onRefetchData,
    handleCloseModal,
  ]);

  const handleNavigateToDetail = useCallback(
    item => {
      navigation.navigate(PathConstant.TAB_NAME.task, {
        screen: PathConstant.SCREEN_NAME.taskDetailScreen,
        params: { task: item },
      });
    },
    [navigation],
  );

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TaskItem
            data={item}
            style={styles.item}
            onPressTrash={() => handleOpenModal(item)}
            onPressDetail={() => handleNavigateToDetail(item)}
          />
        )}
        keyExtractor={(_, index) => index}
        style={styles.root}
        {...otherProps}
      />
      <ConfirmDeleteModal
        title={selectedItem.name}
        isVisible={isVisible}
        onCancel={handleCloseModal}
        onOK={handleDeleteTask}
        description="Do you really want to remove this task out of this project?"
      />
    </>
  );
};

export default memo(TaskList);

TaskList.propTypes = {
  data: PropTypes.array,
  setIsLoading: PropTypes.func,
  onRefetchData: PropTypes.func,
};

const styles = StyleSheet.create({
  root: {
    margin: 16,
  },
  item: {
    marginBottom: 10,
  },
});
