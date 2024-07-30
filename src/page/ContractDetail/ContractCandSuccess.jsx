import React, { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ComTitlePage from "../../Components/ComTitlePage/ComTitlePage";
import { LanguageContext } from "../../contexts/LanguageContext";
import Vector from "../../../assets/Vector.png";
import ComTitle from "../../Components/ComTitle/ComTitle";
import ComButton from "../../Components/ComButton/ComButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter";
import { useAuth } from "../../../auth/useAuth";

export default function ContractCandSuccess() {
  const navigation = useNavigation();
  const {
    text: {
      visitationText,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);
  const route = useRoute();
  const { data } = route.params;
  const { user } = useAuth();

  const toHomes = () => {
    navigation.navigate("Homes");
  };
  return (
    <View style={styles?.body}>
      <View style={styles?.container}>
        <ComTitlePage>Yêu cầu hủy hợp đồng đã được gửi đi</ComTitlePage>
        <Image style={{}} source={Vector} />
        <View style={styles?.container1}>
          <View >
            <Text style={{ flexDirection: "row", fontSize: 16 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {visitationText?.subscribers}
              </Text>
              <Text>: {user?.fullName}</Text>
            </Text>
          </View>
          <View >
            <Text style={{ flexDirection: "row", fontSize: 16 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {visitationText?.phone}
              </Text>
              <Text>: {user?.phoneNumber}</Text>
            </Text>
          </View>
          <View >
            <Text style={{ flexDirection: "row", fontSize: 16 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {visitationText?.day}
              </Text>
              <Text>
                : <ComDateConverter>{data?.date}</ComDateConverter>
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ width: "90%", marginBottom: 20 }}>
          <ComButton onPress={toHomes}>
            {visitationText?.button?.toHomes}
          </ComButton>
        </View>
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
