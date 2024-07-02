import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter";
import { stylesApp } from "../../styles/Styles";

export default function ComAddPackage({ data }) {
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
        <Text numberOfLines={2}>{data?.description}</Text>

        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {addingPackages?.package?.category}
          </Text>
          <Text>
            : {data?.servicePackageCategory?.name}
          </Text>
        </Text>
       {
        data?.type == "OneDay" && (
          <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {addingPackages?.package?.eventDate}
          </Text>
          <Text>
           : <ComDateConverter>{data?.eventDate}</ComDateConverter>
          </Text>
        </Text>
        )
       }
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
    flexWrap: "wrap",
    gap: 3
  },
});
