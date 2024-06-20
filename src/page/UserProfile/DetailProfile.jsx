import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as yup from "yup";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComInput from "../../Components/ComInput/ComInput";
import ComButton from "../../Components/ComButton/ComButton";
import ComSelect from "../../Components/ComInput/ComSelect";
import ComDatePicker from "../../Components/ComInput/ComDatePicker";
import { ScrollView } from "react-native";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter";
import { useStorage } from "../../hooks/useLocalStorage";
import moment from 'moment';

export default function DetailProfile() {
  const [user, setUser] = useStorage("user", {});
  const [image, setImage] = useState(user?.avatarUrl);
  const navigation = useNavigation();
  const {
    text: {
      EditProfile,
      UserProfile,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);
  const loginSchema = yup.object().shape({

  });
  const Edit = () => {
    navigation.navigate("EditProfile");
  };
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      // fullName: user?.fullName ?? "",
      // email: "toan@gmail.com",
      // dateOfBirth: moment(user?.dateOfBirth, "YYYY-MM-DD").format("DD/MM/YYYY") ?? "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = methods;

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

  useEffect(() => {
    if (user) {
      setValue("fullName", user?.fullName ?? "");
      setValue("email", user?.email ?? "");
      setValue("gender", user?.gender ?? "");
      setValue("dateOfBirth", moment(user?.dateOfBirth, "YYYY-MM-DD").format("DD/MM/YYYY") ?? "");
      setValue("phoneNumber", user?.phoneNumber ?? "");
      setValue("idNumber", user?.cccd ?? "");
      setValue("address", user?.address ?? "");
      setImage(user?.avatarUrl);
    }
  }, [user, setValue]);

  return (
    <>
      <ComHeader
        title={UserProfile?.title}
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
                <View style={styles.avatarContainer}>
                  <Image
                    source={{
                      uri: image,
                    }}
                    style={styles.avatar}
                  />
                </View>

                <View style={{ gap: 10 }}>
                  <ComInput
                    label={EditProfile?.label?.fullName}
                    placeholder={EditProfile?.placeholder?.fullName}
                    name="fullName"
                    control={control}
                    keyboardType="default" // Set keyboardType for First Name input
                    errors={errors} // Pass errors object
                    edit={false}
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
                        options={genderOptions}
                        enabled={false}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <ComInput
                        label={EditProfile?.label?.dateOfBirth}
                        placeholder={EditProfile?.label?.dateOfBirth}
                        name="dateOfBirth"
                        control={control}
                        keyboardType="default" // Set keyboardType for First Name input
                        errors={errors} // Pass errors object
                        edit={false}
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
                    edit={false}
                  />
                  <ComInput
                    label={EditProfile?.label?.email}
                    placeholder={EditProfile?.placeholder?.email}
                    name="email"
                    edit={false}
                    control={control}
                    keyboardType="default" // Set keyboardType for First Name input
                    errors={errors} // Pass errors object
                  />
                  <ComInput
                    label={EditProfile?.label?.idNumber}
                    placeholder={EditProfile?.placeholder?.idNumber}
                    name="idNumber"
                    edit={false}
                    control={control}
                    errors={errors} // Pass errors object
                  />
                  <ComInput
                    label={EditProfile?.label?.address}
                    placeholder={EditProfile?.placeholder?.address}
                    name="address"
                    edit={false}
                    control={control}
                    errors={errors} // Pass errors object
                  />
                </View>
              </ScrollView>
              <View>
                <ComButton onPress={Edit}>
                  {EditProfile?.button?.EditProfile}
                </ComButton>
              </View>
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
  avatarContainer: {
    position: "relative", // Quan trọng!
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 170,
    height: 170,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "gray",
  },
});
