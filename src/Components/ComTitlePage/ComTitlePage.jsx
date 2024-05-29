import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";

export default function ComTitlePage({ children }) {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: "#33B39C",
    fontWeight: "bold",
    textAlign:'center'
  },
  view: {
    padding: 8,
  },
});
