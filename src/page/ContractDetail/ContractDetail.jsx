import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
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

export default ContractDetail = () => {
  const today = moment().format("YYYY-MM-DD");
  const [popup, setPopup] = useState(false);
  const [popupDate, setPopupDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);//cho calendar một giá trị mặc định là ngày hiện tại
  const navigation = useNavigation();
  const handleClosePopup = () => {
    setPopup(false);
  };
  const handleOpenPopup = () => {
    setPopup(true);
  };
  const handleClosePopupDate = () => {
    setPopupDate(false);
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

  const loginSchema = yup.object().shape({
    text: yup.string().trim().required("Vui lòng nhập lý do"),
  });

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      text: "",
    },
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const handleConfirm = (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    handleClosePopup()
    navigation.navigate("ContractCandSuccess");
  };
  return (
    <>
      <ComPopup
        visible={popup}
        title="Bạn muốn yêu cầu hủy hợp đồng ?"
        onClose={handleClosePopup}
      >
        <Text>Gói dịch vụ sẽ không tự động gia hạn lại</Text>
        <FormProvider {...methods}>
          <View style={{ width: "100%", gap: 10 }}>
            <ComInput
              label={"Xin cho chúng tôi biết lý do "}
              placeholder={"Lý do"}
              name="text"
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
              <ComButton onPress={handleSubmit(handleConfirm)}>
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
            <ComSelectedOneDate date={changeSelectedDate} />
            {console.log("selectedDate", selectedDate)}
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
                  navigation.navigate("ContractRenewSuccess", { date: selectedDate });
                }}
                style={{ flex: 1 }}>
                Xác nhận
              </ComButton>
            </View>
          </View>
        </FormProvider>
      </ComPopup>

      <View style={styles.main}>
        <ComHeader
          showBackIcon={true}
          showTitle={true}
          title={"Chi tiết hợp đồng"}
        />
        <View style={{ alignItems: 'center', marginVertical: 30 }}>
          <Image
            source={ContractImg}
            style={{
              height: 120,
              width: 120,
              objectFit: "fill",
            }} />
        </View>
        <View style={styles.contex}>
          <View style={styles.bodySeparator}>
            <Text style={styles.text}>Hợp đồng</Text>
            <Text style={styles.text2}>Hợp đồng</Text>
          </View>
          <View style={styles.bodySeparator}>
            <Text style={styles.text}>Mã hợp đồng</Text>
            <Text style={styles.text2}>Hợp đồng</Text>
          </View>
          <View style={styles.bodySeparator}>
            <Text style={styles.text}>Tên người đại diện</Text>
            <Text style={styles.text2}>Hợp đồng</Text>
          </View>
          <View style={styles.bodySeparator}>
            <Text style={styles.text}>Tên người lớn tuổi</Text>
            <Text style={styles.text2}>Hợp đồng</Text>
          </View>
          <View style={styles.bodySeparator}>
            <Text style={styles.text}>Mối quan hệ</Text>
            <Text style={styles.text2}>Hợp đồng</Text>
          </View>
          <View style={styles.bodySeparator}>
            <Text style={styles.text}>Thời hạn</Text>
            <Text style={styles.text2}>8/10/2022 - 8/10/2023</Text>
          </View>
          <View style={styles.bodySeparator2}>
            <Text style={styles.text}>Trạng thái</Text>
            <Text style={styles.text2}>Nguyễn văn toàn</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingBottom: 20,
        }}
      >
        <ComButton onPress={handleOpenPopupDate}>Yêu cầu gia hạn</ComButton>
        <ComButton onPress={handleOpenPopup}>Yêu cầu hủy</ComButton>
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

    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
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
    fontSize: 16,
    fontWeight: "600",
  },
  text2: {
    fontSize: 16,
  },
  contex: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
  },
});
