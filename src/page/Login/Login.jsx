import React, { useContext, useState, useCallback } from "react";
import { StyleSheet, View, ActivityIndicator, Keyboard, Image } from "react-native";
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
import ComToast from "../../Components/ComToast/ComToast";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { postData, getData } from "../../api/api";
import { useAuth } from "../../../auth/useAuth";
import { FieldError } from "../../Components/FieldError/FieldError";

export default function LoginScreen() {
  const [token, setToken] = useStorage("accessToken", null);
  const navigation = useNavigation();
  const [LoginState, setLoginState] = useState(true);
  const [LoginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  const {
    text: {
      Login,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);

  const loginSchema = yup.object().shape({
    // username: yup
    //   .string()
    //   .trim()
    //   .required(Login?.message?.phoneRequired)
    //   .matches(/^0[0-9]{9,10}$/, Login?.message?.phoneInvalid),
    // password: yup.string().trim().required(Login?.message?.password),
  });

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  useFocusEffect(
    useCallback(() => {
      setLoginState(false);
      setLoginError(false);
      setErrorMessage("");
      setLoading(false);
      methods.reset({
        username: "",
        password: "",
      });
    }, [])
  );

  const handleLogin = (data) => {
    setLoginError(false);
    setLoginState(false);
    setLoading(true);
    // Xử lý đăng nhập với dữ liệu từ data
    Keyboard.dismiss();
    postData("/auth/login", data, {})
      .then((data) => {
        setToken(data?.accessToken);
        setLoading(false)
        ComToast({ text: 'Đăng nhập thành công' });
        // Chờ setToken hoàn thành trước khi navigate
        return new Promise((resolve) => {
          setTimeout(() => {
            if (data?.listRole[0] === "Customer") {
              navigation.navigate("Homes", { screen: "Home" });
            }
            else if (data?.listRole[0] === "Nurse") {
              navigation.navigate("NurseHomes", { screen: "NurseHome" });
            }
            else {
              setLoginState(true);
              setLoginError(true);
              setErrorMessage(Login?.message?.invalidRole);
            }
            resolve(); // Báo hiệu Promise đã hoàn thành
          }, 0); // Thời gian chờ 0ms để đảm bảo setToken đã được thực hiện
        });
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          ComToast({ text: 'Thông tin đăng nhập không chính xác', position: 190 });
          console.log("Error login :", error);
          setLoading(false)
        } else {
          ComToast({ text: 'Đã có lỗi xảy ra. Vui lòng thử lại.', position: 190 });
          console.log("Error login:", error);
          setLoading(false)
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FormProvider {...methods}>
          <ComTitlePage>{Login?.pageTitle}</ComTitlePage>
          <View style={{ width: "90%", gap: 10 }}>
            <ComInput
              label={Login?.label?.phone}
              placeholder={Login?.placeholder?.phone}
              name="username"
              control={control}
              // keyboardType="number-pad" // Set keyboardType for First Name input
              errors={errors} // Pass errors object
              required
            />
            <ComInput
              label={Login?.label?.password}
              placeholder={Login?.placeholder?.password}
              name="password"
              control={control}
              errors={errors} // Pass errors object
              password
              required
            />
            <FieldError style={{ color: "red" }}>
              {LoginState || LoginError ? errorMessage : ""}
            </FieldError>

            <ComButton onPress={handleSubmit(handleLogin)} style={{ justifyContent: "center", alignItems: "center" }}>
              {loading ? <ActivityIndicator color="#fff" /> : Login?.button?.login}
            </ComButton>

            <View style={styles?.link}>
              <ComTitleLink to={"ForgetPassword"}>
                {Login?.link?.forgetPassword}
              </ComTitleLink>
              <ComTitle> {Login?.link?.labelRegister}</ComTitle>

              <ComTitleLink to={"Register"} style={{ color: "#33B39C" }}>
                {Login?.link?.register}
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
