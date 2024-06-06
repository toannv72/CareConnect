import React from 'react'
import ComAvatar from "../../Components/ComAvatar/ComAvatar";
import { StyleSheet, Text, View, Image } from 'react-native';
import search from "../../../assets/icon/search.png";

export default function Header() {
  return (
    <View style={styles.header}>
      <ComAvatar />
      <View style={styles.text}>
        <Text>Xin chào!</Text>
        <Text style={styles.textName}>Thảo My</Text>
      </View>
      <Image
        source={search}
        style={{
          width: 50,
          height: 50,
          borderRadius: 10,
          objectFit: "fill",
          borderColor: "#000",
        }}
      />
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
    marginLeft: 10
  },
  textName: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
