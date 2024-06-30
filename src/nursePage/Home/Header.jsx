import React from 'react'
import ComAvatar from "../../Components/ComAvatar/ComAvatar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import search from "../../../assets/icon/search.png";
import { useNavigation } from "@react-navigation/native";

export default function Header({ user }) {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15, alignItems: "center", }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("DetailProfile");
        }}
        style={styles.header}
      >
        <ComAvatar link={user?.avatarUrl} />
        <View style={styles.text}>
          <Text>Xin chào!</Text>
          <Text style={styles.textName}>{user?.fullName}</Text>
        </View>

      </TouchableOpacity>
      <Image
        source={search}
        style={{
          width: 50,
          height: 50,
          borderRadius: 10,
          objectFit: "fill",
          borderColor: "#000",
          flex: 1
        }}
      />
    </View>

  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    flex: 6
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