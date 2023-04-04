import { ScrollView } from "react-native";
import React from "react";
import Details from "./Details";
import Locations from "./Locations";
import Tags from "./Tags";

const InfoTab = props => {
  return (
    <ScrollView {...props}>
      <Details />
      <Locations />
      <Tags />
    </ScrollView>
  );
};

export default InfoTab;
