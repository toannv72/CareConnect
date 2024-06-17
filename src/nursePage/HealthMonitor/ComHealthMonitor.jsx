import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import healthRecord from "../../../assets/images/HealthMonitor/healthRecord.png";

export default function ComHealthMonitor({ data, isSelected, style }) {
  const {
    text: { healthMonitor },
    setLanguage,
  } = useContext(LanguageContext);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.body, isSelected && styles.selectedBody, style]}
      onPress={() => navigation.navigate("NurseHealthMonitorDetail", { id: data?.roomId })} // Chuyển đến trang mới
    >
      <Image
        source={healthRecord}
        style={{
          width: 60,
          height: 60,
          borderRadius: 50,
          objectFit: "fill",
        }}
      />
      <View style={styles?.container1}>
       
        <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {healthMonitor?.room}
            </Text>
            <Text>: {data?.room}</Text>
          </Text>
        </View>
        <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {healthMonitor?.time}
            </Text>
            <Text>: {data?.date} </Text>
          </Text>
        </View>
        <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {healthMonitor?.nurse}
            </Text>
            <Text>: {data?.nurse}</Text>
          </Text>
        </View>
        <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {healthMonitor?.status}
            </Text>
            <Text>: {data?.status}</Text>
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
    alignItems: "center"
  },
  selectedBody: {
    backgroundColor: "rgba(51, 179, 156, 0.26)",
  },
  container: {
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
