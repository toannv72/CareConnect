import React, { useContext } from "react";
import { StyleSheet, View, Text, Button, Keyboard } from "react-native";
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
import ComTitle from "../../Components/ComTitle/ComTitle";
import ComTitleLink from "../../Components/ComTitleLink/ComTitleLink";
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const [datas, setData] = useStorage("toan", {});
  const navigation = useNavigation();

  const {
    text: {
      Register,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);

  const loginSchema = yup.object().shape({
    // email: yup
    //   .string()
    //   .trim()
    //   .email(Register?.message?.emailInvalid)
    //   .required(Register?.message?.emailRequired),
    // password: yup.string().required(Register?.message?.password),
    // confirmPassword: yup.string().required(Register?.message?.confirmPassword),
    // phone: yup.string().required(Register?.message?.phoneRequired),
  });

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      password: "",
      email: "",
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
    navigation.navigate("Otp");

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
  
  ];

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FormProvider {...methods}>
          <ComTitlePage>{Register?.pageTitle}</ComTitlePage>
          <View style={{ width: "90%", gap: 10 }}>
            <ComInput
              label={Register?.label?.email}
              placeholder={Register?.placeholder?.email}
              name="email"
              control={control}
              keyboardType="default" // Set keyboardType for First Name input
              errors={errors} // Pass errors object
              required
            />
            <ComInput
              label={Register?.label?.phone}
              placeholder={Register?.placeholder?.phone}
              name="phone"
              control={control}
              keyboardType="phone-pad" // Set keyboardType for First Name input
              errors={errors} // Pass errors object
              required
            />
            <ComInput
              label={Register?.label?.password}
              placeholder={Register?.placeholder?.password}
              name="password"
              control={control}
              errors={errors} // Pass errors object
              password
              required
            />
            <ComInput
              label={Register?.label?.confirmPassword}
              placeholder={Register?.placeholder?.confirmPassword}
              name="confirmPassword"
              control={control}
              errors={errors} // Pass errors object
              password
              required
            />
            <ComButton onPress={handleSubmit(handleLogin)}>
              {Register?.button?.register}
            </ComButton>
            <View style={styles?.link}>
              <ComTitle> {Register?.labelRegister}</ComTitle>
              <ComTitleLink style={{ color: "#33B39C" }} to={"Login"}>
                {Register?.link?.login}
              </ComTitleLink>
            </View>
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
