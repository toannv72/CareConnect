import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text, Keyboard } from 'react-native';
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
import { postData, getData } from "../../../api/api";
import Toast from 'react-native-toast-message';

export default function ServicePackageDetail({ }) {
  const today = moment().format("YYYY-MM-DD");
  const navigation = useNavigation();
  const route = useRoute();
  const serviceData = route.params?.data || {};
  const [selectedDate, setSelectedDate] = useState();//cho calendar một giá trị mặc định là ngày hiện tại
  const [popupDate, setPopupDate] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    text: { servicePackages },
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

  const showToast = (type, text1, text2, position) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      position: position
    });
  }

  const loginSchema = yup.object().shape({
    date: yup.date().required("Vui lòng chọn ngày đặt lịch"),
  });
  const methods = useForm({
    resolver: yupResolver(loginSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleCreateAppointment = (data) => {
    Keyboard.dismiss();
    const formData = {
      ...data,
      nursingPackageId: serviceData?.id,
      date: moment(data?.date).format("YYYY-MM-DD"), // Đảm bảo chuyển đổi ngày về định dạng chuẩn
    };
    postData("/appointments/RegisterPackage", formData, {})
      .then((data) => {
        handleClosePopupDate()
        navigation.navigate("ServicePackageRegisterSuccess", { data: data });
      })
      .catch((error) => {
        console.log("Error registering:", error);
        showToast("error", "Đã có lỗi xảy ra, vui lòng thử lại", "", "bottom")
      });
  };

  return (
    <>
      <ComHeader
        showBackIcon
        showTitle
        title={servicePackages?.detail?.title}
      />
      <View style={styles?.body}>
        <Image
          source={{ uri: serviceData?.imageUrl }}
          style={{
            height: 250,
            objectFit: "fill",
          }} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles?.content}>
            <Text style={styles?.title}>{serviceData?.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {formatCurrency(serviceData?.price)}
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
                : {serviceData?.capacity} người
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
          </View>
        </ScrollView>
        <View style={styles?.content}>
          <ComButton
            onPress={handleOpenPopupDate}>
            {servicePackages?.detail?.registerForm}
          </ComButton>
        </View>
      </View>

      <ComPopup
        visible={popupDate}
        title="Chọn ngày hẹn">
        <Text style={{ color: "#A3A3A3", textAlign: "center" }}> {servicePackages?.popup?.signContractSubTitle}</Text>
        <Text style={{ color: "#A3A3A3", textAlign: "center" }}>{servicePackages?.popup?.limitDays}</Text>
        <FormProvider {...methods}>
          <View style={{ width: "100%", gap: 10 }}>
            <ComSelectedOneDate
              date={changeSelectedDate}
              name="date"
              control={control}
              errors={errors} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                gap: 25
              }}>
              <ComButton
                check
                onPress={handleClosePopupDate}
                style={{ flex: 1 }}>
                Hủy
              </ComButton>
              <ComButton
                onPress={handleSubmit(handleCreateAppointment)}
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
    fontSize: 22,
    textAlign: "center"
  },
  content: {
    marginVertical: 20,
    gap: 10,
    paddingHorizontal: 20,
  }
})