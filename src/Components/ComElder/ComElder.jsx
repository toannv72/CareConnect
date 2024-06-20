import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import ComDateConverter from "../ComDateConverter/ComDateConverter"

export default function ComElder({ data, onPress, isSelected, style }) {
  const {
    text: { healthMonitor },
    setLanguage,
  } = useContext(LanguageContext);
  const navigation = useNavigation();

  const genderOptions = [
    {
      value: "Male",
      label: "Nam",
    },
    {
      value: "Female",
      label: "Nữ",
    },
    {
      value: "Other",
      label: "Khác",
    },
  ];

  const getGenderLabel = (value) => {
    const genderOption = genderOptions.find((option) => option.value === value);
    return genderOption ? genderOption.label : value;
  };

  return (
    <TouchableOpacity
      style={[styles.body, isSelected && styles.selectedBody, style]}
      onPress={onPress}
    >
      <Image
        source={{ uri: data?.imageUrl }}
        style={{
          width: 60,
          height: 60,
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
              {healthMonitor?.name}
            </Text>
            <Text>
              : {data?.name}
            </Text>
          </Text>
        </View>
        <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {healthMonitor?.age}
            </Text>
            <Text>: <ComDateConverter> {data?.dateOfBirth} </ComDateConverter> </Text>
          </Text>
        </View>
        <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {healthMonitor?.sex}
            </Text>
            <Text>: {getGenderLabel(data?.gender)}</Text>
          </Text>
        </View>
        <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {healthMonitor?.room}
            </Text>
            <Text>: {data?.room?.name}</Text>
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
