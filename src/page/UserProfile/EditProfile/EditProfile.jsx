import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, ActivityIndicator, View, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import * as yup from "yup";
import { LanguageContext } from "../../../contexts/LanguageContext";
import ComInput from "../../../Components/ComInput/ComInput";
import ComButton from "../../../Components/ComButton/ComButton";
import ComToast from "../../../Components/ComToast/ComToast";
import ComSelect from "../../../Components/ComInput/ComSelect";
import Avatar from "./Avatar";
import ComDatePicker from "../../../Components/ComInput/ComDatePicker";
import { ScrollView } from "react-native";
import { firebaseImg } from "../../../api/firebaseImg";
import ComHeader from "../../../Components/ComHeader/ComHeader";
import { useAuth } from "../../../../auth/useAuth";
import { cccdRegex } from "../../../Components/ComRegexPatterns/regexPatterns";
import { getData, putData } from "../../../api/api";

export default function EditProfile({ }) {
  const { user, login, setUser, role } = useAuth();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(user?.avatarUrl);
  const [imageUrl, setImageUrl] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const [userData, setUserData] = useState(user || {});

  useEffect(() => { // cập nhật giá trị user sau mỗi lần update
    setImage(userData?.avatarUrl);
    Object.keys(userData).forEach(key => {
      setValue(key, userData[key]);
    });
    setValue("cccd", userData?.cccd)
    setValue("gender", userData?.gender)
    setValue("dateOfBirth", new Date(userData?.dateOfBirth))
  }, [userData]);

  // useFocusEffect(
  //   useCallback(() => {
  //     setLoading(true);
  //     getData(`/users/${user?.id}`, {})
  //       .then((users) => {
  //         setUserData(users?.data);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         setLoading(false);
  //       });
  //   }, [user])
  // );

  const {
    text: { EditProfile, Register, common: { button } },
  } = useContext(LanguageContext);

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email(EditProfile?.message?.emailInvalid)
      .trim()
      .required(EditProfile?.message?.email),
    address: yup.string().trim().required(EditProfile?.message?.address),
    cccd: yup
      .string()
      .trim()
      .required(Register?.message?.cccd)
      .matches(cccdRegex, Register?.message?.cccdInValid),
  });

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      fullName: userData?.fullName ?? "",
      email: userData?.email ?? "",
      gender: userData?.gender ?? "",
      dateOfBirth: userData?.dateOfBirth ? new Date(userData?.dateOfBirth) : new Date(),
      phoneNumber: userData?.phoneNumber ?? "",
      cccd: userData?.cccd ?? "",
      address: userData?.address ?? ""
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
    const handleUpdateData = (newData) => {
      putData("/users/profile", "", newData, {})
        .then((data) => {
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
              ComToast({ text: 'Chỉnh sửa thông tin thành công' });
              resolve();
            }, 0);
          });
        })
        .catch((error) => {
          setLoading(false)
          ComToast({ text: 'Chỉnh sửa thông tin thất bại' });
        });
    };

    if (image?.assets) {
      firebaseImg(image).then((imageUrl) => {
        setImageUrl(imageUrl);
        newData.avatarUrl = imageUrl;
        handleUpdateData(newData); // Sau khi upload xong ảnh, thực hiện cập nhật dữ liệu
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
      return "";
    }
    const day = dateValue.getDate().toString().padStart(2, "0");
    const month = (dateValue.getMonth() + 1).toString().padStart(2, "0");
    const year = dateValue.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (route.params?.userData) {
      setUserData(route.params.userData);
      setValue("dateOfBirth", new Date(route.params.userData?.dateOfBirth));
    } else {
      setLoading(true);
      getData(`/users/${user?.id}`, {})
        .then((response) => {
          setUserData(response?.data);
          setValue("dateOfBirth", new Date(response?.data?.dateOfBirth));
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log("Error fetching user data:", error);
        });
    }
  }, [route.params, user?.id]);

  return (
    <>
      <ComHeader
        title={EditProfile?.title}
        showTitle
        showBackIcon
      />
      <KeyboardAvoidingView style={styles.body} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <FormProvider {...methods}>
            <View style={{ width: "100%", gap: 10, flex: 1 }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <Avatar key={image} image={image} setImg={setImg} />
                <View style={{ gap: 10 }}>
                  <ComInput
                    label={EditProfile?.label?.fullName}
                    placeholder={EditProfile?.placeholder?.fullName}
                    name="fullName"
                    control={control}
                    keyboardType="default"
                    errors={errors}
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
                        name="gender"
                        control={control}
                        errors={errors}
                        options={genderOptions}
                        enabled={false}
                        defaultValue={userData?.gender}
                        required
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <ComDatePicker
                        label={EditProfile?.label?.dateOfBirth}
                        placeholder={EditProfile?.placeholder?.dateOfBirth}
                        name="dateOfBirth"
                        control={control}
                        errors={errors}
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
                    keyboardType="default"
                    errors={errors}
                    edit={false}
                    required
                  />
                  <ComInput
                    label={EditProfile?.label?.email}
                    placeholder={EditProfile?.placeholder?.email}
                    name="email"
                    control={control}
                    keyboardType="default"
                    errors={errors}
                    required
                  />
                  <ComInput
                    label={EditProfile?.label?.idNumber}
                    placeholder={EditProfile?.placeholder?.idNumber}
                    name="cccd"
                    control={control}
                    errors={errors}
                    edit={role?.name == "Customer" ? true : false}
                    required
                  />
                  <ComInput
                    label={EditProfile?.label?.address}
                    placeholder={EditProfile?.placeholder?.address}
                    name="address"
                    control={control}
                    errors={errors}
                    required
                  />
                </View>
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
