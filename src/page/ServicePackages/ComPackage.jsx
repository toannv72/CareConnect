import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from '@react-navigation/native';

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
      style={[styles.body, { backgroundColor: data?.color || "#F7E863" }]}
      onPress={() => {
        navigation.navigate("ServicePackageDetail", { data: data });
      }}
    >
      <Image
        source={{ uri: data?.img }}
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
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{data?.text}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {servicePackages?.package?.living}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text>
              : {data?.people}
            </Text>
            <Text> {servicePackages?.package?.people}</Text>
          </View>
        </View>
        <Text numberOfLines={2}>{data?.context}</Text>
        <Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {formatCurrency(data?.money)}
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
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
