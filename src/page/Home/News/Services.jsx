import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import TopicContent from "../TopicContent";
import { LanguageContext } from "../../../contexts/LanguageContext";
import ComButton from "../../../Components/ComButton/ComButton";
import ComSelectButton from "../../../Components/ComButton/ComSelectButton";
import ComNew from "./ComNew";

export default function Services() {
  const [data, setData] = useState([{}, {}, {}, {}, {}]);
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

      {data.map((value, index) => (
        <ComNew
          id={1}
          key={index}
          url={
            "https://i.pinimg.com/736x/65/c9/8e/65c98ee90bc6888757d3ff2f6c7e67e4.jpg"
          }
          context="Thực đơn dinh dưỡng"
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s.
        </ComNew>
      ))}
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
