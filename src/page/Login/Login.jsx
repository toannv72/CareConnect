import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Button,
  Keyboard,
} from "react-native";
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

export default function LoginScreen() {
  const [datas, setData] = useStorage("toan", {});
  const [accessToken, setToken] = useStorage("Token", {});
  const navigation = useNavigation();

  const {
    text: {
      Login,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);

  const loginSchema = yup.object().shape({
    username: yup.string().trim().required(Login?.message?.emailRequired),
    password: yup.string().required(Login?.message?.password),
    // chon: yup.string().required("vui long nhap mk"),
  });

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "user",
      password: "user",
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
    // navigation.navigate("Homes", { screen: "Home" });
    postData("/auth/login", data, {})
      .then((data) => {
        setToken(data?.accessToken);
        // Chờ setToken hoàn thành trước khi navigate
        return new Promise((resolve) => {
          setTimeout(() => {
            navigation.navigate("Homes", { screen: "Home" });
            resolve(); // Báo hiệu Promise đã hoàn thành
          }, 0); // Thời gian chờ 0ms để đảm bảo setToken đã được thực hiện
        });
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setDisabled(false);
        if (error?.response?.status === 401) {
          setErrorMessage(Login.message.invalidCredential);
        } else {
          setLoginError(true);
          setErrorMessage(Login.message.loginError);
        }
      });
  };
  const data = [
    {
      value: "",
      label: "toàn",
    },
    {
      value: "2",
      label: "toàn1",
    },
    {
      value: "3",
      label: "toàn2",
    },
    {
      value: "3",
      label: "toàn2",
    },
    {
      value: "3",
      label: "toàn2",
    },
    {
      value: "3",
      label: "toàn2",
    },
    {
      value: "3",
      label: "toàn2",
    },
    {
      value: "3",
      label: "toàn2",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FormProvider {...methods}>
          <ComTitlePage>{Login?.pageTitle}</ComTitlePage>
          <View style={{ width: "90%", gap: 10 }}>
            <ComInput
              label={Login?.label?.email}
              placeholder={Login?.placeholder?.email}
              name="username"
              control={control}
              keyboardType="default" // Set keyboardType for First Name input
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
            {/* <ComSelect
              label="Last name"
              name="chon"
              control={control}
              // keyboardType="visible-password" // Set keyboardType for Last Name input
              errors={errors} // Pass errors object
              options={data}
              required
            /> */}

            {/* <Button title={button.login} style={{ margin: 100 }} /> */}
            <View style={styles?.link}>
              <ComTitleLink to={"ForgetPassword"}>
                {Login?.link?.forgetPassword}
              </ComTitleLink>
              <ComTitle> {Login?.link?.labelRegister}</ComTitle>

              <ComTitleLink to={"Register"} style={{ color: "#33B39C" }}>
                {Login?.link?.register}
              </ComTitleLink>
            </View>
            <ComButton onPress={handleSubmit(handleLogin)}>
              {Login?.button?.login}
            </ComButton>
          </View>
        </FormProvider>
        <Button
          title="vn"
          style={{ margin: 100 }}
          onPress={() => setLanguage("vn")}
        />
        <Button
          title="en"
          style={{ margin: 100 }}
          onPress={() => setLanguage("en")}
        />
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
