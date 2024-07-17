import React, { useContext, useState, useCallback } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ComVisitationSchedule from "./ComVisitationSchedule";
import { LanguageContext } from "./../../contexts/LanguageContext";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ScrollView } from "react-native";
import ComLoading from "../../Components/ComLoading/ComLoading";
import Visitation from "../../../assets/images/VisitationSchedule/VisitationSchedule.png";
import plusIcon from "../../../assets/profile_icons/plus.png";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { postData, getData } from "../../api/api";
import { useAuth } from "../../../auth/useAuth";
import ComNoData from "../../Components/ComNoData/ComNoData";
import CategoryButtons from '../../Components/ComCategories/ComCategories';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";

export default function VisitationSchedule() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [select, setSelect] = useState(false);
  const { user } = useAuth();
  const categories = ["FollowUpVisit", "Consultation", "ProcedureCompletion"];

  const searchSchema = yup.object().shape({
    search: yup.string(),
  });
  const navigation = useNavigation();
  const {
    text: {
      visitationText,
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

  const check = () => {
    setSelectedCategory(null)
    setSelect(false);
  };

  const handleCategorySelect = (value) => {
    setSelectedCategory(value);
    setSelect(true);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'FollowUpVisit':
        return { text: 'Thăm nuôi', color: 'green' };
      case 'ProcedureCompletion':
        return { text: 'Gia hạn hợp đồng', color: 'red' };
      case 'Consultation':
        return { text: 'Thủ tục', color: 'red' };
      default:
        return status;
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true)
      let url = `/appointments?UserId=${user?.id}&SortColumn=date&SortDir=Desc`;
      if (selectedCategory) { url += `&Type=${selectedCategory}` }
      getData(url, {})
        .then((appointments) => {
          setData(appointments?.data?.contends);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching service-package:", error);
        });
    }, [user?.id, selectedCategory])
  );
  return (
    <>
      <ComHeader
        title={"Lịch hẹn"}
        showTitle
        showBackIcon
      />
      <View style={styles.body}>
        <View style={{ gap: 10, marginBottom: 15 }}>
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
            {visitationText?.visitationContent}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#000",
              paddingHorizontal: 5,
              fontSize: 20,
            }}
          >
            {visitationText?.textHistory}
          </Text>
          <TouchableOpacity style={styles.register} onPress={register}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
              <Image
                source={plusIcon}
                style={{
                  height: 25,
                  width: 25,
                  objectFit: "fill",
                }}
              />
              <Text
                style={{
                  color: "#000",
                  paddingHorizontal: 5,
                  fontSize: 18,
                }}
              >
                Đăng ký thăm nuôi
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles?.scrollView}
        >
          <View style={styles?.buttonContainer}>
            <ComSelectButton onPress={check} check={select}>
              Tất cả
            </ComSelectButton>
            {categories.map((category) => (
              <ComSelectButton
                key={category}
                onPress={() => handleCategorySelect(category)}
                check={selectedCategory === category ? false : true}
              > {getStatusText(category).text} </ComSelectButton>
            ))}
          </View>
        </ScrollView>
        <ComLoading show={loading}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {data?.length > 0 ? (
              <View>
                {data?.map((value, index) => (
                  <ComVisitationSchedule key={index} data={value} />
                ))}
              </View>
            ) : (<ComNoData>Không có dữ liệu</ComNoData>)}
            <View style={{ height: 320 }}></View>
          </ScrollView>
        </ComLoading>
      </View>
    </>

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
    padding: 5,
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
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    // flexWrap: "wrap",
    marginBottom: 10,
  },
  scrollView: {
    flexGrow: 0,
    flexShrink: 0,
  },
});
