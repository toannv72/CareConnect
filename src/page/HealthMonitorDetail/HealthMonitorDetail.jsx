import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import ComInputSearch from "../../Components/ComInput/ComInputSearch";
import { LanguageContext } from "../../contexts/LanguageContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComPatient from "./ComPatient";
import { useRoute } from "@react-navigation/native";
import ComButtonDay from "../../Components/ComButton/ComButtonDay";

export default function HealthMonitorDetail() {
  const [data, setData] = useState({
    img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
    name: "Lê Hiếu Nghĩa Đệ Nhất ",
    age: "34",
    sex: "Nam",
    room: "17",
    bed: "3",
    id: 1,
  });

  const route = useRoute();
  const { id } = route.params;

  const onSubmit = (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  };
  return (
    <View style={styles.body}>
      <View style={styles.patient}>
        <View style={styles.patient60}>
          <ComPatient data={data} />
        </View>
        <View style={styles.patient40}>
          <ComButtonDay>8/8/2023</ComButtonDay>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles?.scrollView}
      >

        
        <View style={{ height: 120 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  patient: {
    flexDirection: "row",
  },
  patient60: {
    flex: 0.7,
  },
  patient40: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
});
