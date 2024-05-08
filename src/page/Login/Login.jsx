import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import * as yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ComInput from "../../Components/ComInput/ComInput";
import ComSelect from "../../Components/ComInput/ComSelect";
import { useStorage } from "../../hooks/useLocalStorage";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComTitlePage from "../../Components/ComTitlePage/ComTitlePage";
import { Form } from "react-native-autofocus";
import ComButton from "../../Components/ComButton/ComButton";
import ComTitleLink from "../../Components/ComTitleLink/ComTitleLink";
import ComTitle from "../../Components/ComTitle/ComTitle";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [datas, setData] = useStorage("toan", {});
  const navigation = useNavigation();

  const {
    text: {
      Login,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .email(Login?.message?.emailInvalid)
      .required(Login?.message?.emailRequired),
    password: yup.string().required(Login?.message?.password),
    // chon: yup.string().required("vui long nhap mk"),
  });

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "toan@gmail.com",
      password: "",
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
    navigation.navigate("Homes", { screen: "home" });
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
  const goTo = () => {
    console.log(123);
    navigation.navigate("Register");
  };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FormProvider {...methods}>
          <ComTitlePage>{Login?.pageTitle}</ComTitlePage>
          <View style={{ width: "90%", gap: 10 }}>
            <ComInput
              label={Login?.label?.email}
              placeholder={Login?.placeholder?.email}
              name="email"
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
                            /> */}

            {/* <Button title={button.login} style={{ margin: 100 }} /> */}
            <View style={styles?.link}>
              <ComTitleLink to={"Homes"} id={{ screen: "Profile" }}>
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
  },
});
