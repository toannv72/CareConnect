import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text, Keyboard, ActivityIndicator } from 'react-native';
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from '@react-navigation/native';
import ComHeader from "../../../Components/ComHeader/ComHeader";
import ComButton from "../../../Components/ComButton/ComButton";
import ComPopup from "../../../Components/ComPopup/ComPopup";
import ComToast from "../../../Components/ComToast/ComToast";
import ComSelectedOneDate from "../../../Components/ComDate/ComSelectedOneDate";
import moment from "moment";
import { postData, getData } from "../../../api/api";
import Toast from 'react-native-toast-message';
import { useAuth } from "../../../../auth/useAuth";

export default function ServicePackageDetail({ }) {
  const today = moment().format("YYYY-MM-DD");
  const navigation = useNavigation();
  const route = useRoute();
  const serviceData = route.params?.data || {};
  const [selectedDate, setSelectedDate] = useState({});//cho calendar một giá trị mặc định là ngày hiện tại
  const [popupDate, setPopupDate] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

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

  const loginSchema = yup.object().shape({
    date: yup.date().required("Vui lòng chọn ngày đặt lịch"),
  });
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {},
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleCreateAppointment = (data) => {
    setLoading(true)
    Keyboard.dismiss();
    const formData = {
      ...data,
      name: "Lịch hẹn hoàn thành thủ tục đăng ký",
      content: "Lịch hẹn hoàn thành thủ tục đăng ký",
      notes: "Lịch hẹn hoàn thành thủ tục đăng ký",
      userId: user?.id,
      nursingPackageId: serviceData?.id,
      date: moment(data?.date).format("YYYY-MM-DD").toString(),
      type: "Consultation"
    };
    postData("/appointments", formData, {})
      .then((appointments) => {
        setLoading(false)
        handleClosePopupDate()
        navigation.navigate("ServicePackageRegisterSuccess", { data: formData });
      })
      .catch((error) => {
        handleClosePopupDate()
        setLoading(false)
        if (error.response.status === 624)
          ComToast({ text: 'Bạn đã có lịch hẹn vào ngày này. Vui lòng chọn ngày khác.' });
        else
          ComToast({ text: 'Đã có lỗi xảy ra, vui lòng thử lại.' });
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
            disable={serviceData?.state == "Deleted"}
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
              errors={errors}
              enabled={true}
              minDate={moment().add(1, 'day').toString()}
              maxDate={moment().add(14, 'days').toString()}
            />
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
                onPress={!loading ? handleSubmit(handleCreateAppointment) : null}
                style={{ flex: 1 }}>
                {loading ? <ActivityIndicator /> : "Xác nhận"}
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
    paddingTop: 5,
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