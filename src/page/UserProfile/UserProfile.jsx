import React from "react";
import { StyleSheet, View } from "react-native";
import HeaderUser from "./HeaderUser";
import MenuList from "./MenuList";

export default function UserProfile() {
  const data = [
    {
      name: "Hợp đồng",
      link: "",
      icon: "",
    },
    {
      name: "Hóa đơn",
      link: "",
      icon: "",
    },
    {
      name: "Lịch sử dịch vụ",
      link: "",
      icon: "",
    },
  ];
  const data2 = [
    {
      name: "Đổi mật khẩu",
      link: "",
      icon: "",
    },
    {
      name: "Đổi ngôn ngữ",
      link: "",
      icon: "",
    },
    {
      name: "Thông báo",
      link: "",
      icon: "",
    },
    {
      name: "Đánh giá",
      link: "",
      icon: "",
    },
  ];
  return (
    <View style={styles.body}>
      <HeaderUser />
      <MenuList data={data} />
      <MenuList data={data2} />
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    gap: 10,
  },
  imageBody: {
    padding: 1,
    borderRadius: 10,
    borderWidth: 0.5,
    overflow: "hidden", // Ẩn phần ảnh nằm ngoài
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "180%",
    height: "180%",
    resizeMode: "cover",
    bottom: -50,
  },
});
