import React from "react";
import { Image, StyleSheet, View } from "react-native";
import avata from "../../../assets/avata.png";

export default function ComAvatar({ link }) {
  return (
    <View>
      {link ? (
        <Image source={{ uri: link }} style={styles.image} />
      ) : ( 
        <Image source={avata} style={styles.image} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 58,
    height: 58,
    objectFit: "fill",
  },
});
