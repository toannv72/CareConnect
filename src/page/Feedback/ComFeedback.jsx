import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";

export default function ComFeedback({ data }) {
  const {
    text: { feedback },
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
        navigation.navigate("FeedbackDetail", { id: data.id });
      }}
    >
      <Image
        source={{ uri: data?.img }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 5,
          objectFit: "fill",
        }}
      />
      <View style={styles?.container}>
        <Text style={{ fontWeight: "600" , fontSize: 16 }}>{data?.title}</Text>

        
        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "600", fontSize: 14 }}>
          {feedback?.history?.date}
          </Text>
          <Text>
            : {data?.date}
          </Text>
        </Text>

        <Text style={{ flexDirection: "row" }}>
          <Text style={{fontWeight: "600", fontSize: 14 }}>
          {feedback?.history?.service}
          </Text>
          <Text>
            : {data?.service}
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
    padding: 5,
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
