import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import plusIcon from "../../../../assets/profile_icons/plus.png";

export default function Avatar({ image, setImg }) {
  const [avatarSource, setAvatarSource] = useState(
    image ||
      "https://firebasestorage.googleapis.com/v0/b/swd-longchim.appspot.com/o/376577375_998270051209102_4679797004619533760_n.jpg?alt=media&token=90d94961-bc1b-46e4-b60a-ad731606b13b"
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
              : "https://firebasestorage.googleapis.com/v0/b/swd-longchim.appspot.com/o/376577375_998270051209102_4679797004619533760_n.jpg?alt=media&token=90d94961-bc1b-46e4-b60a-ad731606b13b",
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
    width: 170,
    height: 170,
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
