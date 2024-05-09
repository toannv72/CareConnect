import React, { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import ComTitlePage from "../../Components/ComTitlePage/ComTitlePage";
import { LanguageContext } from "../../contexts/LanguageContext";
import Vector from "../../../assets/Vector.png";
import ComTitle from "../../Components/ComTitle/ComTitle";
import ComButton from "../../Components/ComButton/ComButton";
import { useNavigation } from "@react-navigation/native";
import ComTitleLink from "../../Components/ComTitleLink/ComTitleLink";
import { TouchableOpacity } from "react-native";
import ComInputCode from "../../Components/ComInputCode/ComInputCode";
export default function Otp() {
  const navigation = useNavigation();
  const {
    text: { Otp },
    setLanguage,
  } = useContext(LanguageContext);
  const toLogin = () => {
    navigation.navigate("RegisterSuccess");
  };
  const code = (e) => {
    console.log("code nè:", e);
  };
  return (
    <View style={styles?.body}>
      <View style={styles?.container}>
        <ComTitlePage>{Otp?.pageTitle}</ComTitlePage>

        <View>
          <ComTitle
            style={{ fontSize: 13, textAlign: "center", fontWeight: "normal" }}
          >
            {Otp?.content}
          </ComTitle>
          <ComTitle
            style={{ fontSize: 13, textAlign: "center", fontWeight: "normal" }}
          >
            0123456789
          </ComTitle>
        </View>
        <ComInputCode getCode={code} />
        <View style={{ flexDirection: "row" }}>
          <ComTitle
            style={{
              fontSize: 13,
              fontWeight: "normal",
            }}
          >
            {Otp?.link?.content}
          </ComTitle>
          <TouchableOpacity>
            <ComTitle> {Otp?.link?.resendCode}</ComTitle>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%" }}>
          <ComButton onPress={toLogin}>{Otp?.button}</ComButton>
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
    gap: 10,
    backgroundColor: "#fff",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "90%",
  },
});
