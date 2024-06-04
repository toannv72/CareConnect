import React, { useContext } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import TopicContent from "../TopicContent";
import { LanguageContext } from "../../../contexts/LanguageContext";

export default function ComCatalogue({ img, url, children }) {
  const {
    text: { Home },
  } = useContext(LanguageContext);
  return (
    <View style={styles?.body}>
      <Image
        source={url}
        style={{
          width: 59,
          height: 59,
          borderRadius: 10,
          objectFit: "fill",
          borderColor: "#000",
        }}
      />
      <Text style={styles?.text}>{children}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    padding: 5,
    gap: 10,
    // justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000",
    fontSize: 12,
    width: 59,
    fontWeight: "bold",
    textAlign: "center",
  },
});
