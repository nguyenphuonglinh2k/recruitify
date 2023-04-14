import { ScrollView, View } from "react-native";
import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  CommonDeleteButton,
  ConfirmDeleteModal,
  DetailItemRow,
  ProgressStatus,
} from "components";
import { paddingStyle } from "components/DetailItemRow";
import moment from "moment";
import { ApiConstant, AppConstant } from "const";
import { ProjectService } from "services";
import { useNavigation } from "@react-navigation/core";
import { useToast } from "react-native-toast-notifications";
import { useSelector } from "react-redux";

const InfoTab = ({ data, setIsLoading }) => {
  const navigation = useNavigation();
  const toast = useToast();

  const authUser = useSelector(({ authRedux }) => authRedux.user);

  const [isVisible, setIsVisible] = useState(false);

  // Only admin or creator has permission to delete
  const canDeleted = useMemo(() => {
    return (
      authUser.role === AppConstant.USER_ROLE.admin ||
      data.creatorId?._id === authUser._id
    );
  }, [authUser._id, authUser.role, data.creatorId?._id]);

  const handleOpenConfirmDeleteModal = () => {
    setIsVisible(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setIsVisible(false);
  };

  const handleDeleteTask = async () => {
    if (setIsLoading) setIsLoading(true);

    try {
      const response = await ProjectService.deleteProject(data._id);

      if (response.status === ApiConstant.STT_OK) {
        navigation.goBack();
        toast.show("Delete successfully", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (setIsLoading) setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <DetailItemRow
          label="Status"
          content={
            <View style={paddingStyle}>
              <ProgressStatus value={data.status} />
            </View>
          }
        />

        <DetailItemRow label="Description" content={data.description} />
        <DetailItemRow
          label="Starting date"
          content={
            data.startDate
              ? moment(data.startDate).format(
                  AppConstant.FORMAT_DATE_WITH_SLASH,
                )
              : "None"
          }
        />
        <DetailItemRow
          label="Ending date"
          content={
            data.endDate
              ? moment(data.endDate).format(AppConstant.FORMAT_DATE_WITH_SLASH)
              : "None"
          }
        />
      </ScrollView>

      {canDeleted && (
        <CommonDeleteButton
          style={{ margin: 10 }}
          onPress={handleOpenConfirmDeleteModal}
        />
      )}
      <ConfirmDeleteModal
        title={data.name}
        isVisible={isVisible}
        onCancel={handleCloseConfirmDeleteModal}
        onOK={handleDeleteTask}
      />
    </View>
  );
};

InfoTab.propTypes = {
  data: PropTypes.object,
  setIsLoading: PropTypes.func,
};

export default InfoTab;
