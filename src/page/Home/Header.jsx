import React from 'react'

import ComAvatar from "../../Components/ComAvatar/ComAvatar";
import { StyleSheet, Text, View } from 'react-native';
export default function Header() {
  return (
    <View style={styles.header}>
      <ComAvatar />
      <View style={styles.text}>
        <Text>Xin chào!</Text>
        <Text style={styles.textName}>Thảo My</Text>
      </View>
      <ComAvatar />
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: 15,
    gap: 6,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom:10
  },
  text: {
    flex: 1,
  },
  textName: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
