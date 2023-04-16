import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { SearchIcon } from "icons";
import PropTypes from "prop-types";
import { COLORS } from "utils";

const SearchBox = ({ value, onChangeText, style, inputStyle }) => {
  return (
    <View style={[styles.root, style]}>
      <SearchIcon />
      <TextInput
        style={[styles.input, inputStyle]}
        onChangeText={onChangeText}
        value={value}
        placeholder="Search..."
      />
    </View>
  );
};

export default SearchBox;

SearchBox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeText: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const styles = StyleSheet.create({
  root: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  input: {
    marginLeft: 5,
    flex: 1,
  },
});
