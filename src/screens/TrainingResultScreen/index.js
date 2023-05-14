import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { MainLayout } from "layouts";
import { FilterButton, StatusOptionsModal } from "components";
import UserItem from "./UserItem";
import { UserService } from "services";
import { RESULT_STATUS, USER_ROLE } from "const/app.const";
import { ApiConstant } from "const";
import { onGetResultStatusLabel } from "utils/label.utils";
import { useNavigation } from "@react-navigation/core";
import { SCREEN_NAME } from "const/path.const";

const TrainingResultScreen = () => {
  const navigation = useNavigation();

  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(DEFAULT_STATUS_VALUE);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const statusLabel = useMemo(() => {
    const statusObj = STATUS_DATA.find(item => item.value === status);

    return statusObj?.label;
  }, [status]);

  // TODO: get user's results (need useEffect?)
  const handleGetUsers = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await UserService.getUsers({
        params: {
          roles: [USER_ROLE.candidate],
        },
      });

      if (response.status === ApiConstant.STT_OK) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNavigateToDetail = useCallback(
    item => {
      navigation.navigate(SCREEN_NAME.trainingResultDetailScreen, {
        resultId: item._id,
      });
    },
    [navigation],
  );

  return (
    <MainLayout>
      <View style={styles.filterBox}>
        <FilterButton
          label={statusLabel}
          style={{ flex: 1, marginLeft: 4 }}
          onPress={() => setIsVisibleModal(true)}
        />
      </View>

      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserItem
            data={item}
            style={styles.item}
            onPress={() => handleNavigateToDetail(item)}
          />
        )}
        keyExtractor={(_, i) => i}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleGetUsers} />
        }
        style={styles.list}
      />

      <StatusOptionsModal
        data={STATUS_DATA}
        isVisible={isVisibleModal}
        onCloseModal={() => setIsVisibleModal(false)}
        value={status}
        setValue={newValue => setStatus(newValue)}
      />
    </MainLayout>
  );
};

const DEFAULT_STATUS_VALUE = null;

const STATUS_DATA = [
  {
    value: DEFAULT_STATUS_VALUE,
    label: "All status",
  },
  {
    value: RESULT_STATUS.qualified,
    label: onGetResultStatusLabel(RESULT_STATUS.qualified),
  },
  {
    value: RESULT_STATUS.unqualified,
    label: onGetResultStatusLabel(RESULT_STATUS.unqualified),
  },
];

export default TrainingResultScreen;

const styles = StyleSheet.create({
  filterBox: {
    flexDirection: "row",
    margin: 16,
  },
  item: {
    marginBottom: 10,
  },
  list: {
    marginHorizontal: 16,
  },
});
