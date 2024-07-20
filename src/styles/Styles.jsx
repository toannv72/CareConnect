import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";

const Styles = ({ children }) => {
  return <View style={styles.app}>{children}</View>;
};

const colors = {
  primary: '#33B39C',
  cardBackground: '#F7FFFE',
  cardBorder: '#ACDED3',
  background: '#2ecc71',
  text: '#2c3e50',
  // Thêm các màu khác nếu cần
};


const stylesApp = StyleSheet.create({
  app: {
    // flex: 1,
  },
  shadow: {
    elevation: 7, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  }
});
export { colors, stylesApp, Styles };