import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, StyleSheet, View } from "react-native";
import * as yup from "yup";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComInput from "../../Components/ComInput/ComInput";
import ComButton from "../../Components/ComButton/ComButton";
import ComSelect from "../../Components/ComInput/ComSelect";
import { ScrollView } from "react-native";
import ComHeader from "../../Components/ComHeader/ComHeader";
import moment from 'moment';
import { useAuth } from "../../../auth/useAuth";
import { getData } from "../../api/api";
import ImageModal from 'react-native-image-modal'

export default function DetailProfile({ route }) {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [image, setImage] = useState(user?.avatarUrl);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => { // cập nhật giá trị user sau mỗi lần update
    setImage(userData?.avatarUrl);
    Object.keys(userData).forEach(key => {
      setValue(key, userData[key]);
    });
    setValue("cccd", userData?.cccd)
    setValue("dateOfBirth", moment(userData?.dateOfBirth, "YYYY-MM-DD").format("DD/MM/YYYY") ?? "",);
  }, [userData]);

  const {
    text: {
      EditProfile,
      UserProfile,
      common: { button },
    },
  } = useContext(LanguageContext);
  const loginSchema = yup.object().shape({

  });
  const Edit = () => {
    navigation.navigate("EditProfile", { userData });
  };
  const methods = useForm({
    resolver: yupResolver(),
    defaultValues: {
      fullName: userData?.fullName ?? "",
      email: userData?.email ?? "",
      gender: userData?.gender ?? "",
      dateOfBirth: moment(userData?.dateOfBirth, "YYYY-MM-DD").format("DD/MM/YYYY") ?? "",
      phoneNumber: userData?.phoneNumber ?? "",
      cccd: userData?.cccd ?? "",
      address: userData?.address ?? ""
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
    }
  ];

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getData(`/users/${user?.id}`, {})
        .then((users) => {
          setUserData(users?.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log("Error getData fetching items:", error);
        });
    }, [user])
  );

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
                  {/* <Image
                    source={{
                      uri: image ? image : "https://firebasestorage.googleapis.com/v0/b/careconnect-2d494.appspot.com/o/images%2F3be127ed-a90e-4364-8160-99338def0144.png?alt=media&token=3de8a6cb-0986-4347-9a22-eb369f7d02ff",
                    }}
                    style={styles.avatar}
                  /> */}
                  <View>
                    <ImageModal
                      resizeMode='contain'
                      style={styles.avatar}
                      source={{
                        uri: image ? image : "https://firebasestorage.googleapis.com/v0/b/careconnect-2d494.appspot.com/o/images%2F3be127ed-a90e-4364-8160-99338def0144.png?alt=media&token=3de8a6cb-0986-4347-9a22-eb369f7d02ff",
                      }}
                    />
                  </View>
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
                    errors={errors} // Pass errors object
                    edit={false}
                  />
                  <ComInput
                    label={EditProfile?.label?.email}
                    placeholder={EditProfile?.placeholder?.email}
                    name="email"
                    edit={false}
                    control={control}
                    errors={errors} // Pass errors object
                  />
                  <ComInput
                    label={EditProfile?.label?.idNumber}
                    placeholder={EditProfile?.placeholder?.idNumber}
                    name="cccd"
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
    width: 130,
    height: 130,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "gray",
  },
});
