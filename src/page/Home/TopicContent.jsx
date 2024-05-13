import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";

export default function TopicContent({ children }) {
    const {} = useContext(LanguageContext);
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
