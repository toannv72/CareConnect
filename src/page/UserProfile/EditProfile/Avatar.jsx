import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";

export default function Avatar() {
  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatarSource(result);
    }
  };
  return (
    <View style={styles.body}>
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
          }}
          style={styles.avatar}
        />
        <TouchableOpacity
          onPress={handleChoosePhoto}
          style={styles.iconContainer}
        >
          <Image
            source={{
              uri: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
            }} 
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 170,
    height: 170,
    borderRadius: 1000,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 1000,
  },
  avatarContainer: {
    position: "relative", // Quan trọng!
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    position: "absolute", // Quan trọng!
    bottom: 0,
    right: 0,
  },

});
