import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import feedbackImg from "../../../assets/images/feedback/feedbackImg.png"

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
        source={feedbackImg}
        style={{
          width: 80,
          height: 80,
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
            : {data?.createdAt}
          </Text>
        </Text>

        <Text style={{ flexDirection: "row" }}>
          <Text style={{fontWeight: "600", fontSize: 14 }}>
          {feedback?.history?.service}
          </Text>
          <Text>
            : {data?.orderDetail?.servicePackage?.name}
          </Text>
        </Text>
    </View>
    </TouchableOpacity >
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 3
  },
});
