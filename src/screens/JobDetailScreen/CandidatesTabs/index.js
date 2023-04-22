import { ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import CandidateItem from "./CandidateItem";
import { useSelector } from "react-redux";
import { JobService } from "services";
import { ApiConstant } from "const";
import { LoadingSpinner } from "components";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { SCREEN_NAME, TAB_NAME } from "const/path.const";

const CandidatesTab = ({ style }) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const job = useSelector(({ jobRedux }) => jobRedux.job);

  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigateToApplicationDetail = useCallback(
    applicationId => {
      navigation.navigate(TAB_NAME.application, {
        screen: SCREEN_NAME.candidateDetailScreen,
        params: { applicationId },
      });
    },
    [navigation],
  );

  const handleGetJobApplications = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await JobService.getJobApplications(job._id);

      if (response.status === ApiConstant.STT_OK) {
        setApplications(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [job._id]);

  useEffect(() => {
    if (isFocused) {
      handleGetJobApplications();
    }
  }, [handleGetJobApplications, isFocused]);

  return (
    <ScrollView style={[styles.root, style]}>
      {applications.map((application, index) => (
        <CandidateItem
          key={index}
          data={application.applicantInfo}
          status={application.status}
          style={index !== 0 ? styles.marginTop : {}}
          onPress={() => handleNavigateToApplicationDetail(application._id)}
        />
      ))}

      <LoadingSpinner isVisible={isLoading} />
    </ScrollView>
  );
};

CandidatesTab.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default CandidatesTab;

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  marginTop: {
    marginTop: 10,
  },
});
