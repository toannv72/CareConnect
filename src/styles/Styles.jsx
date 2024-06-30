import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";

const Styles = ({ children }) => {
  return <View style={styles.app}>{children}</View>;
};

const colors = {
  primary: '#33B39C',
  secondary: '#2ecc71',
  accent: '#e74c3c',
  background: '#ecf0f1',
  text: '#2c3e50',
  // Thêm các màu khác nếu cần
};


const stylesApp = StyleSheet.create({
  app: {
    // flex: 1,
  },
  shadow: {
    elevation: 5, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  }
});
export { colors, stylesApp, Styles };