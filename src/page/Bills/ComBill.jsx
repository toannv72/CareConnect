import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import billImg from "../../../assets/bill.png";
import ComTag from "./ComTag";
import moment from 'moment';

export default function ComBill({ data }) {
  const {
    text: { bill },
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
      style={[styles.body, { backgroundColor: data.status === "Đã quá hạn" ? "#FF000037" : "none" }]}
      onPress={() => {
        navigation.navigate("BillDetail", { id: data?.id });
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
        <Text style={{ fontWeight: "600", fontSize: 16 }} numberOfLines={2}>
          {data?.description}
        </Text>
        <Text style={{ flexDirection: "row", marginBottom: 3 }}>
          <Text style={{ fontWeight: "600", fontSize: 14 }}>
            {bill?.billId}
          </Text>
          <Text>
            : {data?.id}
          </Text>
        </Text>
        <Text style={{ flexDirection: "row", marginBottom: 3 }}>
          <Text style={{ fontWeight: "600", fontSize: 14 }}>
            {bill?.total}
          </Text>
          <Text>
            : {formatCurrency(data?.amount)}
          </Text>
        </Text>
        <Text style={{ flexDirection: "row", marginBottom: 3 }}>
          <Text style={{ fontWeight: "600", fontSize: 14 }}>
            {bill?.dueDate}
          </Text>
          <Text>
            : {moment(data?.dueDate, "YYYY-MM-DD").format("DD/MM/YYYY") ?? ""}
          </Text>
        </Text>
        <Text style={{ flexDirection: "row", marginVertical: 3 }}>
          <ComTag status={data?.status} ></ComTag>
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
    gap: 2
  },
});
