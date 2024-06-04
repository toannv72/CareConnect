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
    phone: yup
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
      phone: "0123456789",
    },
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const handleLogin = (data) => {
    // Xử lý đăng nhập với dữ liệu từ data
    setData(data);
    Keyboard.dismiss();
    console.log(data);
    navigation.navigate("OtpForgetPassword", { phone: data });
    // postData("/auth/ForgetPassword", data, {})
    //   .then((data) => {
    //     setToken(data?.accessToken);
    //     // Chờ setToken hoàn thành trước khi navigate
    //     return new Promise((resolve) => {
    //       setTimeout(() => {
    //         navigation.navigate("Homes", { screen: "Home" });
    //         resolve(); // Báo hiệu Promise đã hoàn thành
    //       }, 0); // Thời gian chờ 0ms để đảm bảo setToken đã được thực hiện
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching items:", error);
    //     if (error?.response?.status === 401) {
    //       setErrorMessage(ForgetPassword.message.invalidCredential);
    //     } else {
    //       setLoginError(true);
    //       setErrorMessage(ForgetPassword.message.loginError);
    //     }
    //   });
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
              name="phone"
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
