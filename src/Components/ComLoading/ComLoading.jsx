import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function ComLoading({ children, show }) {
  return (
    <View>
      {show ? (
        <ActivityIndicator size="large" color="#33B39C" />
      ) : (
        <View>{children}</View>
      )}
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
