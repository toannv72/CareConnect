import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComButton from "../../Components/ComButton/ComButton";
import ComPopup from "../../Components/ComPopup/ComPopup";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "../../Components/ComInput/ComInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";

export default ContractDetail = () => {
  const [popup, setPopup] = useState(false);
  const navigation = useNavigation();
  const handleClosePopup = () => {
    setPopup(false);
  };
  const handleOpenPopup = () => {
    setPopup(true);
  };
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
        // buttons={[
        //   { text: "Hủy", onPress: handleClosePopup, check: true },
        //   {
        //     text: "Xác nhận",
        //     onPress: () => {
        //       handleSubmit(handleConfirm);
        //     },
        //   },
        // ]}
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

      <View style={styles.main}>
        <ComHeader
          showBackIcon={true}
          showTitle={true}
          title={"Chi tiết hợp đồng"}
        />
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          Thông tin hợp đồng
        </Text>
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
            <Text style={styles.text}>Mã hợp đồng</Text>
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
        <ComButton onPress={handleOpenPopup}>Yêu cầu gia hạn</ComButton>
        <ComButton>Yêu cầu hủy</ComButton>
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
    fontSize: 20,
    fontWeight: "bold",
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
