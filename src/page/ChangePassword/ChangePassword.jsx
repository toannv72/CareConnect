import React, { useContext, useState, useCallback } from "react";
import { StyleSheet, View, ActivityIndicator, Keyboard, Image, KeyboardAvoidingView, Platform } from "react-native";
import * as yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ComInput from "../../Components/ComInput/ComInput";
import { useStorage } from "../../hooks/useLocalStorage";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComButton from "../../Components/ComButton/ComButton";
import ComToast from "../../Components/ComToast/ComToast";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { postData } from "../../api/api";
import ComHeader from "../../Components/ComHeader/ComHeader";
import Lock from "../../../assets/Lock.png"
import { passwordRegex } from "../../Components/ComRegexPatterns/regexPatterns";

export default function ChangePassword() {
  const [accessToken, setToken] = useStorage("Token", {});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const {
    text: {
      ChangePassword,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);

  const loginSchema = yup.object().shape({
    newPassword: yup
      .string()
      .trim()
      .required(ChangePassword?.message?.password)
      .matches(
        passwordRegex,
        ChangePassword?.message?.passwordInvalid
      ),
    oldPassword: yup
      .string()
      .trim()
      .required(ChangePassword?.message?.password),
    confirmPassword: yup
      .string()
      .trim()
      .required(ChangePassword?.message?.confirmPassword)
      .oneOf([yup.ref('newPassword'), null], ChangePassword?.message?.passwordNotMatch),
  });

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      oldPassword: "",
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

  const handleChangePassword = (data) => {
    // Xử lý đăng nhập với dữ liệu từ data
    setLoading(!loading);
    Keyboard.dismiss();
    delete data.confirmPassword;

    postData("/users/change-password", data, {})
      .then((data) => {
        setToken(data?.accessToken);
        // Chờ setToken hoàn thành trước khi navigate
        return new Promise((resolve) => {
          setTimeout(() => {
            ComToast({ text: 'Thay đổi mật khẩu thành công' });
            navigation.navigate("ChangePasswordSuccess", { phone: data });
            resolve(); // Báo hiệu Promise đã hoàn thành
          }, 0); // Thời gian chờ 0ms để đảm bảo setToken đã được thực hiện
        });
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          setLoading(loading)
          ComToast({ text: "Chỉnh sửa mật khẩu thất bại. " + ChangePassword?.message?.olePassword });
        } else {
          console.log("Error login:", error);
          setLoading(false)
          ComToast({ text: ChangePassword?.message?.loginError });
        }
      });
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(false);
      methods.reset({
        confirmPassword: "",
        newPassword: "",
        oldPassword: "",
      });
    }, [])
  );

  return (
    <>
      <ComHeader
        showBackIcon
        showTitle
        title={ChangePassword?.pageTitle}
      />
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container1}>
          <View style={styles.body}>
            <Image
              source={Lock}
              style={{
                height: 100,
                width: 100,
                objectFit: "fill",
                marginBottom: 20,
              }}
            />
            <FormProvider {...methods}>
              <View style={{ width: "90%", gap: 15 }}>
                <ComInput
                  label={ChangePassword?.label?.olePassword}
                  placeholder={ChangePassword?.placeholder?.olePassword}
                  name="oldPassword"
                  control={control}
                  errors={errors} // Pass errors object
                  password
                  required
                />
                <ComInput
                  label={ChangePassword?.label?.password}
                  placeholder={ChangePassword?.placeholder?.password}
                  name="newPassword"
                  control={control}
                  errors={errors} // Pass errors object
                  password
                  required
                />
                <ComInput
                  label={ChangePassword?.label?.confirmPassword}
                  placeholder={ChangePassword?.placeholder?.confirmPassword}
                  name="confirmPassword"
                  control={control}
                  errors={errors} // Pass errors object
                  password
                  required
                />
                <ComButton onPress={handleSubmit(handleChangePassword)}>
                  {loading ? <ActivityIndicator color="#fff" /> : ChangePassword?.button?.ChangePassword}
                </ComButton>
              </View>
            </FormProvider>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container1: {
    paddingTop: 50,
    justifyContent: "center",
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
  },
});
