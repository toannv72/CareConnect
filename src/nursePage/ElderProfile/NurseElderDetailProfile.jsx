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
import { useRoute } from "@react-navigation/native";
import { postData, getData } from "../../api/api";
import moment from 'moment';

export default function NurseElderDetailProfile() {
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState({ role: "user" });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])

  const navigation = useNavigation();
  const route = useRoute();
  const { id, selectedRoom } = route.params || {};

  const {
    text: {
      ElderProfile,
      EditProfile,
      CareSchedule,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);

  useEffect(() => {
    setLoading(!loading);
    getData(`/elders/${id}`, {})
      .then((elders) => {
        setData(elders?.data);
        setLoading(loading);
        const formattedDate = moment(elders?.data?.dateOfBirth, "YYYY-MM-DD").format("DD/MM/YYYY");
        methods.reset({
          fullName: elders?.data?.name,
          dateOfBirth: formattedDate,
          gender: elders?.data?.gender,
          nurseHomeAddress: CareSchedule?.room + " " + selectedRoom?.name + ", " + CareSchedule?.area + " " + selectedRoom?.block?.name,
          address: elders?.data?.address
        });
      })
      .catch((error) => {
        setLoading(loading);
        console.error("Error fetching service-package:", error);
      });
  }, [])

  const loginSchema = yup.object().shape({});

  const medicalProfile = () => {
    navigation.navigate("MedicalProfile", { elderData: data });
  };

  const representative = () => {
    navigation.navigate("CustomerProfile", { userData: data?.user });
  };

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      fullName: '',
      dateOfBirth: '',
      gender: '',
      nurseHomeAddress: '',
      address: ''
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const genderData = [
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
    <>
      <ComHeader
        title={ElderProfile?.detail?.title}
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
                      uri: data?.imageUrl || "https://firebasestorage.googleapis.com/v0/b/careconnect-2d494.appspot.com/o/images%2F3be127ed-a90e-4364-8160-99338def0144.png?alt=media&token=3de8a6cb-0986-4347-9a22-eb369f7d02ff",
                    }}
                    style={styles.avatar}
                  />
                </View>
                <View style={{ gap: 10 }}>
                  <ComInput
                    label={ElderProfile?.detail?.name}
                    placeholder={ElderProfile?.detail?.name}
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
                        options={genderData}
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
                    label={ElderProfile?.detail?.nursingHomeAdd}
                    placeholder={ElderProfile?.detail?.nursingHomeAdd}
                    name="nurseHomeAddress"
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
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, paddingBottom: 5 }}>
              <ComButton onPress={medicalProfile} check={true} style={{ flex: 1, borderRadius: 50 }}>
                {ElderProfile?.detail?.medicalProfile}
              </ComButton>
              <ComButton onPress={representative} style={{ flex: 1, borderRadius: 50 }}>
                {ElderProfile?.detail?.representative}
              </ComButton>
            </View>
          </FormProvider>
        </View >
      </View >
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
