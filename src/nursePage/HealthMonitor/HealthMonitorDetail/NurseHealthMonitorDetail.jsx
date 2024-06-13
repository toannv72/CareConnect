import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, View, Text, SectionList } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { LanguageContext } from "../../../contexts/LanguageContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComPatient from "./ComPatient";
import { useRoute } from "@react-navigation/native";
import ComButtonDay from "../../../Components/ComButton/ComButtonDay";
import ComHealthIndex from "../../../Components/ComHealthIndex/ComHealthIndex";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import ComHeader from "../../../Components/ComHeader/ComHeader";

export default function NurseHealthMonitorDetail() {
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
  const {
    text: {
      HealthMonitorDetail,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);

  const onSubmit = (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  };
  const loginSchema = yup.object().shape({});

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    values: {
      email:
        "CácCác chỉ số bình thường nhưng cụ có dấu hiệu nhức mỏi,......Các chỉ số bình thường nhưng cụ có dấu hiệu nhức mỏi,......Các chỉ số bình thường nhưng cụ có dấu hiệu nhức mỏi,......Các chỉ số bình thường nhưng cụ có dấu hiệu nhức mỏi,...... chỉ số bình thường nhưng cụ có dấu hiệu nhức mỏi,......Các chỉ số bình thường nhưng cụ có dấu hiệu nhức mỏi,......Các chỉ số bình thường nhưng cụ có dấu hiệu nhức mỏi,......Các chỉ số bình thường nhưng cụ có dấu hiệu nhức mỏi,......Các chỉ số bình thường nhưng cụ có dấu hiệu nhức mỏi,......",
    },
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const ComTimeDivision =({ time }) => {
    return (
      <View style={{ flexDirection: "row", marginVertical: 10, gap: 10, alignItems: "center" }}>
        <Text style={{ fontSize: 16 }}>{time}</Text>
        <View style={{ borderBottomColor: "#33B39C", borderBottomWidth: 1, flex: 1, height: 0 }}></View>
      </View>
    );
  };

  return (
    <>
      <ComHeader
        // title={HealthMonitorDetail?.title}
        title={"NurseHealthMonitorDetail"}
        showTitle
        showBackIcon
      />
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
          <ComTimeDivision time={"Lần 1 - 08:00"}></ComTimeDivision>
          <ComHealthIndex></ComHealthIndex>
          <ComHealthIndex></ComHealthIndex>
          <ComHealthIndex></ComHealthIndex>
          <ComHealthIndex></ComHealthIndex>
          <ComHealthIndex></ComHealthIndex>
          <ComHealthIndex></ComHealthIndex>
          <ComTextArea
            label={"Ghi chú"}
            placeholder={"Ghi chú"}
            name="email"
            edit={false}
            control={control}
            keyboardType="default" // Set keyboardType for First Name input
            errors={errors}
          />
          <View style={{ height: 30 }}></View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 10,
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
