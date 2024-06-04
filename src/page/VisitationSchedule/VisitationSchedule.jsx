import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComButton from "../../Components/ComButton/ComButton";
import { useNavigation } from "@react-navigation/native";

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
    const navigation = useNavigation();
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

  const register = () => {
    navigation.navigate("RegisterVisitation");

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
    paddingTop: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    gap: 10,
  },
  register: {
    flexDirection: "row",
    marginBottom: 10,
    padding: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
    backgroundColor: "#caece6",

    elevation: 4, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
