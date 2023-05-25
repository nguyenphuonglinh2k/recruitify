import { ScrollView } from "react-native";
import React, { useState } from "react";
import Details from "./Details";
import Locations from "./Locations";
import Tags from "./Tags";
import {
  CommonDeleteButton,
  ConfirmDeleteModal,
  LoadingSpinner,
} from "components";
import { useSelector } from "react-redux";
import { JobService } from "services";
import { ApiConstant } from "const";
import { useNavigation } from "@react-navigation/core";
import { useToast } from "react-native-toast-notifications";

const InfoTab = props => {
  const navigation = useNavigation();
  const toast = useToast();

  const job = useSelector(({ jobRedux }) => jobRedux.job);

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenConfirmDeleteModal = () => {
    setIsVisible(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setIsVisible(false);
  };

  const handleDeleteTask = async () => {
    setIsLoading(true);
    try {
      const response = await JobService.deleteJob(job._id);

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
    <>
      <ScrollView {...props}>
        <Details />
        <Locations />
        <Tags />
      </ScrollView>

      <CommonDeleteButton
        style={{ margin: 10 }}
        onPress={handleOpenConfirmDeleteModal}
      />

      <ConfirmDeleteModal
        title={job.name}
        description="Do you really want to delete? All its application will also be deleted."
        isVisible={isVisible}
        onCancel={handleCloseConfirmDeleteModal}
        onOK={handleDeleteTask}
      />
      <LoadingSpinner isVisible={isLoading} />
    </>
  );
};

export default InfoTab;
