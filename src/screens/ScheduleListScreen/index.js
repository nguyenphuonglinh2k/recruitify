import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MainLayout } from "layouts";
import { CommonIconButton, EmptyData, LoadingSpinner } from "components";
import ScheduleItem from "./ScheduleItem";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/core";
import { useMemo } from "react";
import moment from "moment";
import { ApiConstant, AppConstant } from "const";
import { SCREEN_NAME } from "const/path.const";
import { ScheduleService } from "services";
import { PlusIcon } from "icons";
import { COLORS } from "utils";

const ScheduleListScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const date = route.params.date;

  const [isLoading, setIsLoading] = useState(false);
  const [schedules, setSchedules] = useState([]);

  const formattedDate = useMemo(
    () => moment(date).format(AppConstant.FORMAT_DATE_WITH_SLASH),
    [date],
  );

  const onNavigateToCreationScreen = () => {
    navigation.navigate(SCREEN_NAME.scheduleAddition, { date });
  };

  const handleGetSchedules = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await ScheduleService.getSchedules({ params: { date } });

      if (response.status === ApiConstant.STT_OK) {
        setSchedules(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [date]);

  useEffect(() => {
    if (isFocused) {
      handleGetSchedules();
    }
  }, [handleGetSchedules, isFocused]);

  return (
    <MainLayout
      isBackScreen
      headerProps={{
        title: `All schedule - ${formattedDate}`,
        headerRight: (
          <CommonIconButton onPress={onNavigateToCreationScreen}>
            <PlusIcon color={COLORS.green} />
          </CommonIconButton>
        ),
      }}
    >
      <View style={styles.list}>
        {schedules.length ? (
          schedules.map((data, index) => (
            <ScheduleItem
              key={index}
              data={data}
              style={index !== 0 ? styles.mt : {}}
            />
          ))
        ) : (
          <EmptyData description="No schedule!" />
        )}
      </View>

      <LoadingSpinner isVisible={isLoading} />
    </MainLayout>
  );
};

export default ScheduleListScreen;

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  mt: {
    marginTop: 10,
  },
});
