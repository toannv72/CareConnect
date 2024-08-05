import React, { useEffect, useState, useCallback, useContext } from "react";
import { StyleSheet, View, Text, ScrollView, Alert, Platform } from "react-native";
import Header from "./Header";
import Catalogue from "./Catalogue/Catalogue";
import News from "./News/News";
import Services from "./News/Services";
import { NotificationsContext } from '../../../src/contexts/NotificationsContext';
import TopPlacesCarousel from "../../Components/ComImg/TopPlacesCarousel";
import { TOP_PLACES } from "../../../db";
import { useAuth } from "../../../auth/useAuth";
import { postData, getData } from "../../api/api";
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

export default function Home({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const { user, setUser, login } = useAuth();
  const { updateNotifications } = useContext(NotificationsContext);

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

    getData(`/notifications`, {})
      .then((notifications) => {
        updateNotifications(notifications?.data?.contends)
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
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

      }
      getData("/users/profile")
        .then((userData) => {
          login(userData?.data, expoPushToken);
          setUser(userData?.data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }, [expoPushToken])
  );

  return (
    <View style={styles.container}>
      <Header user={user} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles?.scrollView}
      >
        <TopPlacesCarousel list={TOP_PLACES} />
        <Catalogue />
        <Services />
        {/* <News /> */}
        <View style={{ height: 120 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 40,
  },
});
