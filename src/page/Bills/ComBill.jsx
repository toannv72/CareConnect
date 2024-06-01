import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import billImg from "../../../assets/bill.png";
import ComTag from "./ComTag";

export default function ComBill({ data }) {
  const {
    text: { bill },
    setLanguage,
  } = useContext(LanguageContext);

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.body, { backgroundColor: data.status === "Đã quá hạn" ? "#FF000037" : "none" }]}
      onPress={() => {
        navigation.navigate("BillDetail", { id: data.id });
      }}
    >
      <Image
        source={billImg}
        style={{
          width: 80,
          height: 120,
          borderRadius: 5,
          objectFit: "fill",
          marginRight: 10
        }}
      />
      <View style={styles?.container}>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>{data?.title}</Text>


        <Text style={{ flexDirection: "row", marginBottom: 3 }}>
          <Text style={{ fontWeight: "600", fontSize: 14 }}>
            {bill?.billId}
          </Text>
          <Text>
            : {data?.billId}
          </Text>
        </Text>

        <Text style={{ flexDirection: "row", marginBottom: 3 }}>
          <Text style={{ fontWeight: "600", fontSize: 14 }}>
            {bill?.elder}
          </Text>
          <Text>
            : Cụ {data?.elder}
          </Text>
        </Text>

        <Text style={{ flexDirection: "row", marginBottom: 3 }}>
          <Text style={{ fontWeight: "600", fontSize: 14 }}>
            {bill?.dueDate}
          </Text>
          <Text>
            : {data?.dueDate}
          </Text>
        </Text>

        <Text style={{ flexDirection: "row", marginBottom: 3 }}>
          <ComTag text={data?.status} paid={data?.status == "Đã thanh toán"? true: false}></ComTag>

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
