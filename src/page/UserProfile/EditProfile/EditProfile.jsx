import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, ActivityIndicator, View, Keyboard, KeyboardAvoidingView } from "react-native";
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
import { postData, getData, putData } from "../../../api/api";
import { useAuth } from "../../../../auth/useAuth";
import Toast from 'react-native-toast-message';

export default function EditProfile({ }) {
  const route = useRoute();
  // const { user } = route.params;
  const { user, login, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(user?.avatarUrl);
  const [imageUrl, setImageUrl] = useState(null);
  const navigation = useNavigation();
  const showToast = (type, text1, text2, position) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      position: position
    });
  }

  const {
    text: {
      EditProfile,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);

  const loginSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .trim()
      .required(EditProfile?.message?.phoneNumber)
      .matches(/^0[0-9]{9,10}$/, EditProfile?.message?.phoneInvalid),
    email: yup
      .string()
      .email(EditProfile?.message?.emailInvalid)
      .trim()
      .required(EditProfile?.message?.email),
    address: yup.string().trim().required(EditProfile?.message?.address),
  });

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      fullName: user?.fullName ?? "",
      email: user?.email ?? "",
      gender: user?.gender ?? "",
      dateOfBirth: new Date(user?.dateOfBirth) ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      cccd: user?.cccd ?? "",
      address: user?.address ?? ""
    },
  });

  const { control, handleSubmit, formState: { errors }, setValue } = methods;

  const handleUpdate = (data) => {
    setLoading(true);
    Keyboard.dismiss();

    const newData = {
      ...data,
      dateOfBirth: formattedDate(new Date(data?.dateOfBirth)),
      avatarUrl: imageUrl ? imageUrl : image,
    };
    delete newData.gender;
    console.log("handleUpdate newData: ", newData)
    const handleUpdateData = (newData) => {

      putData("/users/profile", "", newData, {})
        .then((data) => {
          // Chờ setToken hoàn thành trước khi navigate
          setLoading(false);
          getData("/users/profile")
            .then((userData) => {
              setUser(userData?.data);
              navigation.navigate("DetailProfile", { userData: userData?.data });
            })
            .catch((error) => {
              setLoading(false)
              console.error("Error getData fetching items:", error);
            });
          return new Promise((resolve) => {
            setTimeout(() => {
              showToast("success", "Chỉnh sửa thông tin thành công", "", "bottom")
              resolve(); // Báo hiệu Promise đã hoàn thành
            }, 0); // Thời gian chờ 0ms để đảm bảo setToken đã được thực hiện
          });
        })
        .catch((error) => {
          console.error("Error register:", error);
          setLoading(false)
          showToast("error", "Chỉnh sửa thông tin thất bại", "", "bottom")
        });
    };

    if (image?.assets) {
      firebaseImg(image).then((imageUrl) => {
        setImageUrl(imageUrl);
        newData.avatarUrl = imageUrl;
        handleUpdateData(newData); // Sau khi upload xong ảnh, thực hiện cập nhật dữ liệu
        console.log("Image uploaded successfully:", imageUrl);
      });
    } else {
      // Nếu không có hình ảnh mới, chỉ cập nhật dữ liệu người dùng
      handleUpdateData(newData);
    }


  }

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

  const setImg = (data) => {
    setImage(data);
  };

  const formattedDate = (dateValue) => {
    if (!dateValue || !(dateValue instanceof Date)) {
      return ""; // Return empty string for invalid dates
    }

    const day = dateValue.getDate().toString().padStart(2, "0");
    const month = (dateValue.getMonth() + 1).toString().padStart(2, "0");
    const year = dateValue.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <ComHeader
        title={EditProfile?.title}
        showTitle
        showBackIcon
      />
      <KeyboardAvoidingView style={styles.body}  behavior="padding">
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
                        name=""
                        control={control}
                        errors={errors}
                        options={genderOptions}
                        enabled={false}
                        defaultValue={user?.gender}
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
                        enabled={false}
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
                    name="cccd"
                    control={control}
                    errors={errors} // Pass errors object
                    edit={false}
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
              <ComButton
                onPress={handleSubmit(handleUpdate)}>
                {loading ? <ActivityIndicator color="#fff" /> : EditProfile?.button?.SaveProfile}
              </ComButton>
            </View>
          </FormProvider>
        </View>
      </KeyboardAvoidingView>
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
