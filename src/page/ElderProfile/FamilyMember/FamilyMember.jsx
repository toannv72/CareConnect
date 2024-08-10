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
import ComDatePicker from "../../../Components/ComInput/ComDatePicker";
import { ScrollView } from "react-native";
import ComHeader from "../../../Components/ComHeader/ComHeader";
import { getData, postData } from "../../../api/api";
import moment from "moment";

export default function FamilyMember({ }) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { elderId } = route.params;

  const {
    text: { EditProfile, Register, common: { button } },
  } = useContext(LanguageContext);

  const loginSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(Register?.message?.name),
    gender: yup
      .string()
      .required(EditProfile?.message?.gender),
    dateOfBirth: yup
      .date()
      .required(EditProfile?.message?.dateOfBirth),
    email: yup
      .string()
      .email(EditProfile?.message?.emailInvalid)
      .trim()
      .required(EditProfile?.message?.email),
    phoneNumber: yup
      .string()
      .trim()
      .required(Register?.message?.phoneRequired)
      .matches(/^0\d{9,10}$/, Register?.message?.phoneInvalid),
    address: yup
      .string()
      .trim()
      .required(EditProfile?.message?.address),
  });

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: "Male",
      dateOfBirth: moment().subtract(18, "years").toDate(),
      phoneNumber: "",
      address: "",
      relationship: "Ba/mẹ"
    },
  });

  const { control, handleSubmit, formState: { errors }, setValue } = methods;

  const handleCreate = (data) => {
    setLoading(true);
    Keyboard.dismiss();
    const newData = {
      ...data,
      dateOfBirth: formattedDate(new Date(data?.dateOfBirth)),
      elderId: elderId
    };
    postData("/family-member", newData)
      .then((data) => {
        setLoading(false);
        return new Promise((resolve) => {
          setTimeout(() => {
            ComToast({ text: 'Thêm người giám hộ thành công' });
            navigation.goBack();
            resolve();
          }, 0);
        });
      })
      .catch((error) => {
        setLoading(false)
        if (error.response.status === 600)
          ComToast({ text: 'Số điện thoại của người giám hộ này đã tồn tại. Vui lòng thử lại.' });
        else
          ComToast({ text: 'Đã có lỗi xảy ra. Vui lòng thử lại.' });
      });
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

  const relationshipOptions = [
    {
      value: "Ba/mẹ",
      label: "Ba/mẹ",
    },
    {
      value: "Anh/Em",
      label: "Anh/Em",
    },
    {
      value: "Con",
      label: "Con",
    },
    {
      value: "Cháu",
      label: "Cháu",
    },
    {
      value: "Khác",
      label: "Khác",
    },
  ]

  const formattedDate = (dateValue) => {
    if (!dateValue || !(dateValue instanceof Date)) {
      return "";
    }
    const day = dateValue.getDate().toString().padStart(2, "0");
    const month = (dateValue.getMonth() + 1).toString().padStart(2, "0");
    const year = dateValue.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <ComHeader
        title="Thêm người giám hộ"
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
                <View style={{ gap: 10 }}>
                  <ComInput
                    label={EditProfile?.label?.fullName}
                    placeholder={EditProfile?.placeholder?.fullName}
                    name="name"
                    control={control}
                    keyboardType="default"
                    errors={errors}
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
                        errors={errors}
                        required
                        enabled={true}
                        maximumDate={moment().subtract(18, "years").toDate()}
                        minimumDate={moment().subtract(100, "years").toDate()}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 10,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <ComSelect
                        label="Mối quan hệ"
                        name="relationship"
                        control={control}
                        errors={errors}
                        options={relationshipOptions}
                        required
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <ComInput
                        label={EditProfile?.label?.phoneNumber}
                        placeholder={EditProfile?.placeholder?.phoneNumber}
                        name="phoneNumber"
                        control={control}
                        keyboardType="default"
                        errors={errors}
                        required
                      />
                    </View>
                  </View>
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
                onPress={loading ? null : handleSubmit(handleCreate)}>
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
