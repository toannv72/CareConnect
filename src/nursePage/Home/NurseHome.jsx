import React, { useContext, useCallback, useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, ScrollView, Alert } from "react-native";
import Header from "./Header";
import ComButton from "../../Components/ComButton/ComButton";
import Catalogue from "./Catalogue/Catalogue";
import { useAuth } from "../../../auth/useAuth";
import { postData, getData } from "../../api/api";
import nurseHome from "../../../assets/images/nurseHome/nurseHome.png"
import { LanguageContext } from "../../contexts/LanguageContext";
import { useFocusEffect } from '@react-navigation/native';
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

async function registerForPushNotificationsAsync() {

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert("Permission not granted", "Failed to get push token for push notification!");
      return;
    }
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        Alert.alert("Project ID not found", "Project ID not found in configuration.");
        return;
      }
      const pushTokenData = await Notifications.getExpoPushTokenAsync({ projectId });
      return pushTokenData.data;
    } catch (error) {
      Alert.alert("Failed to get push token", error.message);
    }
  } else {
    Alert.alert("Physical device required", "Must use physical device for push notifications.");
  }
}

export default function NurseHome({ navigation }) {
  const { user, setUser, login } = useAuth();
  const [expoPushToken, setExpoPushToken] = useState("");
  
  const {
    text: {
      NurseHome,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);

  useEffect(() => {
    const fetchPushToken = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        setExpoPushToken(token ?? "");
      } catch (error) {
        Alert.alert("Error", `${error}`);
      }
    };

    fetchPushToken();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (expoPushToken !== "") {
        postData("/devices", { token: expoPushToken })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error("API devices Error: ", error?.message);
          });
        getData("/users/profile")
          .then((userData) => {
            login(userData?.data, expoPushToken);
            setUser(userData?.data);
          })
          .catch((error) => {
            console.error("Error fetching user profile:", error);
          });
      }
    }, [expoPushToken])
  );

  return (
    <View style={styles.container}>
      <Header  user={user}/>
      <ScrollView>
        <View style={styles.imageBody}>
          <Image
            source={nurseHome}
            style={styles.image}
          ></Image>
        </View>
        <ComButton
          style={[styles.button, styles.absoluteButton]}
          onPress={() => navigation.navigate("CareSchedule")}
        >
          Kiểm tra ngay
        </ComButton>
        <View style={styles.body}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>{NurseHome.catalogue}</Text>
          <Catalogue></Catalogue>
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  body: {
    paddingHorizontal: 20,
  },
  button: {
    width: "37%",
    height: 40,
    paddingVertical: 5,
    justifyContent: "center",
    marginLeft: 50,
    borderRadius: 100,
  },
  imageBody: {
    borderRadius: 10,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25
  },
  image: {
    resizeMode: "cover",
  },
  absoluteButton: {
    position: 'absolute',
    top: 125
  },
});

