import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter";
import { stylesApp } from "../../styles/Styles";
import Heart from "../../../assets/heart.png";
import { FavoriteContext } from "../../contexts/FavoriteContext"; 

export default function ComAddPackage({ data }) {
  const {
    text: { addingPackages },
    setLanguage,
  } = useContext(LanguageContext);

  const navigation = useNavigation();
  const { favorites, toggleFavorite } = useContext(FavoriteContext);
  const formatCurrency = (number) => {
    // Sử dụng hàm toLocaleString() để định dạng số
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  const isFavorite = favorites?.some(item => item.id === data?.id);

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
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems:"center", gap: 10}}>
          <Text style={{ fontWeight: "600", fontSize: 15, width: "80%" }} numberOfLines={2}>{data?.name}</Text>
          <TouchableOpacity
            onPress={() => toggleFavorite(data)}
            style={[{ backgroundColor: isFavorite ? "#fac8d2" : "#bdbbbb", justifyContent: "center", padding: 7, borderRadius: 50, marginRight: 15 }]}>
            <Image source={Heart}
              style={{ width: 20, height: 20,  tintColor: isFavorite ? "red" : "#636360"  }} />
          </TouchableOpacity>
        </View>
        <Text numberOfLines={2}>{data?.description}</Text>

        <Text style={{ flexDirection: "row" }} numberOfLines={1}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {addingPackages?.package?.category}
          </Text>
          <Text>
            : {data?.servicePackageCategory?.name}
          </Text>
        </Text>
        <Text style={{ flexDirection: "row" }} numberOfLines={1}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            Type
          </Text>
          <Text>
            : {data?.type}
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
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 3
  },
});
