import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useCallback  } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import editIcon from "../../../assets/profile_icons/edit.png";
import { useStorage } from "../../hooks/useLocalStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HeaderUser() {
  const navigation = useNavigation();
  const [user, setUser] = useStorage("user", {});

  const edit = () => {
    navigation.navigate("EditProfile");
  };
  const DetailProfile = () => {
    navigation.navigate("DetailProfile");
    
  }

  const loadUser = useCallback(async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Failed to load user data", error);
    }
  }, []);

  // Load user data when the screen is focused
  useFocusEffect(() => {
    loadUser();
  });


  return (
    <View style={styles.body}>
      <TouchableOpacity style={styles.container} onPress={DetailProfile}>
        <Image
          source={{
            uri: user?.avatarUrl
          }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{user?.fullName}</Text>
          <Text style={styles.phone}>{user?.phoneNumber}</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={edit}>
          <Image
            source={editIcon} // Thay thế bằng đường dẫn đến icon chỉnh sửa
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
    width: 60,
    height: 60,
    borderRadius: 35,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
  },
  phone: {
    fontSize: 16,
    color: "#555",
  },
  editButton: {
    padding: 10,
  },
  editIcon: {
    width: 30,
    height:30,
  },
});
