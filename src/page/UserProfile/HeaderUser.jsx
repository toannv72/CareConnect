import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HeaderUser() {
  const navigation = useNavigation();

  const edit = () => {
    navigation.navigate("EditProfile");
  };
  const DetailProfile = () => {
    navigation.navigate("DetailProfile");
    
  }
  return (
    <View style={styles.body}>
      <TouchableOpacity style={styles.container} onPress={DetailProfile}>
        <Image
          source={{
            uri: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
          }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>Cao Văn B</Text>
          <Text style={styles.phone}>0909799799</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={edit}>
          <Image
            source={require("../../../assets/icon/backArrowWhite.png")} // Thay thế bằng đường dẫn đến icon chỉnh sửa
            style={styles.editIcon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  phone: {
    fontSize: 16,
    color: "#555",
  },
  editButton: {
    padding: 10,
  },
  editIcon: {
    width: 20,
    height: 20,
    backgroundColor: "#000",
  },
});
