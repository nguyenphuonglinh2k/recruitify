import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "utils";
import { CommonAvatar, CommonRating } from "components";
import { useNavigation } from "@react-navigation/core";
import { SCREEN_NAME } from "const/path.const";
import { APPLICATION_STATUS } from "const/app.const";

const CandidateItem = ({ data, style }) => {
  const navigation = useNavigation();

  const { avatarUrl, name, star, email, position, status } = data;

  const onNavigateToDetail = () => {
    navigation.navigate(SCREEN_NAME.candidateDetailScreen);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onNavigateToDetail}
      style={[styles.root, style]}
    >
      <View style={styles.top}>
        <CommonAvatar source={{ uri: avatarUrl }} style={styles.left} />
        <View style={styles.right}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.position}>{position}</Text>
          {[
            APPLICATION_STATUS.interview,
            APPLICATION_STATUS.hire,
            APPLICATION_STATUS.reject,
          ].includes(status) && <CommonRating value={star} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

CandidateItem.propTypes = {
  data: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.number,
    star: PropTypes.number,
    email: PropTypes.string,
    position: PropTypes.string,
    dueDate: PropTypes.string,
  }),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default CandidateItem;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    borderRadius: 10,
    borderColor: COLORS.grey[200],
    borderWidth: 2,
    padding: 12,
    backgroundColor: COLORS.grey[300],
  },
  top: {
    flexDirection: "row",
  },
  left: {
    height: 50,
    width: 50,
  },
  right: {
    marginLeft: 10,
  },
  name: {
    fontWeight: "600",
    color: COLORS.black,
    fontSize: 16,
  },
  position: {
    fontWeight: "500",
    marginVertical: 4,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});
