import React, { useContext, useCallback } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import Header from "./Header";
import ComButton from "../../Components/ComButton/ComButton";
import Catalogue from "./Catalogue/Catalogue";
import { useAuth } from "../../../auth/useAuth";
import { postData, getData } from "../../api/api";
import nurseHome from "../../../assets/images/nurseHome/nurseHome.png"
import { LanguageContext } from "../../contexts/LanguageContext";
import { useFocusEffect } from '@react-navigation/native';

export default function NurseHome({ navigation }) {
  const { user, setUser, login } = useAuth();

  const {
    text: {
      NurseHome,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);

  useFocusEffect(
    useCallback(() => {
      getData("/users/profile")
        .then((userData) => {
          login(userData?.data);
          setUser(userData?.data)
        })
        .catch((error) => {
          console.error("Error getData fetching items:", error);
        });
    }, [])
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

