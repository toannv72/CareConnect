import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as yup from "yup";
import { LanguageContext } from "../../../contexts/LanguageContext";
import ComInput from "../../../Components/ComInput/ComInput";
import ComButton from "../../../Components/ComButton/ComButton";
import ComSelect from "../../../Components/ComInput/ComSelect";
import Avatar from "./Avatar";
import ComDatePicker from "../../../Components/ComInput/ComDatePicker";
import { ScrollView } from "react-native";
import { firebaseImg } from "../../../api/firebaseImg";
import ComHeader from "../../../Components/ComHeader/ComHeader";
import { useStorage } from "../../../hooks/useLocalStorage";
import moment from 'moment';

export default function EditProfile() {
  const [user, setUser] = useStorage("user", {});
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(user?.avatarUrl);
  const [imageUrl, setImageUrl] = useState(user?.avatarUrl ?? "null");
  const navigation = useNavigation();

  const {
    text: {
      EditProfile,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);

  const loginSchema = yup.object().shape({
    fullName: yup.string().trim().required(EditProfile?.message?.fullName),
    gender: yup.string().trim().required(EditProfile?.message?.gender),
    dateOfBirth: yup
      .string()
      .trim()
      .required(EditProfile?.message?.dateOfBirth),
    phoneNumber: yup.string().trim().required(EditProfile?.message?.phoneNumber),
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
      // email: user?.email,
      // dateOfBirth: user?.dateOfBirth,
      // fullName: user?.fullName ?? '',
    },
  });

  const { control, handleSubmit, formState: { errors }, setValue } = methods;

  const handleEdit = (data) => {
    firebaseImg(image).then((imageUrl) => {
      console.log("Image uploaded successfully:", imageUrl);
    });
  };

  const genderOptions = [
    {
      value: "Male",
      label: "Nam",
    },
    {
      value: "Female",
      label: "Nữ",
    },
    {
      value: "Other",
      label: "Khác",
    },
  ];

  const setImg = (data) => {
    setImage(data);
  };

  useEffect(() => {
    if (user) {
      setValue("fullName", user?.fullName ?? "");
      setValue("email", user?.email ?? "");
      setValue("gender", user?.gender ?? "");
      setValue("dateOfBirth", moment(user?.dateOfBirth, "DD/MM/YYYY").toDate() ?? "");
      setValue("phoneNumber", user?.phoneNumber ?? "");
      setValue("idNumber", user?.cccd ?? "");
      setValue("address", user?.address ?? "");
      setImage(user?.avatarUrl);
    }
  }, [user, setValue]);

  return (
    <>
      <ComHeader
        title={EditProfile?.title}
        showTitle
        showBackIcon
      />
      <View style={styles.body}>
        <View style={styles.container}>
          <FormProvider {...methods}>
            <View style={{ width: "100%", gap: 10, flex: 1 }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <Avatar image={image} setImg={setImg} />
                <View style={{ gap: 10 }}>
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
                        required
                      />
                    </View>
                  </View>
                  <ComInput
                    label={EditProfile?.label?.phoneNumber}
                    placeholder={EditProfile?.placeholder?.phoneNumber}
                    name="phoneNumber"
                    control={control}
                    keyboardType="default" // Set keyboardType for First Name input
                    errors={errors} // Pass errors object
                    required
                  />
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
                </View>
                <View style={{ height: 100 }}></View>
              </ScrollView>
            </View>
            <View>
              <ComButton onPress={handleSubmit(handleEdit)}>
                {EditProfile?.button?.SaveProfile}
              </ComButton>
            </View>
          </FormProvider>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    gap: 10,
  },
  container: {
    flex: 1,
  },
});
