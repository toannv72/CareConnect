import React, { useContext, useState, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter"
import { getData } from "../../api/api";
import { useFocusEffect } from '@react-navigation/native';

export default function ComHealth({ data }) {
  const [loading, setLoading] = useState(false);
  const [block, setBlock] = useState({});

  const {
    text: { healthMonitor },
    setLanguage,
  } = useContext(LanguageContext);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (data?.room?.blockId)
        getData(`block/${data?.room?.blockId}`, {})
          .then((block) => {
            setBlock(block?.data);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.error("Error fetching order items:", error);
          });
    }, [])
  );

  const roomBlock = (data?.room?.name && block?.name) ? "Khu " + block?.name + ", phòng " + data?.room?.name : "Không có"

  return (
    <TouchableOpacity
      style={styles.body}
      onPress={() => {
        navigation.navigate("ElderDetailProfile", { data: data });
      }}
    >
      <Image
        source={{ uri: data?.imageUrl }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 50,
          objectFit: "fill",
          borderWidth: 0.5,
          borderColor: "#000",
        }}
      />
      <View style={styles?.container1}>
        <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {healthMonitor?.name}
            </Text>
            <Text>
              : {data?.name}
            </Text>
          </Text>
        </View>
        <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {healthMonitor?.age}
            </Text>
            <Text>: <ComDateConverter> {data?.dateOfBirth}</ComDateConverter> </Text>
          </Text>
        </View>
        <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {healthMonitor?.sex}
            </Text>
            <Text>: {data?.gender === 'Male' ? 'Nam' : data?.gender === 'Female' ? 'Nữ' : ''}</Text>
          </Text>
        </View>
        <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {healthMonitor?.room}
            </Text>
            <Text>: {roomBlock}</Text>
          </Text>
        </View>
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
    backgroundColor: "#F7FFFE",
    elevation: 4, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  container: {
    // flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",

    flexWrap: "wrap",
  },
  container1: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  text: {
    flex: 1,
  },
});
