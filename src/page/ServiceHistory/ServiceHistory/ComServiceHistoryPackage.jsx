import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";

export default function ComServiceHistoryPackage({ data, orderData }) {
  const {
    text: { addingPackages },
    setLanguage,
  } = useContext(LanguageContext);
  const navigation = useNavigation();

  const formattedDate = (dateValue) => {
    const day = new Date(dateValue).getDate().toString().padStart(2, "0");
    const month = (new Date(dateValue).getMonth() + 1).toString().padStart(2, "0");
    const year = new Date(dateValue).getFullYear();
    return `${day}/${month}/${year}`;
};

const getStatus = data?.orderDates.every(item => item.status === "Complete");

  return (
    <TouchableOpacity
      style={styles.body}
      onPress={() => {
        navigation.navigate("ServiceHistoryDetail", { id: orderData.id, status: getStatus });
      }}
    >
      <Image
        source={{ uri: data?.servicePackage?.imageUrl }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          objectFit: "fill",
        }}
      />
      <View style={styles?.container}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }} numberOfLines={1}>{data?.servicePackage?.name}</Text>

        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {addingPackages?.history?.dates}
          </Text>
          <Text>
            : {formattedDate(orderData?.createdAt)}
          </Text>
        </Text>

        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {addingPackages?.payment?.elderName}
          </Text>
          <Text>
            : {data?.elder?.name}
          </Text>
        </Text>

        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {addingPackages?.history?.status}
          </Text>
          <Text>
            : {getStatus ? "Đã kết thúc" : "Chưa kết thúc"}
          </Text>
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
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
