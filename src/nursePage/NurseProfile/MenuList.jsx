import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import bill from "../../../assets/profile_icons/bill.png";
import { useAuth } from "../../../auth/useAuth";
import { postData, deleteData } from "../../api/api";
import ComToast from "../../Components/ComToast/ComToast";

const MenuItem = ({ iconName, text, link, colorRed }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { logout, expoPushToken } = useAuth();
  const deleteToken = async () => {
    try {
      await deleteData(`/devices`, "", { token: expoPushToken });
      console.log("Delete expoPushToken successfully");
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("API Delete expoPushToken Error: ", error);
    }
  };
  const press = async () => {
    if (colorRed) {
      setLoading(true)
      await deleteToken(); // Wait for deleteToken to complete
      await logout(); // Call logout after deleteToken is successful
      ComToast({ text: 'Đăng xuất thành công' });
    }
    navigation.navigate(link);
  };
  return (
    <TouchableOpacity style={styles.menuItem} onPress={() => press()}>
      <Image source={iconName} style={styles.image} />
      {colorRed ? (
        <Text style={{ fontSize: 18, color: "red", fontWeight: "500" }}>
          {loading ? <ActivityIndicator /> : text}
        </Text>
      ) : (
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const MenuList = ({ data, colorRed }) => {
  return (
    <View style={styles.container}>
      {data.map((value, index) => (
        <MenuItem
          key={index}
          colorRed={colorRed}
          iconName={value.icon}
          text={value.name}
          link={value.link}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff", // Màu nền xám nhạt
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    gap: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
  text: {
    fontSize: 16,
  },
});

export default MenuList;
