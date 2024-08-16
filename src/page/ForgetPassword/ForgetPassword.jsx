import React, { useContext } from "react";
import { StyleSheet, View, Button, Keyboard } from "react-native";
import * as yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ComInput from "../../Components/ComInput/ComInput";
import { useStorage } from "../../hooks/useLocalStorage";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComTitlePage from "../../Components/ComTitlePage/ComTitlePage";
import ComButton from "../../Components/ComButton/ComButton";
import ComTitleLink from "../../Components/ComTitleLink/ComTitleLink";
import ComTitle from "../../Components/ComTitle/ComTitle";
import { useNavigation } from "@react-navigation/native";
import { postData } from "../../api/api";
import ComToast from "../../Components/ComToast/ComToast";

export default function ForgetPassword() {
  const [datas, setData] = useStorage("toan", {});
  const [accessToken, setToken] = useStorage("Token", {});
  const navigation = useNavigation();

  const {
    text: {
      ForgetPassword,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);

  const loginSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .trim()
      .required(ForgetPassword?.message?.phoneRequired)
      .min(10, "Số điện thoại phải lớn hơn 9 số!")
      .max(10, "Số điện thoại phải nhỏ hơn 11 số!")
      .matches(/^0\d{9,10}$/, "Số điện thoại không hợp lệ"),
  });

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const handleLogin = (data) => {
    setData(data);
    Keyboard.dismiss();
    postData("/auth/send-otp", data, {})
      .then((responseData) => {
        navigation.navigate("OtpForgetPassword", { phone: data?.phoneNumber });
        console.log(" data", responseData)
      })
      .catch((error) => {
        if (error?.response?.status === 404) {
          ComToast({ text: 'Số điện thoại chưa được đăng ký!', position: 190 });
        } else {
          ComToast({ text: 'Đã có lỗi xảy ra. Vui lòng thử lại.', position: 190 });
          console.log(error?.response)
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FormProvider {...methods}>
          <ComTitlePage>{ForgetPassword?.pageTitle}</ComTitlePage>
          <View style={{ width: "90%", gap: 15 }}>
            <ComTitle style={{ textAlign: "center", opacity: 0.5 }}>
              {ForgetPassword?.pageSubTitle}
            </ComTitle>
            <ComInput
              label={ForgetPassword?.label?.phone}
              placeholder={ForgetPassword?.placeholder?.phone}
              name="phoneNumber"
              control={control}
              keyboardType="phone-pad"
              errors={errors} // Pass errors object
              required
            />

            <ComButton onPress={handleSubmit(handleLogin)}>
              {ForgetPassword?.button?.ForgetPassword}
            </ComButton>
            <View style={styles?.link}>
              <ComTitle> {ForgetPassword?.link?.textLogin}</ComTitle>

              <ComTitleLink to={"Login"} style={{ color: "#33B39C" }}>
                {ForgetPassword?.link?.login}
              </ComTitleLink>
            </View>
          </View>
        </FormProvider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  link: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
