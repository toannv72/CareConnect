import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Hoặc thư viện icon khác

const MenuItem = ({ iconName, text, link }) => {
  const navigation = useNavigation();

  const press = () => {
    navigation.navigate(link);
  };
  return (
    <TouchableOpacity style={styles.menuItem} onPress={() => press()}>
      <Icon name={iconName} size={24} color="#128C7E" style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const MenuList = ({ data }) => {
  return (
    <View style={styles.container}>
      {data.map((value, index) => (
        <MenuItem
          key={index}
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
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 15,
  },
  text: {
    fontSize: 16,
  },
});

export default MenuList;
