import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";

export default function ComHealthIndex({ data }) {
  const {
    text: { HealthMonitorDetail },
    setLanguage,
  } = useContext(LanguageContext);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.body}
      onPress={() => {
        // navigation.navigate("HealthMonitorDetail", { id: data.id });
      }}
    >
      <View style={styles?.left}>
        <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Huyết áp và nhịp tim
            </Text>
          </Text>
        </View>
        <Image
          source={{
            uri:
              data?.img ||
              "https://vinmec-prod.s3.amazonaws.com/images/20190404_090036_798062_tim.max-1800x1800.jpg",
          }}
          style={{
            width: "100%",
            height: 80,
            objectFit: "fill",

            borderWidth: 0.5,
            borderColor: "#000",
          }}
        />
      </View>
      <View style={styles?.container1}>
        <View style={styles?.container}>
          <Text style={{ flexDirection: "row", textAlign: "center" }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 16, color: "#33B39C" }}
            >
              118/80
            </Text>
            <Text style={{ fontSize: 16 }}> mmHg</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
    backgroundColor: "#caece6",

    elevation: 4, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  container: {
    // flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",

    flexWrap: "wrap",
  },
  container1: {
    flex: 0.35,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  text: {
    flex: 1,
  },
  left: {
    flex: 0.65,
    gap: 10,
  },
});
