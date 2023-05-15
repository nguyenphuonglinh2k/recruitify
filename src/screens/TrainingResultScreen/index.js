import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MainLayout } from "layouts";
import { EmptyData, FilterButton, StatusOptionsModal } from "components";
import UserItem from "./UserItem";
import { TrainResultService } from "services";
import { RESULT_STATUS } from "const/app.const";
import { ApiConstant } from "const";
import { onGetResultStatusLabel } from "utils/label.utils";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { SCREEN_NAME } from "const/path.const";
import { COLORS } from "utils";
import { Text } from "react-native";

const TrainingResultScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [results, setResults] = useState([]);
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
      const response = await TrainResultService.getTrainResults({
        params: { status },
      });

      if (response.status === ApiConstant.STT_OK) {
        setResults(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [status]);

  const handleNavigateToDetail = useCallback(
    item => {
      navigation.navigate(SCREEN_NAME.trainingResultDetailScreen, {
        resultId: item._id,
      });
    },
    [navigation],
  );

  useEffect(() => {
    if (isFocused) handleGetUsers();
  }, [handleGetUsers, isFocused]);

  return (
    <MainLayout>
      <View style={{ margin: 16 }}>
        <Text style={styles.title}>Training Results</Text>
        <Text style={styles.desc}>
          Evaluating training results to ensure that your candidates are
          effective.
        </Text>
      </View>

      <View style={styles.filterBox}>
        <FilterButton
          label={statusLabel}
          style={{ flex: 0.5, marginLeft: "auto" }}
          labelStyle={{ flex: 0 }}
          onPress={() => setIsVisibleModal(true)}
        />
      </View>

      <FlatList
        data={results}
        renderItem={({ item }) => (
          <UserItem
            data={item.candidateId}
            style={styles.item}
            onPress={() => handleNavigateToDetail(item)}
          />
        )}
        keyExtractor={(_, i) => i}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleGetUsers} />
        }
        ListEmptyComponent={<EmptyData description="No results found!" />}
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
  {
    value: RESULT_STATUS.notEvaluated,
    label: onGetResultStatusLabel(RESULT_STATUS.notEvaluated),
  },
];

export default TrainingResultScreen;

const styles = StyleSheet.create({
  title: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: "600",
  },
  desc: {
    color: COLORS.black,
    fontSize: 15,
    marginTop: 4,
  },
  filterBox: {
    flexDirection: "row",
    margin: 16,
    marginTop: 0,
  },
  item: {
    marginBottom: 10,
  },
  list: {
    marginHorizontal: 16,
  },
});
