import { MainLayout } from "layouts";
import React, { createContext, useCallback, useEffect, useState } from "react";
import CandidateDetailTabBar, {
  CANDIDATE_DETAIL_TAB_VALUES,
} from "./CandidateDetailTabBar";
import { CommonIconButton, TitleWithStatus } from "components";
import InformationTab from "./InformationTab";
import AttachmentTab from "./AttachmentTab";
import PositionTab from "./PositionTab";
import ProcessTab from "./ProcessTab";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import ApplicationActions from "reduxStore/application.redux";
import { PencilIcon } from "icons";
import { COLORS } from "utils";
import { SCREEN_NAME } from "const/path.const";

const CandidateDetailScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const route = useRoute();
  const applicationId = route.params?.applicationId;

  const application = useSelector(
    ({ applicationRedux }) => applicationRedux.application,
  );

  const [activatedTab, setActivatedTab] = useState(
    CANDIDATE_DETAIL_TAB_VALUES.information,
  );

  const handleGetApplicationDetail = useCallback(async () => {
    dispatch(ApplicationActions.getApplicationDetailRequest(applicationId));
  }, [applicationId, dispatch]);

  const handleNavigateToDetail = useCallback(() => {
    navigation.navigate(SCREEN_NAME.candidateEditingInfoScreen);
  }, [navigation]);

  const onRenderHeaderRight = () => {
    switch (activatedTab) {
      case CANDIDATE_DETAIL_TAB_VALUES.process:
        return (
          <CommonIconButton>
            <PencilIcon color={COLORS.green} />
          </CommonIconButton>
        );

      default:
        return (
          <CommonIconButton onPress={handleNavigateToDetail}>
            <PencilIcon color={COLORS.green} />
          </CommonIconButton>
        );
    }
  };

  useEffect(() => {
    if (isFocused) {
      handleGetApplicationDetail();
    }
  }, [handleGetApplicationDetail, isFocused]);

  return (
    <CandidateDetailContext.Provider value={{ application }}>
      <MainLayout
        isBackScreen
        headerProps={{
          title: (
            <TitleWithStatus
              title={application.applicantInfo?.name}
              status={1} // TODO
            />
          ),
          headerRight: onRenderHeaderRight(),
        }}
      >
        <CandidateDetailTabBar
          activatedTab={activatedTab}
          setActivatedTab={setActivatedTab}
        />
        {activatedTab === CANDIDATE_DETAIL_TAB_VALUES.information && (
          <InformationTab />
        )}
        {activatedTab === CANDIDATE_DETAIL_TAB_VALUES.attachment && (
          <AttachmentTab />
        )}
        {activatedTab === CANDIDATE_DETAIL_TAB_VALUES.position && (
          <PositionTab />
        )}
        {activatedTab === CANDIDATE_DETAIL_TAB_VALUES.process && <ProcessTab />}
      </MainLayout>
    </CandidateDetailContext.Provider>
  );
};

export default CandidateDetailScreen;

export const CandidateDetailContext = createContext();
