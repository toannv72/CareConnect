import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from '@react-navigation/native';
import { stylesApp } from "../../styles/Styles";

export default function ComPackage({ data }) {

  const {
    text: { servicePackages },
    setLanguage,
  } = useContext(LanguageContext);
  const formatCurrency = (number) => {
    // Sử dụng hàm toLocaleString() để định dạng số
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.body, stylesApp.shadow, { backgroundColor: data?.color || "#F7FFFE" }]}
      onPress={() => {
        navigation.navigate("ServicePackageDetail", { data: data });
      }}
    >
      <Image
        source={{ uri: data?.imageUrl }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          objectFit: "fill",
          borderWidth: 0.5,
          borderColor: "#000",
        }}
      />
      <View style={styles?.container}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{data?.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {servicePackages?.package?.living}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text>
              : {data?.capacity}
            </Text>
            <Text> {servicePackages?.package?.people}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {servicePackages?.package?.numOfNurse}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text>
              : {data?.numberOfNurses}
            </Text>
            <Text> {servicePackages?.package?.people}</Text>
          </View>
        </View>
        <Text numberOfLines={2}>{data?.description}</Text>
        <Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {formatCurrency(data?.price)}
          </Text>
          /{servicePackages?.package?.month}
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
    borderColor: "#ACDED3",
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
