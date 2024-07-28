import React, { useContext, useState, useCallback, useRef } from "react";
import { StyleSheet, View, ActivityIndicator, Keyboard, Platform, KeyboardAvoidingView } from "react-native";
import * as yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ComInput from "../../Components/ComInput/ComInput";
import ComSelect from "../../Components/ComInput/ComSelect";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComTitlePage from "../../Components/ComTitlePage/ComTitlePage";
import ComButton from "../../Components/ComButton/ComButton";
import ComTitle from "../../Components/ComTitle/ComTitle";
import ComToast from "../../Components/ComToast/ComToast";
import ComTitleLink from "../../Components/ComTitleLink/ComTitleLink";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ComDatePicker from "../../Components/ComInput/ComDatePicker";
import { postData, getData } from "../../api/api";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import Toast from 'react-native-root-toast';
import { cccdRegex, nameRegex, phoneNumberRegex, passwordRegex } from "../../Components/ComRegexPatterns/regexPatterns";

export default function Register() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);

  const {
    text: { Register, EditProfile, common: { button } },
    setLanguage,
  } = useContext(LanguageContext);

  const registerSchema = yup.object().shape({
    fullName: yup
      .string()
      .trim()
      .required(Register?.message?.name)
      .matches(nameRegex, Register?.message?.nameInValid),
    gender: yup
      .string()
      .required(EditProfile?.message?.gender),
    dateOfBirth: yup
      .date()
      .required(EditProfile?.message?.dateOfBirth),
    email: yup
      .string()
      .trim()
      .email(Register?.message?.emailInvalid)
      .required(Register?.message?.emailRequired),
    password: yup
      .string()
      .trim()
      .required(Register?.message?.password)
      .matches(passwordRegex, Register?.message?.passwordInvalid),
    confirmPassword: yup
      .string()
      .trim()
      .required(Register?.message?.confirmPassword)
      .oneOf([yup.ref('password'), null], Register?.message?.passwordNotMatch),
    phoneNumber: yup
      .string()
      .trim()
      .required(Register?.message?.phoneRequired)
      .matches(phoneNumberRegex, Register?.message?.phoneInvalid),
    // cccd: yup
    //   .string()
    //   .trim()
    //   .required(Register?.message?.cccd)
    //   .matches(cccdRegex, Register?.message?.cccdInValid),
  });
  const formattedDate = (dateValue) => {
    if (!dateValue || !(dateValue instanceof Date)) {
      return ""; // Return empty string for invalid dates
    }
    const day = new Date(dateValue).getDate().toString().padStart(2, "0");
    const month = (new Date(dateValue).getMonth() + 1).toString().padStart(2, "0");
    const year = new Date(dateValue).getFullYear();
    return `${year}-${month}-${day}`;
  };
  const methods = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { control, handleSubmit, register, formState: { errors } } = methods;

  useFocusEffect(
    useCallback(() => {
      setLoading(false);
      methods.reset({
        fullName: "",
        gender: "Male",
        dateOfBirth: moment().subtract(18, "years").toDate(),
        email: "",
        password: "",
        confirmPassword: "",
        confirmPassword: "",
        phoneNumber: "",
        // cccd: ""
      });
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true }); // Scroll to top
      }
    }, [])
  );

  const handleRegister = (data) => {
    setLoading(true);
    Keyboard.dismiss();
    const formData = { ...data };
    // Delete the confirmPassword field from the copied data
    delete formData.confirmPassword;
    const newData = {
      ...formData,
      avatarUrl: "https://firebasestorage.googleapis.com/v0/b/careconnect-2d494.appspot.com/o/images%2F3be127ed-a90e-4364-8160-99338def0144.png?alt=media&token=3de8a6cb-0986-4347-9a22-eb369f7d02ff",
      address: "",
      dateOfBirth: formattedDate(formData.dateOfBirth)
    };
    postData("/users/customer-register", newData, {})
      .then((data) => {
        setLoading(false);
        return new Promise((resolve) => {
          setTimeout(() => {
            navigation.navigate("RegisterSuccess");
            resolve(); // Báo hiệu Promise đã hoàn thành
          }, 0); // Thời gian chờ 0ms để đảm bảo setToken đã được thực hiện
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error register:", error);
        switch (error.response.status) {
          case 600: //trùng số điện thoại
            ComToast({ text: 'Đăng ký thất bại. ' + Register?.message?.phoneExisted });
            break;
          case 601: // trùng email
            ComToast({ text: 'Đăng ký thất bại. ' + Register?.message?.emailExisted });
            break;
          case 602: // trùng cccd
            ComToast({ text: 'Đăng ký thất bại. ' + Register?.message?.cccdExisted });
            break;
          case 603: //trùng username
            ComToast({ text: 'Đăng ký thất bại. ' + Register?.message?.userExisted });
            break;
          default:
            ComToast({ text: 'Đăng ký thất bại. ' + Register?.message?.registerError });
            break;
        };
      })
  };
  const genderOptions = [
    {
      value: "Male",
      label: "Nam",
    },
    {
      value: "Female",
      label: "Nữ",
    }
  ];

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.body} behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <ScrollView ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <FormProvider {...methods}>
            <ComTitlePage>{Register?.pageTitle}</ComTitlePage>
            <View style={{ gap: 10, }}>
              <ComInput
                label={Register?.placeholder?.fullName}
                placeholder={Register?.placeholder?.fullName}
                name="fullName"
                control={control}
                errors={errors} // Pass errors object
                required
              />
              <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                <View style={{ flex: 1 }}>
                  <ComSelect
                    label={EditProfile?.label?.gender}
                    name="gender"
                    control={control}
                    errors={errors}
                    options={genderOptions}
                    required
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <ComDatePicker
                    label={EditProfile?.label?.dateOfBirth}
                    placeholder={EditProfile?.placeholder?.dateOfBirth}
                    name="dateOfBirth"
                    control={control}
                    errors={errors} // Pass errors object
                    enabled={true}
                    mode={"date"}
                    maximumDate={moment().subtract(18, "years").toDate()}
                    minimumDate={moment().subtract(100, "years").toDate()}
                    required
                  />

                </View>
              </View>
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
                name="phoneNumber"
                control={control}
                keyboardType="phone-pad" // Set keyboardType for First Name input
                errors={errors} // Pass errors object
                required
              />
              {/* <ComInput
                label={Register?.label?.cccd}
                placeholder={Register?.label?.cccd}
                name="cccd"
                control={control}
                keyboardType="numeric" // Set keyboardType for First Name input
                errors={errors} // Pass errors object
                required
              /> */}
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
              <ComButton onPress={handleSubmit(handleRegister)}>
                {loading ? <ActivityIndicator color="#fff" /> : Register?.button?.register}
              </ComButton>
              <View style={styles?.link}>
                <ComTitle> {Register?.labelRegister}</ComTitle>
                <ComTitleLink style={{ color: "#33B39C" }} to={"Login"}>
                  {Register?.link?.login}
                </ComTitleLink>
              </View>
            </View>
          </FormProvider>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: "5%",
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  link: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingBottom: 40
  },
});
