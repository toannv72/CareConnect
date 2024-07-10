import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { stylesApp } from "../../../styles/Styles";
import { useNavigation } from "@react-navigation/native";

export default function ComService({ data }) {
  const {
    text: { addingPackages },
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
      style={[styles.body, stylesApp.shadow]}
      onPress={() => {
        navigation.navigate("AddingServiceDetail", { id: data?.id });
      }}
    >
      <Image
        source={{ uri: data?.imageUrl }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          objectFit: "fill",
        }}
      />
      <View style={styles?.container}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{data?.name}</Text>
        <Text numberOfLines={1}>{data?.description}</Text>

        <Text style={{ flexDirection: "row" }}  numberOfLines={1}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {addingPackages?.package?.category}
          </Text>
          <Text>
            : {data?.servicePackageCategory?.name}
          </Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {formatCurrency(data?.price)}
          </Text>
          /{addingPackages?.package?.time}
        </Text>
      </View>
    </TouchableOpacity >
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
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 3
  },
});
