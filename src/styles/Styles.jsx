import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";

export const Styles = ({ children }) => {
  return <View style={styles.app}>{children}</View>;
};
const styles = StyleSheet.create({
  app: {
    // flex: 1,
  },
});
