import React from "react";
import MemberItem from "./MemberItem";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const MemberList = ({ data, onPress, ...otherProps }) => {
  const PROJECT = useSelector(({ projectRedux }) => projectRedux.project);

  return data.map((item, index) => (
    <MemberItem
      key={index}
      data={item}
      isCreator={item._id === PROJECT.creatorId?._id}
      onPress={() => onPress(index)}
      {...otherProps}
    />
  ));
};

MemberList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      isChecked: PropTypes.bool,
      name: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
  ),
};

export default MemberList;
