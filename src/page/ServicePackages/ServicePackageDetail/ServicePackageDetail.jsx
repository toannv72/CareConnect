import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from '@react-navigation/native';
import ComHeader from "../../../Components/ComHeader/ComHeader";
import ComButton from "../../../Components/ComButton/ComButton";
import ComPopup from "../../../Components/ComPopup/ComPopup";
import ComSelectedOneDate from "../../../Components/ComDate/ComSelectedOneDate";
import moment from "moment";

export default function ServicePackageDetail({ }) {
  const today = moment().format("YYYY-MM-DD");
  const navigation = useNavigation();
  const route = useRoute();
  const serviceData = route.params?.data || {};
  const [selectedDate, setSelectedDate] = useState(today);//cho calendar một giá trị mặc định là ngày hiện tại
  const [popupDate, setPopupDate] = useState(false);

  const {
    text: { servicePackages },
    setLanguage,
  } = useContext(LanguageContext);

  const handleClosePopupDate = () => {
    setSelectedDate(today) // set lại giá trị selectedDate để đồng bộ UI
    setPopupDate(false);//đóng popup calendar
  };
  const handleOpenPopupDate = () => {
    setPopupDate(true);
  };
  const changeSelectedDate = (data) => {
    setSelectedDate(data);
  };
  const formatCurrency = (number) => {
    // Sử dụng hàm toLocaleString() để định dạng số
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const loginSchema = yup.object().shape({
    name: yup.string().trim().required("Vui lòng nhập tên người đại diện"),
  });
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      name: "",
    },
  });
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  return (
    <>
      <ComHeader
        showBackIcon
        showTitle
        title={servicePackages?.detail?.title}
      />
      <View style={styles?.body}>
        <Image
          source={{ uri: serviceData?.img }}
          style={{
            height: 200,
            objectFit: "fill",
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles?.content}>
            <Text style={styles?.title}>{serviceData?.text}</Text>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {formatCurrency(serviceData?.money)}
              </Text>
              <Text style={{ fontSize: 16 }}>
                /tháng
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {servicePackages?.package?.living}
              </Text>
              <Text style={{ fontSize: 16 }}>
                : {serviceData?.people} người
              </Text>
            </View>
            <View >
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {servicePackages?.detail?.description}:
              </Text>
              <Text style={{ fontSize: 16 }}>
                {serviceData?.description}
              </Text>
            </View>
            <View >
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {servicePackages?.detail?.service}:
              </Text>
              {
                serviceData?.services.map((item, index) => (
                  <Text style={{ fontSize: 16 }} key={index}>
                    • {item}
                  </Text>
                ))
              }
            </View>
          </View>
        </ScrollView>
        <View style={styles?.content}>
          <ComButton
            onPress={handleOpenPopupDate}
          >
            {servicePackages?.detail?.registerForm}
          </ComButton>
        </View>
      </View>

      <ComPopup
        visible={popupDate}
        title="Chọn ngày hẹn"
      >
        <Text style={{ color: "#A3A3A3", textAlign: "center" }}> {servicePackages?.popup?.signContractSubTitle}</Text>
        <Text style={{ color: "#A3A3A3", textAlign: "center" }}>{servicePackages?.popup?.limitDays}</Text>
        <FormProvider {...methods}>
          <View style={{ width: "100%", gap: 10 }}>
            <ComSelectedOneDate date={changeSelectedDate} />
            <View
              style={{
                backgroundColor: "#fff",
                flexDirection: "row",
                justifyContent: "space-around",
                gap: 25
              }}
            >
              <ComButton
                check
                onPress={handleClosePopupDate}
                style={{ flex: 1 }}>
                Hủy
              </ComButton>
              <ComButton
                onPress={() => {
                  navigation.navigate("ServicePackageRegisterSuccess", { date: selectedDate });
                }}
                style={{ flex: 1 }}>
                Xác nhận
              </ComButton>
            </View>
          </View>
        </FormProvider>
      </ComPopup>
    </>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center"
  },
  content: {
    marginVertical: 20,
    gap: 10,
    paddingHorizontal: 20,
  }
})