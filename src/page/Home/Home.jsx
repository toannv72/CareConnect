import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import Header from "./Header";
import Catalogue from "./Catalogue/Catalogue";
import News from "./News/News";
import TopPlacesCarousel from "../../Components/ComImg/TopPlacesCarousel";
import { TOP_PLACES } from "../../../db";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles?.scrollView}
      >
        <TopPlacesCarousel list={TOP_PLACES} />
        <Catalogue />
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
