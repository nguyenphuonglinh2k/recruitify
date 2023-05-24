import { StyleSheet, TextInput, View } from "react-native";
import React, { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import {
  CommonButton,
  CommonDeleteChip,
  CommonIconButton,
  CommonModal,
} from "components";
import { COLORS } from "utils";
import { PlusIcon } from "icons";
import { TagService } from "services";
import { ApiConstant } from "const";
import { useToast } from "react-native-toast-notifications";

const AddTagModal = ({
  isVisible,
  onCloseModal,
  onRefetchData,
  setIsLoading,
  ...otherProps
}) => {
  const toast = useToast();

  const [tags, setTags] = useState([]);
  const [value, onChangeValue] = useState("");

  const handleDeleteTag = useCallback(
    index => {
      const newTag = [...tags.slice(0, index), ...tags.slice(index + 1)];

      setTags(newTag);
    },
    [tags],
  );

  const handleAddNewTag = useCallback(() => {
    if (value.trim()) {
      setTags([...tags, { name: value.trim() }]);
      onChangeValue("");
    }
  }, [tags, value]);

  const handleCreateNewTag = useCallback(async () => {
    if (setIsLoading) setIsLoading(true);

    try {
      const response = await TagService.postTags({ tags });

      if (response.status === ApiConstant.STT_CREATED) {
        toast.show("Create successfully", { type: "success" });
        if (onRefetchData) onRefetchData();
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (setIsLoading) setIsLoading(false);
      if (onCloseModal) onCloseModal();
      setTags([]);
    }
  }, [onCloseModal, onRefetchData, setIsLoading, tags, toast]);

  return (
    <CommonModal
      visible={isVisible}
      onCloseModal={onCloseModal}
      {...otherProps}
    >
      <View style={styles.root}>
        <View style={styles.inputWrapper}>
          <TextInput
            value={value}
            onChangeText={onChangeValue}
            style={styles.input}
          />

          <CommonIconButton style={styles.addButton} onPress={handleAddNewTag}>
            <PlusIcon />
          </CommonIconButton>
        </View>
        <View style={styles.list}>
          {tags?.map((item, index) => (
            <CommonDeleteChip
              key={index}
              label={item.name}
              onPress={() => handleDeleteTag(index)}
              style={index !== 0 ? styles.item : {}}
            />
          ))}
        </View>
      </View>
      <CommonButton
        label="Save"
        style={styles.button}
        onPress={handleCreateNewTag}
        disabled={!tags.length}
      />
    </CommonModal>
  );
};

AddTagModal.propTypes = {
  isVisible: PropTypes.bool,
  onRefetchData: PropTypes.func,
  setIsLoading: PropTypes.func,
  onCloseModal: PropTypes.func,
};

export default memo(AddTagModal);

const styles = StyleSheet.create({
  root: {
    padding: 16,
    width: 300,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: COLORS.grey[600],
    height: "100%",
    padding: 10,
    borderRadius: 8,
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 10,
    borderRadius: 6,
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    marginTop: 10,
    flexWrap: "wrap",
  },
  item: {
    marginLeft: 8,
    marginBottom: 8,
  },
});
