import { StyleSheet, View } from "react-native";
import React from "react";
import { CommonButton, CommonModal } from "components";
import PropTypes from "prop-types";
import { PlusIcon, TaskIcon } from "icons";
import { COLORS } from "utils";
import { SCREEN_NAME } from "const/path.const";
import { useNavigation } from "@react-navigation/core";

const TaskAdditionOptionsModal = ({
  isVisible,
  onCloseModal,
  ...otherProps
}) => {
  const navigation = useNavigation();

  const onNavigateToAddTaskScreen = () => {
    navigation.navigate(SCREEN_NAME.projectTaskCreationScreen);
  };

  const handleNavigateToAddExistTask = () => {
    navigation.navigate(SCREEN_NAME.projectTaskEditingScreen);
  };

  return (
    <CommonModal
      visible={isVisible}
      onCloseModal={onCloseModal}
      {...otherProps}
    >
      <View style={{ padding: 10 }}>
        <CommonButton
          onPress={handleNavigateToAddExistTask}
          label="Add existing task"
          startAdornment={<TaskIcon style={{ marginRight: 6 }} color="white" />}
          color={COLORS.orange.dark}
          style={[styles.button, { marginBottom: 6 }]}
        />
        <CommonButton
          onPress={onNavigateToAddTaskScreen}
          label="Create new task"
          startAdornment={<PlusIcon style={{ marginRight: 6 }} />}
          style={styles.button}
        />
      </View>
    </CommonModal>
  );
};

TaskAdditionOptionsModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default TaskAdditionOptionsModal;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
  },
});
