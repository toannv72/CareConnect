import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import plusIcon from "../../../../assets/profile_icons/plus.png";

export default function Avatar({ image, setImg }) {
  const [avatarSource, setAvatarSource] = useState(
    image ||
      "https://firebasestorage.googleapis.com/v0/b/careconnect-2d494.appspot.com/o/images%2F3be127ed-a90e-4364-8160-99338def0144.png?alt=media&token=3de8a6cb-0986-4347-9a22-eb369f7d02ff"
  );

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatarSource(result);
      setImg(result);
    }
  };
  return (
    <View style={styles.body}>
      <View style={styles.avatarContainer}>
        <Image
            source={{
              uri: avatarSource?.assets
                ? avatarSource?.assets[0]?.uri
                : avatarSource,
            }}
            style={styles.avatar}
        />
        <TouchableOpacity
          onPress={handleChoosePhoto}
          style={styles.iconContainer}
        >
          <Image source={plusIcon} style={styles.icon} />
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
    width: 130,
    height: 130,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "gray",
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
