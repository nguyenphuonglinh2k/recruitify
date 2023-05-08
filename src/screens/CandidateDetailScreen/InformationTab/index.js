import { ScrollView, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
  CommonAvatar,
  CommonDeleteButton,
  ConfirmDeleteModal,
  DetailItemRow,
  LoadingSpinner,
} from "components";
import Skills from "./Skills";
import { CandidateDetailContext } from "../index";
import moment from "moment";
import { ApiConstant, AppConstant } from "const";
import { useNavigation } from "@react-navigation/core";
import { useToast } from "react-native-toast-notifications";
import { ApplicationService } from "services";

const InformationTab = ({ style }) => {
  const navigation = useNavigation();
  const toast = useToast();

  const { application } = useContext(CandidateDetailContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const handleDeleteApplication = async () => {
    setIsLoading(true);

    try {
      const response = await ApplicationService.deleteApplication(
        application._id,
      );

      if (response.status === ApiConstant.STT_OK) {
        navigation.goBack();
        toast.show("Delete successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[styles.root, style]}>
        <DetailItemRow
          label="Avatar"
          content={
            <CommonAvatar
              source={{
                uri: application.applicantInfo?.avatarUrl,
              }}
              style={styles.avatar}
            />
          }
        />

        <DetailItemRow
          label="Email"
          content={application.applicantInfo?.email}
        />
        <DetailItemRow
          label="Phone number"
          content={application.applicantInfo?.phoneNumber}
        />
        <DetailItemRow
          label="Current Address"
          content={application.applicantInfo?.address}
        />
        <Skills />
        <DetailItemRow
          label="Updated at"
          content={moment(application.updatedAt).format(
            AppConstant.FORMAT_DATE_TIME_WITH_SLASH,
          )}
        />
      </ScrollView>

      <CommonDeleteButton
        style={{ margin: 16 }}
        onPress={() => setIsVisibleModal(true)}
      />

      <ConfirmDeleteModal
        title={application.applicantInfo?.name}
        isVisible={isVisibleModal}
        onOK={handleDeleteApplication}
        onCancel={() => setIsVisibleModal(false)}
      />
      <LoadingSpinner isVisible={isLoading} />
    </View>
  );
};

InformationTab.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default InformationTab;

const styles = StyleSheet.create({
  root: {
    paddingVertical: 16,
    flex: 1,
  },
  avatar: {
    height: 50,
    width: 50,
    marginVertical: 10,
    marginHorizontal: 16,
  },
});
