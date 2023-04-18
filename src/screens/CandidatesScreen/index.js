import React, { useCallback, useEffect } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import Header from "./Header";
import { MainLayout } from "layouts";
import CandidateItem from "./CandidateItem";
import { CommonIconButton, EmptyData } from "components";
import { useState } from "react";
import { APPLICATION_STATUS } from "const/app.const";
import CandidateTabBar from "./CandidateTabBar";
import { PlusIcon } from "icons";
import { COLORS } from "utils";
import { ApplicationService } from "services";
import { ApiConstant } from "const";
import { useIsFocused } from "@react-navigation/core";

const CandidatesScreen = () => {
  const isFocused = useIsFocused();

  const [activatedTab, setActivatedTab] = useState(
    APPLICATION_STATUS.screening,
  );

  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetApplications = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await ApplicationService.getApplications({
        params: { status: activatedTab },
      });

      if (response.status === ApiConstant.STT_OK) {
        setApplications(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [activatedTab]);

  useEffect(() => {
    if (isFocused) {
      handleGetApplications();
    }
  }, [handleGetApplications, isFocused]);

  return (
    <MainLayout
      headerProps={{
        headerRight: (
          <CommonIconButton>
            <PlusIcon color={COLORS.green} />
          </CommonIconButton>
        ),
      }}
    >
      <CandidateTabBar
        activatedTab={activatedTab}
        setActivatedTab={setActivatedTab}
      />
      <Header style={{ margin: 16 }} total={applications.length} />

      <FlatList
        data={applications}
        renderItem={({ item }) => (
          <CandidateItem data={item} style={styles.marginBottom} />
        )}
        keyExtractor={(_, index) => index}
        style={styles.root}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleGetApplications}
          />
        }
        ListEmptyComponent={<EmptyData description="No application found!" />}
      />
    </MainLayout>
  );
};

export default CandidatesScreen;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
  },
  marginBottom: {
    marginBottom: 10,
  },
});
