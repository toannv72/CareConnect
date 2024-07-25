import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter"

export default function ComPatient({ data }) {
  const {
    text: { HealthMonitorDetail },
    setLanguage,
  } = useContext(LanguageContext);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.body}
      onPress={() => {
        navigation.navigate("ElderDetailProfile", { data: data });
      }}
    >
      <Image
        source={{ uri: data?.imageUrl }}
        style={{
          width: 65,
          height: 65,
          borderRadius: 50,
          objectFit: "fill",
          borderWidth: 0.5,
          borderColor: "#000",
        }}
      />
      <View style={styles?.container1}>
        <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {HealthMonitorDetail?.name}
            </Text>
            <Text>: {data?.name}</Text>
          </Text>
        </View>
        <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {HealthMonitorDetail?.YearOfBirth}
            </Text>
            <Text>: <ComDateConverter>{data?.dateOfBirth}</ComDateConverter></Text>
          </Text>
        </View>
        <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {HealthMonitorDetail?.gender}
            </Text>
            <Text>: { data?.gender === 'Male' ? 'Nam' : data?.gender === 'Female' ? 'Nữ' : ''}</Text>
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
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    // flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",

    flexWrap: "wrap",
  },
  container1: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  text: {
    flex: 1,
  },
});
