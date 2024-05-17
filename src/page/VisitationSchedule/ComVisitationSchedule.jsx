import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";

export default function ComVisitationSchedule({ data }) {
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
  return (
    <TouchableOpacity style={[styles.body]}>
      <View style={styles.day}>
        <Text style={styles.textYear}>2024</Text>
        <View
          style={{ backgroundColor: "#33B39C", paddingHorizontal:10 ,paddingVertical:4, borderRadius: 10 }}
        >
          <Text style={styles.textDay}>08</Text>
          <Text style={styles.textDay}>- -</Text>
          <Text style={styles.textDay}>05</Text>
        </View>
      </View>

      <View style={styles?.container}>
        {/* <Text style={{ fontWeight: "bold", fontSize: 16 }}>{data?.text}</Text> */}
        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Người Đăng Ký
          </Text>
          <Text>: Thảo My</Text>
        </Text>
        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Số điện thoại
          </Text>
          <Text>: 01234567890</Text>
        </Text>
        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Giờ</Text>
          <Text>: 10:00</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    gap: 18,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
    backgroundColor: "#caece6",

    elevation: 4, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  day: {
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  textDay: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  textYear: {
    fontSize: 16,
    color: "#33B39C",
  },
});
