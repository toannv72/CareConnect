import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ComVisitationSchedule from "./ComVisitationSchedule";
import { LanguageContext } from "./../../contexts/LanguageContext";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComInputSearch from "../../Components/ComInput/ComInputSearch";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";
import ComLoading from "../../Components/ComLoading/ComLoading";
import Visitation from "../../../assets/VisitationSchedule/VisitationSchedule.png";

export default function VisitationSchedule() {
  const [data, setData] = useState([
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      color: "#F7E863",
      text: "Gói cơ bản",
      context: "Cung cấp tất cả các dịch vụ cần thiết cho người thân của bạn",
      people: 2,
      money: 1000000000,
    },
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      color: "#8DF7AB",
      text: "Gói cơ bản",
      context: "Cung cấp tất cả các dịch vụ cần thiết cho người thân của bạn",
      people: 2,
      money: 100000000,
    },
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      color: "#F7E863",
      text: "Gói cơ bản",
      context: "Cung cấp tất cả các dịch vụ cần thiết cho người thân của bạn",
      people: 2,
      money: 1000000000,
    },
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      color: "#8DF7AB",
      text: "Gói cơ bản",
      context: "Cung cấp tất cả các dịch vụ cần thiết cho người thân của bạn",
      people: 2,
      money: 100000000,
    },
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      color: "#F7E863",
      text: "Gói cơ bản",
      context: "Cung cấp tất cả các dịch vụ cần thiết cho người thân của bạn",
      people: 2,
      money: 1000000000,
    },
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      color: "#8DF7AB",
      text: "Gói cơ bản",
      context: "Cung cấp tất cả các dịch vụ cần thiết cho người thân của bạn",
      people: 2,
      money: 100000000,
    },
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      color: "#F7E863",
      text: "Gói cơ bản",
      context: "Cung cấp tất cả các dịch vụ cần thiết cho người thân của bạn",
      people: 2,
      money: 1000000000,
    },
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      color: "#8DF7AB",
      text: "Gói cơ bản",
      context: "Cung cấp tất cả các dịch vụ cần thiết cho người thân của bạn",
      people: 2,
      money: 100000000,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const searchSchema = yup.object().shape({
    search: yup.string(),
  });

  const {
    text: {
      Login,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);
  const methods = useForm({
    resolver: yupResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    setLoading(!loading);
  };
  return (
    <View style={styles.body}>
      <View style={{ gap: 10 }}>
        <View style={styles.imageBody}>
          <Image source={Visitation} style={styles.image} />
        </View>
        <Text
          style={{
            color: "#716767",
            textAlign: "center",
            paddingHorizontal: 20,
          }}
        >
          Hãy dùng chút thời gian đổi lấy nụ cười của những người thân yêu
        </Text>
      </View>
      <ComLoading show={loading}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View>
            {data?.map((value, index) => (
              <ComVisitationSchedule key={index} data={value} />
            ))}
          </View>
          <View style={{ height:320 }}></View>
        </ScrollView>
      </ComLoading>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    gap: 10,
  },
  imageBody: {
    padding: 1,
    borderRadius: 10,
    borderWidth: 0.5,
    overflow: "hidden", // Ẩn phần ảnh nằm ngoài
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "180%",
    height: "180%",
    resizeMode: "cover",
    bottom: -50,
  },
});
