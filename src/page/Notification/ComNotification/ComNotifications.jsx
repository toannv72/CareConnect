import { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import ComTitle from "./../../../Components/ComTitle/ComTitle";

export default function ComNotification({ tile, data }) {
  return (
    <View style={styles.main}>
      <ComTitle style={{ fontSize: 24, marginBottom: 10 }}>{tile}</ComTitle>
      <View style={styles.contex}>
        {data?.map((value, index) => (
          <View
            key={index}
            style={[index !== data.length - 1 && styles.bodySeparator]}
          >
            <TouchableOpacity style={[styles.body]}>
              <Image
                source={{ uri: value?.img }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  objectFit: "fill",
                  borderWidth: 0.5,
                  borderColor: "#000",
                }}
              />

              <View style={styles?.container}>
                <Text
                  numberOfLines={2}
                  style={{ fontWeight: "bold", fontSize: 14 }}
                >
                  {value?.name}
                </Text>

                <Text>{value?.day}</Text>
                <Text style={{ color: "#33B39C" }}>Xem chi tiết</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  body: {
    flexDirection: "row",
    gap: 20,
    padding: 15,
    borderRadius: 10,
  },
  bodySeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "#33B39C",
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  contex: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
  },
});
