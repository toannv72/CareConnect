import React, { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import ComTitlePage from "../../Components/ComTitlePage/ComTitlePage";
import { LanguageContext } from "../../contexts/LanguageContext";
import Vector from "../../../assets/Vector.png";
import ComTitle from "../../Components/ComTitle/ComTitle";
import ComButton from "../../Components/ComButton/ComButton";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../auth/useAuth";

export default function ChangePasswordSuccess() {
  const navigation = useNavigation();
  const { role } = useAuth();
  const {
    text: {
      ChangePassword,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);
  const toLogin = () => {
    if (role?.name == "Customer")
      navigation.navigate("Homes");
    else
      navigation.navigate("NurseHomes");
  };
  return (
    <View style={styles?.body}>
      <View style={styles?.container}>
        <ComTitlePage>{ChangePassword?.titleRegisterSuccess}</ComTitlePage>
        <Image style={{}} source={Vector} />
        <ComTitle
          style={{ fontSize: 19, textAlign: "center", fontWeight: "normal" }}
        >
          {ChangePassword?.messageRegisterSuccess}
        </ComTitle>
        <View style={{ width: "100%" }}>
          <ComButton onPress={toLogin}>
            {ChangePassword?.button?.back}
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
    gap: 30,
    width: "90%",
  },
});
