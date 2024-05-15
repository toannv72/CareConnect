import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native";
import selecDay from "../../../assets/icon/selecDay.png";

export default function ComButtonDay({ children, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
      <Image
        source={selecDay}
        style={{ width: 14, height: 10, objectFit: "fill", marginTop: 2 }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: "#33B39C",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
