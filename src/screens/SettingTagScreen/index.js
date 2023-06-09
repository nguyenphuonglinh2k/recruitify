import { ScrollView, StyleSheet, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MainLayout } from "layouts";
import {
  CommonIconButton,
  ConfirmDeleteModal,
  LoadingSpinner,
  SearchBox,
} from "components";
import TagItem from "./TagItem";
import { COLORS } from "utils";
import { PlusIcon } from "icons";
import { TagService } from "services";
import { ApiConstant, AppConstant } from "const";
import EditTagModal from "./EditTagModal";
import AddTagModal from "./AddTagModal";
import { useToast } from "react-native-toast-notifications";
import { debounce } from "utils/time.utils";

const SettingTagScreen = () => {
  const toast = useToast();

  const [tags, setTags] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedTag, setSelectedTag] = useState({});

  const [isVisibleConfirmModal, setIsVisibleConfirmModal] = useState(false);
  const [isVisibleEditModal, setIsVisibleEditModal] = useState(false);
  const [isVisibleAddModal, setIsVisibleAddModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Confirm modal
  const handleCloseConfirmModal = useCallback(() => {
    setIsVisibleConfirmModal(false);
  }, []);

  const handleOpenConfirmModal = useCallback(tag => {
    setSelectedTag(tag);
    setIsVisibleConfirmModal(true);
  }, []);

  // Edit modal
  const handleOpenEditModal = useCallback(tag => {
    setSelectedTag(tag);
    setIsVisibleEditModal(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setIsVisibleEditModal(false);
  }, []);

  const handleChangeSearchText = text => {
    setSearchText(text);
    handleFilterTags(text);
  };

  const handleFilterTags = debounce(text => {
    const data = tags.filter(item =>
      item.name?.toLowerCase()?.includes(text?.toLowerCase()),
    );

    setSearchTags(data);
  }, AppConstant.TYPING_WAIT_TIME);

  const handleChangeSelectedTag = useCallback(
    newValue => {
      setSelectedTag({
        ...selectedTag,
        name: newValue,
      });
    },
    [selectedTag],
  );

  const handleSaveTagChange = useCallback(async () => {
    const index = tags.findIndex(tag => tag._id === selectedTag._id);

    const newTags = [
      ...tags.slice(0, index),
      selectedTag,
      ...tags.slice(index + 1),
    ];

    setIsLoading(true);

    try {
      const response = await TagService.putTag(selectedTag._id, {
        name: selectedTag.name,
      });

      if (response.status === ApiConstant.STT_OK) {
        toast.show("Update successfully", { type: "success" });

        const data = newTags.filter(item =>
          item.name?.toLowerCase()?.includes(searchText?.toLowerCase()),
        );

        setSearchTags(data);
        setTags(newTags);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      handleCloseEditModal();
    }
  }, [handleCloseEditModal, searchText, selectedTag, tags, toast]);

  const handleDeleteTag = useCallback(async () => {
    setIsLoading(true);

    const index = tags.findIndex(tag => tag._id === selectedTag._id);
    const newTags = [...tags.slice(0, index), ...tags.slice(index + 1)];

    try {
      const response = await TagService.deleteTag(selectedTag._id);

      if (response.status === ApiConstant.STT_OK) {
        toast.show("Delete successfully", { type: "success" });

        const data = newTags.filter(item =>
          item.name?.toLowerCase()?.includes(searchText?.toLowerCase()),
        );

        setSearchTags(data);
        setTags(newTags);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      handleCloseConfirmModal();
    }
  }, [tags, selectedTag._id, toast, searchText, handleCloseConfirmModal]);

  const handleGetTags = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await TagService.getTags();

      if (response.status === ApiConstant.STT_OK) {
        setTags(response.data);
        setSearchTags(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetTags();
  }, [handleGetTags]);

  return (
    <MainLayout
      isBackScreen
      headerProps={{
        title: "Tag setting",
        headerRight: (
          <CommonIconButton onPress={() => setIsVisibleAddModal(true)}>
            <PlusIcon color={COLORS.green} />
          </CommonIconButton>
        ),
      }}
    >
      <SearchBox
        onChangeText={handleChangeSearchText}
        value={searchText}
        style={styles.searchBox}
      />

      <ScrollView style={styles.body}>
        {searchTags.length ? (
          searchTags.map((tag, index) => (
            <TagItem
              key={index}
              label={tag.name}
              style={styles.item}
              onDelete={() => handleOpenConfirmModal(tag)}
              onPress={() => handleOpenEditModal(tag)}
            />
          ))
        ) : (
          <Text style={styles.desc}>No tag found!</Text>
        )}
      </ScrollView>

      <ConfirmDeleteModal
        isVisible={isVisibleConfirmModal}
        title={selectedTag.name}
        onCancel={handleCloseConfirmModal}
        onOK={handleDeleteTag}
        description="Do you really want to delete this tag?"
      />
      <EditTagModal
        isVisible={isVisibleEditModal}
        onCloseModal={handleCloseEditModal}
        value={selectedTag.name}
        onChangeText={newValue => handleChangeSelectedTag(newValue)}
        onSave={handleSaveTagChange}
      />
      <AddTagModal
        isVisible={isVisibleAddModal}
        onCloseModal={() => setIsVisibleAddModal(false)}
        onRefetchData={handleGetTags}
        setIsLoading={setIsLoading}
      />

      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
};

export default SettingTagScreen;

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
  },
  searchBox: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  body: {
    borderTopWidth: 1,
    borderColor: COLORS.grey[100],
    padding: 16,
  },
  desc: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
  },
  addTagButton: {
    margin: 16,
    width: 200,
    alignSelf: "center",
    backgroundColor: COLORS.grey[600],
  },
});
