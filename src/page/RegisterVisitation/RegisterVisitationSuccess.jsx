import React, { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ComTitlePage from "../../Components/ComTitlePage/ComTitlePage";
import { LanguageContext } from "../../contexts/LanguageContext";
import Vector from "../../../assets/Vector.png";
import ComTitle from "../../Components/ComTitle/ComTitle";
import ComButton from "../../Components/ComButton/ComButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter";
export default function RegisterVisitationSuccess() {
  const navigation = useNavigation();
  const {
    text: {
      visitationText,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);
  const route = useRoute();
  const { date } = route.params;
  const toHomes = () => {
    navigation.navigate("Homes");
  };
  return (
    <View style={styles?.body}>
      <View style={styles?.container}>
        <ComTitlePage>{visitationText?.titleRegisterSuccess}</ComTitlePage>
        <Image style={{}} source={Vector} />
        <View style={styles?.container1}>
          <View style={styles?.container2}>
            <Text style={{ flexDirection: "row", fontSize: 16 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {visitationText?.subscribers}
              </Text>
              <Text>: Thảo my</Text>
              {/* <Text>: {data?.name}</Text> */}
            </Text>
          </View>
          <View style={styles?.container2}>
            <Text style={{ flexDirection: "row", fontSize: 16 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {visitationText?.phone}
              </Text>
              <Text>:0123231232</Text>
            </Text>
          </View>
          <View style={styles?.container2}>
            <Text style={{ flexDirection: "row", fontSize: 16 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {visitationText?.day}
              </Text>
              <Text>
                : <ComDateConverter>{date}</ComDateConverter>
              </Text>
            </Text>
          </View>
          <View style={styles?.container2}>
            <Text style={{ flexDirection: "row", fontSize: 16 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {visitationText?.hour}
              </Text>
              {/* <Text>: {data?.room}</Text> */}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ width: "90%", marginBottom: 20 }}>
        <ComButton onPress={toHomes}>
          {visitationText?.button?.toHomes}
        </ComButton>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 30,
  },
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    width: "90%",
  },
  container2: {
    // flex: 1,
    // alignItems: "flex-start",
    // justifyContent: "center",
    // flexWrap: "wrap",
  },
  container1: {
    width: "100%",
    paddingHorizontal: 30,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
