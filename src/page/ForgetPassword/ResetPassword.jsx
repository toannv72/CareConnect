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
import ComTitle from "../../Components/ComTitle/ComTitle";
import { useNavigation } from "@react-navigation/native";
import { postData } from "../../api/api";
import ComToast from "../../Components/ComToast/ComToast";
import { passwordRegex } from "../../Components/ComRegexPatterns/regexPatterns";

export default function ResetPassword() {
  const navigation = useNavigation();

  const {
    text: {
      ForgetPassword, Register,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);

  const loginSchema = yup.object().shape({
    newPassword: yup
      .string()
      .trim()
      .required(Register?.message?.password)
      .matches(passwordRegex, Register?.message?.passwordInvalid),
    confirmPassword: yup
      .string()
      .trim()
      .required(Register?.message?.confirmPassword)
      .oneOf([yup.ref('newPassword'), null], Register?.message?.passwordNotMatch),
  });

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const handleLogin = (data) => {
    Keyboard.dismiss();
    const { newPassword } = data;
    const newPasswordData = { newPassword };

    postData("/users/reset-password", newPasswordData, {})
      .then((data) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            ComToast({ text: 'Đặt lại mật khẩu thành công.', position: 190 });
            navigation.navigate("Login");
            resolve(); // Báo hiệu Promise đã hoàn thành
          }, 0); // Thời gian chờ 0ms để đảm bảo setToken đã được thực hiện
        });
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        ComToast({ text: 'Đã có lỗi xảy ra. Vui lòng thử lại.', position: 190 });
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FormProvider {...methods}>
        <ComTitlePage>Đặt lại mật khẩu</ComTitlePage>
          <View style={{ width: "90%", gap: 15 }}>
            <ComTitle style={{ textAlign: "center", opacity: 0.5 }}>
              Nhập mật khẩu mởi bạn muốn đặt
            </ComTitle>

            <ComInput
              label={ForgetPassword?.label?.password}
              placeholder={ForgetPassword?.placeholder?.password}
              name="newPassword"
              control={control}
              errors={errors} // Pass errors object
              password
              required
            />
            <ComInput
              label={ForgetPassword?.label?.confirmPassword}
              placeholder={ForgetPassword?.placeholder?.confirmPassword}
              name="confirmPassword"
              control={control}
              errors={errors} // Pass errors object
              password
              required
            />
            <ComButton onPress={handleSubmit(handleLogin)}>
              {ForgetPassword?.button?.ForgetPassword}
            </ComButton>
            {/* <View style={styles?.link}>
              <ComTitle> {ForgetPassword?.link?.textLogin}</ComTitle>

              <ComTitleLink to={"Login"} style={{ color: "#33B39C" }}>
                {ForgetPassword?.link?.login}
              </ComTitleLink>
            </View> */}
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
