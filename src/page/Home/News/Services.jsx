import React, { useContext, useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import TopicContent from "../TopicContent";
import { LanguageContext } from "../../../contexts/LanguageContext";
// import ComSkeleton from "../../../Components/ComSkeleton/ComSkeleton";
import ComSelectButton from "../../../Components/ComButton/ComSelectButton";
import ComService from "./ComService";
import { postData, getData } from "../../../api/api";

export default function Services() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    text: { Home },
  } = useContext(LanguageContext);
  const [select, setSelect] = useState(true);
  const [select1, setSelect1] = useState(false);
  const check = () => {
    setSelect(true);
    setSelect1(false);
  };
  const check1 = () => {
    setSelect(false);
    setSelect1(true);
  };

  useEffect(() => {
    setLoading(!loading);
    getData('/service-package?PageSize=5&SortColumn=totalOrder&SortDir=Desc', {})
      .then((packageData) => {
        setData(packageData?.data?.contends);
        setLoading(loading);
      })
      .catch((error) => {
        console.error("Error fetching service-package:", error);
        setLoading(loading);
      });
  }, [])

  return (
    <View style={styles?.body}>
      <TopicContent>{Home?.services}</TopicContent>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <View style={styles?.buttonContainer}>
          <ComSelectButton onPress={check} check={select}>
            Vui chơi
          </ComSelectButton>
          <ComSelectButton onPress={check1} check={select1}>
            Sức khỏe
          </ComSelectButton>

        </View>
      </ScrollView>
      {/* <ComSkeleton
        show={loading}
        image={true}
        lines={5}> */}
      {data.map((value, index) => (
        <ComService key={index} data={value}></ComService>
      ))}
      {/* </ComSkeleton> */}
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 15,
    marginTop: 10
  },
  comCatalogue: {
    flexDirection: "row",
    gap: 30,
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    flexWrap: "wrap",
    marginBottom: 10,
  },
});
