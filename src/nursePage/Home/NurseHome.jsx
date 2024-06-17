import React, { useContext } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import Header from "./Header";
import ComButton from "../../Components/ComButton/ComButton";
import Catalogue from "./Catalogue/Catalogue";
// import News from "./News/News";

import nurseHome from "../../../assets/images/nurseHome/nurseHome.png"
import { LanguageContext } from "../../contexts/LanguageContext";

export default function NurseHome({ navigation }) {

  const {
    text: {
      NurseHome,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.imageBody}>
          <Image
            source={nurseHome}
            style={styles.image}
          ></Image>
        </View>
        <ComButton
          style={[styles.button, styles.absoluteButton]}
          onPress={() => navigation.navigate("CareSchedule")}
        >
          Kiểm tra ngay
        </ComButton>
        <View style={styles.body}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>{NurseHome.catalogue}</Text>
          <Catalogue></Catalogue>
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  body: {
    paddingHorizontal: 20,
  },
  button: {
    width: "37%",
    height: 40,
    paddingVertical: 5,
    justifyContent: "center",
    marginLeft: 50,
    borderRadius: 100,
  },
  imageBody: {
    borderRadius: 10,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25
  },
  image: {
    resizeMode: "cover",
  },
  absoluteButton: {
    position: 'absolute',
    top: 125
  },
});

