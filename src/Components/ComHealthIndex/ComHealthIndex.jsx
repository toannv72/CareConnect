import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export default function ComHealthIndex({ data, healthMonitor }) {
  const {
    text: { HealthMonitorDetail },
    setLanguage,
  } = useContext(LanguageContext);
  const navigation = useNavigation();

  const getStatusText = (status) => {
    switch (status) {
      case 'Normal':
        return { text: 'Bình thường', color: '#33B39C' };
      case 'Warning':
        return { text: 'Bất thường', color: '#F3B411' };
      case 'Critical':
        return { text: 'Nguy hiểm', color: 'red' };
      default:
        return status;
    }
  };

  return (
    <TouchableOpacity
      style={styles.body}
      onPress={() => {
        navigation.navigate("HealthMonitorIndexList", { data: healthMonitor });
      }}
    >
      <View style={styles?.left}>
        <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {data?.healthCategory?.name}
            </Text>
          </Text>
        </View>
        <Image
          source={{
            uri:
              data?.healthCategory?.imageUrl ||
              "https://vinmec-prod.s3.amazonaws.com/images/20190404_090036_798062_tim.max-1800x1800.jpg",
          }}
          style={{
            width: "100%",
            height: 100,
            objectFit: "fill",
            borderWidth: 0.5,
            borderColor: "#000",
          }}
        />
      </View>
      <View style={styles?.value}>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          flexWrap: "wrap",
        }}>
          <Text
            style={{
              fontWeight: "bold", fontSize: 25,
              color: getStatusText(data?.healthReportDetailMeasures[0]?.status)?.color
            }}
          >
            {
              data?.healthReportDetailMeasures.length == 1 ?
                data?.healthReportDetailMeasures[0]?.value :
                data?.healthReportDetailMeasures[0]?.value + '/' + data?.healthReportDetailMeasures[1]?.value}
          </Text>
          <Text style={{ fontSize: 16 }}>
            {data?.healthReportDetailMeasures[0]?.measureUnit?.unitType}
          </Text>
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: "600",
            color: getStatusText(data?.healthReportDetailMeasures[0]?.status)?.color,
            textAlign: "center",
          }}>
            {getStatusText(data?.healthReportDetailMeasures[0]?.status)?.text}
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
    backgroundColor: "#caece6",
    elevation: 4, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  container: {
    flex: 1,
    flexWrap: "wrap",
  },
  value: {
    flex: 0.50,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  container1: {
    flex: 0.50,
    flexWrap: "wrap",
  },
  text: {
    flex: 1,
  },
  left: {
    flex: 0.50,
    gap: 10,
  },
});
