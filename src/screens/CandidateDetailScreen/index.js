import { MainLayout } from "layouts";
import React, { createContext, useCallback, useEffect, useState } from "react";
import CandidateDetailTabBar, {
  CANDIDATE_DETAIL_TAB_VALUES,
} from "./CandidateDetailTabBar";
import { TitleWithStatus } from "components";
import InformationTab from "./InformationTab";
import AttachmentTab from "./AttachmentTab";
import PositionTab from "./PositionTab";
import ProcessTab from "./ProcessTab";
import { useRoute } from "@react-navigation/core";
import { ApplicationService } from "services";
import { ApiConstant } from "const";

const CandidateDetailScreen = () => {
  const route = useRoute();
  const applicationId = route.params?.applicationId;

  const [activatedTab, setActivatedTab] = useState(
    CANDIDATE_DETAIL_TAB_VALUES.information,
  );
  const [application, setApplication] = useState({});

  const handleGetApplicationDetail = useCallback(async () => {
    try {
      const response = await ApplicationService.getApplicationDetail(
        applicationId,
      );

      if (response.status === ApiConstant.STT_OK) {
        setApplication(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [applicationId]);

  useEffect(() => {
    handleGetApplicationDetail();
  }, [handleGetApplicationDetail]);

  return (
    <CandidateDetailContext.Provider value={{ application }}>
      <MainLayout
        isBackScreen
        headerProps={{
          title: (
            <TitleWithStatus
              title={MOCK_CANDIDATE_INFO.title}
              status={MOCK_CANDIDATE_INFO.status}
            />
          ),
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

export const MOCK_CANDIDATE_INFO = {
  title: "Paul Harris",
  status: 1,
};
