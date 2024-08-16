import React, { useContext, useState } from "react";
import { Image, StyleSheet, View, Keyboard } from "react-native";
import ComTitlePage from "../../Components/ComTitlePage/ComTitlePage";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComTitle from "../../Components/ComTitle/ComTitle";
import ComButton from "../../Components/ComButton/ComButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import ComInputCode from "../../Components/ComInputCode/ComInputCode";
import { postData } from "../../api/api";
import { useStorage } from "../../hooks/useLocalStorage";
import ComToast from "../../Components/ComToast/ComToast";

export default function OtpForgetPassword() {
  const navigation = useNavigation();
  const route = useRoute();
  const { phone } = route.params;
  const [accessToken, setToken] = useStorage("accessToken", {});
  const [otpCode, setOtpCode] = useState("");

  const {
    text: { Otp },
    setLanguage,
  } = useContext(LanguageContext);

  const handleLogin = () => {
    if (!otpCode || otpCode.length !== 6) {
      console.log("Invalid OTP Code:", otpCode);
      ComToast({ text: 'Mã OTP không hợp lệ', position: 190 });
      return;
    }

    const requestData = {
      otp: otpCode,
      phoneNumber: phone,
    };
    Keyboard.dismiss();
    postData("/auth/verify-otp", requestData, {})
      .then((data) => {
        setToken(data?.accessToken);
        return new Promise((resolve) => {
          setTimeout(() => {
            navigation.navigate("ResetPassword", { phone: phone });
            resolve(); 
          }, 0); 
        });
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          ComToast({ text: 'OTP không hợp lệ!', position: 190 });
        } else {
          ComToast({ text: 'Đã có lỗi xảy ra. Vui lòng thử lại.', position: 190 });
          console.log(error?.response)
        }
      });
  };

  return (
    <View style={styles?.body}>
      <View style={styles?.container}>
        <ComTitlePage>{Otp?.pageTitle}</ComTitlePage>
        <View>
          <ComTitle
            style={{ fontSize: 13, textAlign: "center", fontWeight: "normal" }}
          >
            {Otp?.content}
          </ComTitle>
          <ComTitle
            style={{ fontSize: 13, textAlign: "center", fontWeight: "normal" }}
          >
            {phone?.phone}
          </ComTitle>
        </View>
        <ComInputCode getCode={setOtpCode} />
        <View style={{ flexDirection: "row" }}>
          <ComTitle
            style={{
              fontSize: 13,
              fontWeight: "normal",
            }}
          >
            {Otp?.link?.content}
          </ComTitle>
          <TouchableOpacity>
            <ComTitle> {Otp?.link?.resendCode}</ComTitle>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%" }}>
          <ComButton onPress={() => { handleLogin() }}>{Otp?.button}</ComButton>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
    width: "90%",
  },
});
