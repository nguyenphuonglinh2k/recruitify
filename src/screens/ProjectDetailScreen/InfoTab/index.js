import { ScrollView, View } from "react-native";
import React from "react";
import { CommonDeleteButton, DetailItemRow } from "components";
import ProjectStatus from "./ProjectStatus";
import { paddingStyle } from "components/DetailItemRow";

const InfoTab = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <DetailItemRow
          label="Status"
          content={
            <View style={paddingStyle}>
              <ProjectStatus value={MOCK_PROJECT.status} />
            </View>
          }
        />

        <DetailItemRow label="Description" content={MOCK_PROJECT.description} />
        <DetailItemRow label="Starting date" content={MOCK_PROJECT.startDate} />
        <DetailItemRow label="Ending date" content={MOCK_PROJECT.startDate} />
      </ScrollView>

      <CommonDeleteButton style={{ margin: 10 }} />
    </View>
  );
};

const MOCK_PROJECT = {
  name: "Design recruitify mobile",
  status: 2,
  startDate: "12/02/2023",
  endDate: "12/03/2023",
  description: "This is project about recruitment process",
};

export default InfoTab;
