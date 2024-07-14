import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Keyboard } from "react-native";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComButton from "../../Components/ComButton/ComButton";
import ComPopup from "../../Components/ComPopup/ComPopup";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "../../Components/ComInput/ComInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComSelectedOneDate from "../../Components/ComDate/ComSelectedOneDate";
import moment from "moment";
import ContractImg from "../../../assets/images/Contract/Contract.png";
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../../../auth/useAuth";
import { postData, getData } from "../../api/api";
import ComLoading from "../../Components/ComLoading/ComLoading";

export default ContractDetail = () => {
  const today = moment().format("YYYY-MM-DD");
  const { user } = useAuth();
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popupDate, setPopupDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");//cho calendar một giá trị mặc định là ngày hiện tại
  console.log("setSelectedDate", selectedDate);

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const handleClosePopup = () => {
    reset();
    setPopup(false);
    setSelectedDate("")
  };
  const handleOpenPopup = () => {
    setPopup(true);
  };
  const handleClosePopupDate = () => {
    setPopupDate(false);
    reset();
    setSelectedDate("")
  };
  const handleOpenPopupDate = () => {
    setPopupDate(true);
  };

  const changeSelectedDate = (data) => {
    setSelectedDate(data);
  };

  const {
    text: {
      servicePackages,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);

  const loginSchema =yup.object().shape({
    // reason: yup.string().trim().required("Vui lòng nhập lý do"),
    date: yup.string().trim()
  })

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      reason: "",
      date: ""
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const handleConfirm = (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    handleClosePopup()
    navigation.navigate("ContractCandSuccess");
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Valid':
        return { text: 'Còn hạn', color: 'green' };
      case 'Cancelled':
        return { text: 'Đã hủy', color: 'red' };
      case 'Invalid':
        return { text: 'Hết hạn', color: 'red' };
      case 'Pending':
        return { text: 'Đang chờ' };
      default:
        return status;
    }
  };

  const status = getStatusText(data?.status);

  useEffect(() => {
    // Lấy danh sách sản phẩm
    setLoading(!loading);
    getData(`/contract/${id}`, {})
      .then((contract) => {
        setLoading(loading);
        setData(contract?.data);
      })
      .catch((error) => {
        console.log("Error fetching service-package:", error);
        setLoading(loading);
      });
  }, [])

  const handleCreateAppointment = (data) => {
    console.log("handleCreateAppointment", data);
    console.log("selectedDate", selectedDate);

    Keyboard.dismiss();
    const formData = {
      ...data,
      name: "Lịch hẹn hoàn thành thủ tục",
      content: "Lịch hẹn hoàn thành thủ tục",
      notes: data?.reason,
      userId: user?.id,
      date: moment(data?.date).format("YYYY-MM-DD").toString(),
    };
    setSelectedDate("")
    postData("/appointments", formData, {})
      .then((appointments) => {
        handleClosePopupDate()
        handleClosePopup()
        if (data?.reason != "")
          navigation.navigate("ContractCandSuccess", { data: formData });
        else
          navigation.navigate("ContractRenewSuccess", { data: formData });
      })
      .catch((error) => {
        handleClosePopup()
        handleClosePopupDate()
        console.log("Error registering:", error);
        showToast("error", "Đã có lỗi xảy ra, vui lòng thử lại", "", "bottom")
      });
  };

  const endDate = moment(data?.endDate);
  const isWithinOneMonth = endDate.isValid() && endDate.diff(moment(), 'days') <= 30;

  return (
    <>
      <ComPopup
        visible={popup}
        title="Bạn muốn yêu cầu hủy hợp đồng ?"
        onClose={handleClosePopup}
      >
        <FormProvider {...methods}>
          <View style={{ width: "100%", gap: 10 }}>
            <Text style={{ color: "#A3A3A3", textAlign: "center" }}>Thủ tục sẽ chính thức được hoàn tất khi bạn đến Viện vào ngày hẹn và đón người thân về nhà</Text>
            <ComInput
              label={"Xin cho chúng tôi biết lý do "}
              placeholder={"Lý do"}
              name="reason"
              control={control}
              keyboardType="default" // Set keyboardType for First Name input
              errors={errors} // Pass errors object
              required
            />
            <View
              style={{
                backgroundColor: "#fff",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <ComButton check onPress={handleClosePopup}>
                Hủy
              </ComButton>
              <ComButton onPress={handleSubmit(handleCreateAppointment)}>
                Xác nhận
              </ComButton>
            </View>
          </View>
        </FormProvider>
      </ComPopup>

      <ComPopup
        visible={popupDate}
        title="Chọn ngày hẹn"
        onClose={handleClosePopupDate}
      >
        <Text style={{ color: "#A3A3A3", textAlign: "center" }}>Bạn chỉ có thể hẹn trước 14 ngày tính từ hôm nay</Text>
        <FormProvider {...methods}>
          <View style={{ width: "100%", gap: 10 }}>
            <ComSelectedOneDate
              date={changeSelectedDate}
              name="date"
              control={control}
              errors={errors}
              enabled={true}
              minDate={moment().add(1, 'day').toString()} />
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
              <ComButton onPress={handleSubmit(handleCreateAppointment)}>
                Xác nhận
              </ComButton>
            </View>
          </View>
        </FormProvider>
      </ComPopup>

      <ComHeader
        showBackIcon={true}
        showTitle={true}
        title={"Chi tiết hợp đồng"}
      />
      <View style={styles.main}>
        <ComLoading show={loading}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <Image
                source={ContractImg}
                style={{
                  height: 100,
                  width: 100,
                  objectFit: "fill",
                }} />
            </View>
            <View style={styles.contex}>
              <View style={styles.bodySeparator}>
                <Text style={styles.text}>Hợp đồng</Text>
                <Text style={styles.text2}>{data?.name}</Text>
              </View>
              <View style={styles.bodySeparator}>
                <Text style={styles.text}>Mã hợp đồng</Text>
                <Text style={styles.text2}>{data?.id}</Text>
              </View>
              <View style={styles.bodySeparator}>
                <Text style={styles.text}>Người đại diện</Text>
                <Text style={styles.text2}>{data?.user?.fullName}</Text>
              </View>
              <View style={styles.bodySeparator}>
                <Text style={styles.text}>Người cao tuổi</Text>
                <Text style={styles.text2}>{data?.elder?.name}</Text>
              </View>
              <View style={styles.bodySeparator}>
                <Text style={styles.text}>Gói dưỡng lão</Text>
                <Text style={styles.text2}>{data?.nursingPackage?.name}</Text>
              </View>
              <View style={styles.bodySeparator}>
                <Text style={styles.text}>Ngày ký</Text>
                <Text style={styles.text2}> <ComDateConverter>{data?.signingDate}</ComDateConverter> </Text>
              </View>
              <View style={styles.bodySeparator}>
                <Text style={styles.text}>Ngày bắt đầu</Text>
                <Text style={styles.text2}> <ComDateConverter>{data?.startDate}</ComDateConverter> </Text>
              </View>
              <View style={styles.bodySeparator}>
                <Text style={styles.text}>Ngày kết thúc</Text>
                <Text style={styles.text2}> <ComDateConverter>{data?.endDate}</ComDateConverter> </Text>
              </View>
              <View style={styles.bodySeparator2}>
                <Text style={styles.text}>Trạng thái</Text>
                <Text style={[styles.text2, { color: status?.color }]}>{status?.text}</Text>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              backgroundColor: "#fff",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 20,
              gap: 20
            }}
          >{isWithinOneMonth && (
            <ComButton onPress={handleOpenPopupDate} style={{ flex: 1 }}>Yêu cầu gia hạn</ComButton>
          )}
            <ComButton onPress={handleOpenPopup} style={{ flex: 1 }}>Yêu cầu hủy</ComButton>
          </View>
        </ComLoading>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    gap: 15,
  },

  bodySeparator: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#33B39C",
    alignItems: "center",
    marginHorizontal: 15,
  },
  bodySeparator2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  text: {
    flex: 0.35,
    fontSize: 16,
    fontWeight: "600",
  },
  text2: {
    fontSize: 16,
    flex: 0.65,
    textAlign: "right"
  },
  contex: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
    paddingHorizontal: 5,
    paddingVertical: 10
  },
});
