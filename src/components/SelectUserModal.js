import { StyleSheet } from "react-native";
import React, { memo } from "react";
import PropTypes from "prop-types";
import CommonModal from "./CommonModal";
import CommonAvatarChip from "./CommonAvatarChip";

const SelectUserModal = ({ isVisible, data, onPress, ...otherProps }) => {
  return (
    <CommonModal
      visible={isVisible}
      styles={{ root: styles.root }}
      {...otherProps}
    >
      {data?.map((item, index) => (
        <CommonAvatarChip
          key={index}
          label={item?.name}
          source={{ uri: item?.avatarUrl }}
          style={styles.item}
          avatarStyle={styles.avatar}
          onPress={() => onPress(item)}
        />
      ))}
    </CommonModal>
  );
};

SelectUserModal.propTypes = {
  isVisible: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
  ),
  onPress: PropTypes.func,
};

export default memo(SelectUserModal);

const styles = StyleSheet.create({
  root: {
    padding: 0,
  },
  item: {
    borderWidth: 0,
    width: "100%",
    borderRadius: 0,
    borderBottomWidth: 1,
    justifyContent: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  avatar: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
});
