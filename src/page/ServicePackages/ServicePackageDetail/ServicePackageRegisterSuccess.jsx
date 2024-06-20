import React, { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ComTitlePage from "../../../Components/ComTitlePage/ComTitlePage";
import { LanguageContext } from "../../../contexts/LanguageContext";
import Vector from "../../../../assets/Vector.png";
import ComButton from "../../../Components/ComButton/ComButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import moment from 'moment';

export default function ServicePackageRegisterSuccess() {
  const navigation = useNavigation();
  const {
    text: {
      servicePackages,
      visitationText,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);
  const route = useRoute();
  const { data } = route.params;
  const formattedDate = moment(data?.date).format('DD/MM/YYYY');
  const toHomes = () => {
    navigation.navigate("Homes");
  };
  return (
    <View style={styles?.body}>
      <View style={styles?.container}>
        <ComTitlePage>{servicePackages?.popup?.successTitle}</ComTitlePage>
        <Image style={{}} source={Vector} />
        <View style={styles?.container1}>
          <View >
            <Text style={{ flexDirection: "row", fontSize: 16 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {visitationText?.subscribers}
              </Text>
              <Text>: {data?.name}</Text>
              {/* <Text>: {data?.name}</Text> */}
            </Text>
          </View>
          <View >
            <Text style={{ flexDirection: "row", fontSize: 16 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {visitationText?.phone}
              </Text>
              <Text>: {data?.phoneNumber}</Text>
            </Text>
          </View>
          <View >
            <Text style={{ flexDirection: "row", fontSize: 16 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {visitationText?.day}
              </Text>
              <Text>
                : {formattedDate}
              </Text>
            </Text>
          </View>
        
        </View>
      </View>
      <View style={{ width: "90%", marginBottom: 90 }}>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    width: "90%",
  },
  container1: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
