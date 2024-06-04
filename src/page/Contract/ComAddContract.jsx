import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";

export default function ComAddContract({ data }) {
  const {
    text: { contractsPage },
    setLanguage,
  } = useContext(LanguageContext);

  const navigation = useNavigation();

  const formatCurrency = (number) => {
    // Sử dụng hàm toLocaleString() để định dạng số
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <TouchableOpacity
      style={styles.body}
      onPress={() => {
        navigation.navigate("ContractDetail", { id: data.id });
      }}
    >
      <Image
        source={{ uri: data?.img }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          objectFit: "fill",
        }}
      />
      <View style={styles?.container}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {contractsPage?.titleContract}
        </Text>
        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {contractsPage?.id}
          </Text>
          <Text>: {data?.category}</Text>
        </Text>
        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {contractsPage?.representative}
          </Text>
          <Text>: {data?.category}</Text>
        </Text>
        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {contractsPage?.duration}
          </Text>
          <Text>: 8/10/2023 - 8/10/2024</Text>
        </Text>
        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {contractsPage?.status}
          </Text>
          <Text>: Còn hạn</Text>
        </Text>
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
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
