import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HeaderUser() {
    return (
      <View style={styles.body}>
        <TouchableOpacity style={styles.container}>
          <Image
            source={{
              uri: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
            }} // Thay thế bằng đường dẫn đến ảnh đại diện
            style={styles.avatar}
          />
          <View style={styles.info}>
            <Text style={styles.name}>Cao Văn B</Text>
            <Text style={styles.phone}>0909799799</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
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
