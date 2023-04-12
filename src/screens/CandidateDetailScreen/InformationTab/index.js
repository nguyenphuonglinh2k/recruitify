import { ScrollView, StyleSheet } from "react-native";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { CommonAvatar, DetailItemRow } from "components";
import Skills from "./Skills";
import { CandidateDetailContext } from "../index";
import moment from "moment";
import { AppConstant } from "const";

const InformationTab = ({ style }) => {
  const { application } = useContext(CandidateDetailContext);

  return (
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

      <DetailItemRow label="Email" content={application.applicantInfo?.email} />
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
  );
};

InformationTab.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default InformationTab;

const styles = StyleSheet.create({
  root: {
    paddingVertical: 16,
  },
  avatar: {
    height: 50,
    width: 50,
    marginVertical: 10,
    marginHorizontal: 16,
  },
});
