import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, TouchableOpacity, View, Linking } from "react-native";
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
import phoneIcon from '../../../assets/icon/phone.png';

export default function NurseElderDetailProfile() {
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState({ role: "user" });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])
  const [familyMems, setFamilyMems] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { id, selectedRoom } = route.params || {};

  const {
    text: {
      ElderProfile,
      EditProfile,
      CareSchedule,
      contractsPage,
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
    getFamilyMems()
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

  const getFamilyMems = async () => {
    getData(`/family-member?ElderId=${id}&State=Active`, {})
      .then((members) => {
        const family = members?.data?.contends
        setFamilyMems(family)
      })
      .catch((error) => {
        console.error("Error getData fetching family-member:", error);
      })
  }

  const callNumber = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

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
                  <View style={{ marginHorizontal: 5 }}>
                    <View style={{ marginBottom: 4 }}>
                      <Text style={{ fontWeight: "bold" }}>Thói quen sinh hoạt</Text>
                    </View>

                    <View style={{ maxHeight: 120, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: "#33B39C" }}>
                      <ScrollView
                        style={styles?.input}
                        nestedScrollEnabled={true}
                      >
                        <Text>{data?.habits || "Không có"}</Text>
                      </ScrollView>
                    </View>
                  </View>
                  <View style={{ marginHorizontal: 5 }}>
                    <View style={{ marginBottom: 4 }}>
                      <Text style={{ fontWeight: "bold" }}>Ghi chú</Text>
                    </View>

                    <View style={{ maxHeight: 120, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: "#33B39C" }}>
                      <ScrollView
                        style={styles?.input}
                        nestedScrollEnabled={true}
                      >
                        <Text>{data?.notes || "Không có"}</Text>
                      </ScrollView>
                    </View>
                  </View>
                </View>
                <View style={{ marginHorizontal: 5 }}>
                  <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontWeight: "bold", marginRight: 4 }}>Danh sách người giám hộ</Text>
                  </View>
                  <View style={styles.contex}>
                    {
                      familyMems?.length === 0 ?
                        (
                          <Text style={{ marginHorizontal: 10, paddingVertical: 5, color: "#A3A3A3" }}>Chưa có người giám hộ.</Text>
                        ) : (
                          <>
                            <View style={[styles.bodySeparator, { borderTopWidth: 0 }]}>
                              <Text style={[styles.text, { flex: 5 }]}>Họ và tên</Text>
                              <Text style={[styles.text, { flex: 4, textAlign: "center" }]}>Số điện thoại</Text>
                              <Text style={[styles.text, { flex: 2, textAlign: "right" }]}>Gọi</Text>
                            </View>
                            {
                              familyMems?.map((family, index) => (
                                <View key={index} style={styles.bodySeparator}>
                                  <TouchableOpacity onPress={() => navigation.navigate("FamilyMemberProfile", { familyId: family?.id })} style={[{ flex: 5 }]}>
                                    <Text style={{ color: "#33B39C" }}>{family?.name}</Text>
                                  </TouchableOpacity>
                                  <Text style={[styles.text2, { flex: 4, textAlign: "center" }]}>{family?.phoneNumber}</Text>
                                  <View style={{ flex: 2, alignItems: "flex-end" }}>
                                    <TouchableOpacity onPress={() => { callNumber(family?.phoneNumber) }} style={[{ flex: 5 }]}>
                                      <Image
                                        source={phoneIcon}
                                        style={{
                                          width: 20,
                                          height: 20,
                                          tintColor: "#33B39C"
                                        }}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              ))
                            }
                          </>
                        )
                    }
                  </View>
                </View>
              </ScrollView>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, paddingBottom: 5 }}>
              <ComButton onPress={medicalProfile} check={true} style={{ flex: 0.6, borderRadius: 50 }}>
                {ElderProfile?.detail?.medicalProfile}
              </ComButton>
              <ComButton onPress={representative} style={{ flex: 0.4, borderRadius: 50 }}>
                {contractsPage?.representative}
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
  contex: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
    paddingHorizontal: 5,
    paddingVertical: 5
  },
  bodySeparator: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#33B39C",
    alignItems: "center",
    marginHorizontal: 15,
    gap: 10
  },
  text: {
    // flex: 0.35,
    fontWeight: "600",
  },
  text2: {
    flex: 0.65,
    textAlign: "center",
  },
  register: {
    flexDirection: "row",
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
    backgroundColor: "#caece6",
    elevation: 4, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

  },
  input: {
    backgroundColor: "#fff",
    color: "#000",
    maxHeight: 100
  },
});
