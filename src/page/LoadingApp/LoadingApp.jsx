import React, { useCallback } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useAuth } from "../../../auth/useAuth";
import { useStorage } from "../../hooks/useLocalStorage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import splash from "../../../assets/splash.png";
export default function LoadingApp() {
  const navigation = useNavigation();
  const { accessToken, role } = useAuth();
  useFocusEffect(
    useCallback(() => {
      if (accessToken && role?.name == "Customer")
        setTimeout(() => {
          navigation.navigate("Homes", { screen: "Home" });
        }, 1000);
      else if (accessToken && role?.name == "Nurse")
        setTimeout(() => {
          navigation.navigate("NurseHomes", { screen: "NurseHome" });
        }, 1000);
      else {
        setTimeout(() => {
          navigation.navigate("Login");
        }, 1000);
      }
    }, [])
  );

  return (
    <View>
      <Image source={splash} style={styles.image} />
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
});
