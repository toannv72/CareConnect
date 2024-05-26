import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import TopicContent from "../TopicContent";
import { LanguageContext } from "../../../contexts/LanguageContext";
import ComCatalogue from "./ComCatalogue";
import { useNavigation } from "@react-navigation/native";

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
        <TouchableOpacity onPress={() => goto("AddingService")}>
          <ComCatalogue
            url={
              "https://media.istockphoto.com/id/533572966/vi/anh/%C4%91%E1%BA%A5m-b%C3%B3p-massage-ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-tr%E1%BB%9F-l%E1%BA%A1i-ti%E1%BB%87m-spa.jpg?s=612x612&w=0&k=20&c=k0kxL6b5fob5Cb5PCcvwdO7ryACULd_S_SabPtLyV7M="
            }
          >
            Đấm bóp nè
          </ComCatalogue>
        </TouchableOpacity>
        <TouchableOpacity>
          <ComCatalogue
            url={
              "https://media.istockphoto.com/id/533572966/vi/anh/%C4%91%E1%BA%A5m-b%C3%B3p-massage-ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-tr%E1%BB%9F-l%E1%BA%A1i-ti%E1%BB%87m-spa.jpg?s=612x612&w=0&k=20&c=k0kxL6b5fob5Cb5PCcvwdO7ryACULd_S_SabPtLyV7M="
            }
          >
            đấm bóp
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
