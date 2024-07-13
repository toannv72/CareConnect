import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import TopicContent from "../TopicContent";
import { LanguageContext } from "../../../contexts/LanguageContext";
import ComCatalogue from "./ComCatalogue";
import { useNavigation } from "@react-navigation/native";
import AddingService from "../../../../assets/icon/AddingService.png";
import servicePackage from "../../../../assets/icon/servicePackage.png";
import visitSchedule from "../../../../assets/icon/visitSchedule.png";
import contract from "../../../../assets/icon/contract.png";
import elderProfile from "../../../../assets/icon/ElderProfile.png";

export default function Catalogue() {
  const navigation = useNavigation();
  const {
    text: { Home },
  } = useContext(LanguageContext);

  const goto = (link) => {
    navigation.navigate(link);
  }
  return (
    <View style={styles?.body}>
      <TopicContent>{Home?.catalogue}</TopicContent>
      <View style={styles.comCatalogue}>
        {/* <TouchableOpacity onPress={() => goto("ElderProfile")}> */}
        <TouchableOpacity onPress={() => goto("ScheduledService")}>
          <ComCatalogue
            url={
              elderProfile
            }
          >
            Hồ sơ người thân
          </ComCatalogue>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goto("Service")}>
          <ComCatalogue
            url={
              servicePackage
            }
          >
            Gói dưỡng lão
          </ComCatalogue>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goto("VisitationSchedule")}>
          <ComCatalogue
            url={
              visitSchedule
            }
          >
            Lịch thăm nuôi
          </ComCatalogue>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goto("Contracts")}>
          <ComCatalogue
            url={
              contract
            }
          >
            Hợp đồng
          </ComCatalogue>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 15,
  },
  comCatalogue: {
    flexDirection: "row",
    gap: 30,
    paddingVertical: 10,
  },
});
