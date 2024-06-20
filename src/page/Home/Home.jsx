import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import Header from "./Header";
import Catalogue from "./Catalogue/Catalogue";
import News from "./News/News";
import Services from "./News/Services";
import TopPlacesCarousel from "../../Components/ComImg/TopPlacesCarousel";
import { TOP_PLACES } from "../../../db";
import { useStorage } from "../../hooks/useLocalStorage";
import { useAuth } from "../../../auth/useAuth";
import { postData, getData } from "../../api/api";

export default function Home({ navigation }) {
  const [user, setUser] = useState({});
  const { login } = useAuth();

  useEffect(() => {
    // Lấy danh sách sản phẩm
    // setLoading(!loading);
    getData("/users/profile")
      .then((userData) => {
        login(userData?.data);
        setUser(userData?.data)
      })
      .catch((error) => {
        setLoading(false)
        console.error("Error getData fetching items:", error);
      });
  }, [])


  return (
    <View style={styles.container}>
      <Header user={user}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles?.scrollView}
      >
        <TopPlacesCarousel list={TOP_PLACES} />
        <Catalogue />
        <Services />
        <News />
        <View style={{ height: 120 }}></View>
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
});
