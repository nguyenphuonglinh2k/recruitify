import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { COLORS } from "utils";
import { DetailItemRow } from "components";
import { useSelector } from "react-redux";
import moment from "moment";
import { AppConstant } from "const";

const Details = ({ style }) => {
  const job = useSelector(({ jobRedux }) => jobRedux.job);

  return (
    <View style={style}>
      <Text style={styles.label}>Details</Text>

      <DetailItemRow
        label="Starting date"
        content={moment(job.startDate).format(
          AppConstant.FORMAT_DATE_WITH_SLASH,
        )}
      />
      <DetailItemRow
        label="Ending date"
        content={moment(job.endDate).format(AppConstant.FORMAT_DATE_WITH_SLASH)}
      />
      <DetailItemRow label="Creation time" content={job.createdAt} />
    </View>
  );
};

Details.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
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
