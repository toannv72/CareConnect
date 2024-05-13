import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ComNew({ id, url, children, context }) {
  const {
    text: { Home },
  } = useContext(LanguageContext);

  return (
    <TouchableOpacity style={styles?.body}>
      <Image
        source={{ uri: url }}
        style={{
          width: 126,
          height: 133,
          //   borderRadius: 10,
          objectFit: "fill",
          borderWidth: 0.5,
          borderColor: "#000",
        }}
      />
      <View style={styles.container}>
       <View>
         <Text style={styles.context}>{context}</Text>
         <Text numberOfLines={5} style={styles.children}>
           {children}
         </Text>
       </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  context: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  children: {
    fontSize: 14,
  },
});
