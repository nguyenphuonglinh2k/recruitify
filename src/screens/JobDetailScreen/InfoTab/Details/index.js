import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { COLORS } from "utils";
import { DetailItemRow } from "components";

const Details = ({ style }) => {
  return (
    <View style={style}>
      <Text style={styles.label}>Details</Text>

      <DetailItemRow
        label="Starting date"
        content={MOCK_JOB_DETAILS.startDate}
      />
      <DetailItemRow label="Ending date" content={MOCK_JOB_DETAILS.endDate} />
      <DetailItemRow
        label="Creation time"
        content={MOCK_JOB_DETAILS.creationTime}
      />
      <DetailItemRow
        label="Responsible person"
        content={MOCK_JOB_DETAILS.responsiblePerson.name}
      />
    </View>
  );
};

Details.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const MOCK_JOB_DETAILS = {
  startDate: "01/03/2023",
  endDate: "01/04/2023",
  creationTime: "01/03/2023 14:30",
  responsiblePerson: {
    name: "Mat Lamin",
  },
};

export default memo(Details);

const styles = StyleSheet.create({
  label: {
    color: COLORS.black,
    fontWeight: "600",
    fontSize: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.grey[500],
    paddingHorizontal: 16,
  },
  marginBottom: {
    marginBottom: 10,
  },
});
