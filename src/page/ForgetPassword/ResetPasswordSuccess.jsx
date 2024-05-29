import React, { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import ComTitlePage from "../../Components/ComTitlePage/ComTitlePage";
import { LanguageContext } from "../../contexts/LanguageContext";
import Vector from "../../../assets/Vector.png";
import ComTitle from "../../Components/ComTitle/ComTitle";
import ComButton from "../../Components/ComButton/ComButton";
import { useNavigation } from "@react-navigation/native";
export default function RegisterSuccess() {
  const navigation = useNavigation();
  const {
    text: {
      ForgetPassword,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);
  const toLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles?.body}>
      <View style={styles?.container}>
        <ComTitlePage>{ForgetPassword?.titleRegisterSuccess}</ComTitlePage>
        <Image style={{}} source={Vector} />
        <ComTitle
          style={{ fontSize: 19, textAlign: "center", fontWeight: "normal" }}
        >
          {ForgetPassword?.messageRegisterSuccess}
        </ComTitle>
        <View style={{ width: "100%" }}>
          <ComButton onPress={toLogin}>
            {ForgetPassword?.button?.login}
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
    gap: 10,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "90%",
  },
});
