import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";

export default function ComTitle({ children, style }) {
  return (
    <View style={styles.view}>
      <Text style={[styles.text, { ...style }]}>{children}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
    
  },
  view: {
    // padding: 8,
  },
});
