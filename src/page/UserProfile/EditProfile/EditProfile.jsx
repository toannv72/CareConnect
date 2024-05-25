import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as yup from "yup";
import { LanguageContext } from "../../../contexts/LanguageContext";
import ComInput from "../../../Components/ComInput/ComInput";
import ComButton from "../../../Components/ComButton/ComButton";
import ComSelect from "../../../Components/ComInput/ComSelect";
import Avatar from "./Avatar";

export default function EditProfile() {
  const navigation = useNavigation();
  const {
    text: {
      EditProfile,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);
  const loginSchema = yup.object().shape({
    fullName: yup
      .string()
      .trim()

      .required(EditProfile?.message?.fullName),
    gender: yup.string().trim().required(EditProfile?.message?.gender),
    dateOfBirth: yup
      .string()
      .trim()
      .required(EditProfile?.message?.dateOfBirth),
    phoneNumber: yup
      .string()
      .trim()
      .required(EditProfile?.message?.phoneNumber),
    email: yup
      .string()
      .email(EditProfile?.message?.emailInvalid)
      .trim()
      .required(EditProfile?.message?.email),
    idNumber: yup.string().trim().required(EditProfile?.message?.idNumber),
    address: yup.string().trim().required(EditProfile?.message?.address),
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
  const handleEdit = (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  };

  const data = [
    {
      value: "2",
      label: "Nam",
    },
    {
      value: "3",
      label: "Nữ",
    },
  ];

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Avatar/>
        <FormProvider {...methods}>
          <View style={{ width: "100%", gap: 10 }}>
            <ComInput
              label={EditProfile?.label?.fullName}
              placeholder={EditProfile?.placeholder?.fullName}
              name="fullName"
              control={control}
              keyboardType="default" // Set keyboardType for First Name input
              errors={errors} // Pass errors object
              required
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <ComSelect
                  label={EditProfile?.label?.gender}
                  name="gender"
                  control={control}
                  // keyboardType="visible-password" // Set keyboardType for Last Name input
                  errors={errors} // Pass errors object
                  options={data}
                  required
                />
              </View>
              <View style={{ flex: 1 }}>
                <ComInput
                  label={EditProfile?.label?.dateOfBirth}
                  placeholder={EditProfile?.placeholder?.dateOfBirth}
                  name="dateOfBirth"
                  control={control}
                  keyboardType="default" // Set keyboardType for First Name input
                  errors={errors} // Pass errors object
                  required
                />
              </View>
            </View>
            <ComInput
              label={EditProfile?.label?.email}
              placeholder={EditProfile?.placeholder?.email}
              name="email"
              control={control}
              keyboardType="default" // Set keyboardType for First Name input
              errors={errors} // Pass errors object
              required
            />
            <ComInput
              label={EditProfile?.label?.idNumber}
              placeholder={EditProfile?.placeholder?.idNumber}
              name="idNumber"
              control={control}
              errors={errors} // Pass errors object
              required
            />
            <ComInput
              label={EditProfile?.label?.address}
              placeholder={EditProfile?.placeholder?.address}
              name="address"
              control={control}
              errors={errors} // Pass errors object
              required
            />
            <ComButton onPress={handleSubmit(handleEdit)}>
              {EditProfile?.button?.EditProfile}
            </ComButton>
          </View>
        </FormProvider>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    gap: 10,
  },
  container: {},
});
