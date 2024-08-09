import React, { useContext, useState, useCallback } from "react";
import { ScrollView, StyleSheet, View, Linking } from "react-native";
import ComHeader from "../../../Components/ComHeader/ComHeader";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { getData, deleteData } from "../../../api/api";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ComInput from "../../../Components/ComInput/ComInput";
import ComSelect from "../../../Components/ComInput/ComSelect";
import moment from 'moment';
import ComButton from "../../../Components/ComButton/ComButton";
import ComPopup from "../../../Components/ComPopup/ComPopup";
import ComToast from "../../../Components/ComToast/ComToast";
import { useAuth } from "../../../../auth/useAuth";

export default function FamilyMemberProfile() {
  const [member, setMember] = useState({});
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const { role } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const { familyId, canEdit } = route.params;

  const {
    text: {
      EditProfile,
      ElderProfile,
      common: { button },
    },
  } = useContext(LanguageContext);

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
      value: "Con",
      label: "Con",
    },
    {
      value: "Anh/Em",
      label: "Anh/Em",
    },
    {
      value: "Cháu",
      label: "Cháu",
    }
  ]

  useFocusEffect(
    useCallback(() => {
      getData(`/family-member/${familyId}`, {})
        .then((response) => {
          const familymember = response?.data;
          if (familymember) {
            setMember(familymember);
            setValue("name", familymember?.name ?? "");
            setValue("relationship", familymember?.relationship ?? "");
            setValue("address", familymember?.address ?? "");
            setValue("phoneNumber", familymember?.phoneNumber ?? "");
            setValue("dateOfBirth", familymember?.dateOfBirth ? moment(familymember.dateOfBirth, "YYYY-MM-DD").format("DD/MM/YYYY") : "");
            setValue("gender", familymember?.gender ?? "");
            setValue("email", familymember?.email ?? "");
          }
        })
        .catch((error) => {
          console.error("Error fetching member data:", error);
        });
    }, [familyId, setValue])
  );

  const loginSchema = yup.object().shape({
  });
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
    },
  });
  const {
    control,
    setValue,
    formState: { errors },
  } = methods;

  const handleDelete = () => {
    setLoading(true)
    deleteData(`/family-member`, member?.id)
      .then((response) => {
        setLoading(false)
        setPopup(false)
        ComToast({ text: 'Xóa thành công' });
        navigation.goBack();
      })
      .catch((error) => {
        setLoading(false)
        setPopup(false)
        ComToast({ text: 'Đã có lỗi xảy ra. Vui lòng thử lại.' });
      });
  }

  const callNumber = (phoneNumber) => {
    // Sử dụng Linking.openURL để mở ứng dụng điện thoại với số đã cho
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <>
      <ComHeader
        title="Thông tin người giám hộ"
        showTitle
        showBackIcon
      />
      <View style={styles.container}>
        <FormProvider {...methods}>
          <View style={{ width: "100%", gap: 10, flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ gap: 10 }}>
                <ComInput
                  label="Họ và Tên"
                  placeholder="Họ và Tên"
                  name="name"
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
                      edit={false}
                      control={control}
                      errors={errors} // Pass errors object
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
                      enabled={false}
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
                      edit={false}
                    />
                  </View>
                </View>

                <ComInput
                  label="Email"
                  placeholder="Email"
                  name="email"
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
            {
              role?.name == "Customer" && (
                <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, }}>
                  <ComButton onPress={() => setPopup(true)} check={true} warning={true} style={{ flex: 1 }}>
                    Xóa
                  </ComButton>
                  {
                    canEdit && (
                      <ComButton onPress={() => navigation.navigate("EditFamilyMemberProfile", { memberData: member })} check={true} style={{ flex: 1 }}>
                        Chỉnh sửa
                      </ComButton>
                    )
                  }
                </View>
              )
            }

            {
              role?.name == "Nurse" && (
                <ComButton
                  style={{ borderRadius: 50, marginBottom: 30 }}
                  onPress={() => { callNumber(member?.phoneNumber) }}>
                  {ElderProfile?.detail?.urgentContact}
                </ComButton>
              )
            }

          </View>
        </FormProvider>
      </View>

      <ComPopup
        visible={popup}
        title="Bạn có chắc muốn xóa thông tin của người giám hộ này?"
        onClose={() => setPopup(false)}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, }}>
          <ComButton onPress={() => setPopup(false)} check={true} warning={true} style={{ flex: 1 }}>
            Hủy
          </ComButton>
          <ComButton onPress={() => { handleDelete() }} style={{ flex: 1 }} warning={true}>
            Xác nhận
          </ComButton>
        </View>
      </ComPopup>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  container: {
    paddingTop: 20,
    paddingHorizontal: "5%",
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
});
