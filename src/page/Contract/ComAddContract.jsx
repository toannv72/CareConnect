import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import ContractImg from "../../../assets/images/Contract/Contract.png";
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter";

export default function ComAddContract({ data }) {
  const {
    text: { contractsPage },
    setLanguage,
  } = useContext(LanguageContext);

  const navigation = useNavigation();

  const getStatusText = (status) => {
    switch (status) {
      case 'Valid':
        return { text: 'Còn hạn', color: 'green' };
      case 'Cancelled':
        return { text: 'Đã hủy', color: 'red' };
      case 'Invalid':
        return { text: 'Hết hạn', color: 'red' };
      case 'Pending':
        return { text: 'Đang chờ' };
      default:
        return status;
    }
  };

  const status = getStatusText(data?.status);

  return (
    <TouchableOpacity
      style={styles.body}
      onPress={() => {
        navigation.navigate("ContractDetail", { id: data.id });
      }}
    >
      <Image
        source={ContractImg}
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          objectFit: "fill",
        }}
      />
      <View style={styles?.container}>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
          {data?.name}
        </Text>
        {/* <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {contractsPage?.id}
          </Text>
          <Text>: {data?.category}</Text>
        </Text> */}
        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {contractsPage?.elder}
          </Text>
          <Text>: {data?.elder?.name}</Text>
        </Text>
        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {contractsPage?.duration}
          </Text>
          <Text>: <ComDateConverter>{data?.startDate}</ComDateConverter> - <ComDateConverter>{data?.endDate}</ComDateConverter></Text>
        </Text>
        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {contractsPage?.status}
          </Text>
          <Text style={{ color: status.color }}>: {status.text}</Text>
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
    borderColor: "#33B39C",
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
