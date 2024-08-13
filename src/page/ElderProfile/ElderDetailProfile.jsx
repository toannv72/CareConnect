import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, StyleSheet, View, Text, ScrollView } from "react-native";
import * as yup from "yup";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComInput from "../../Components/ComInput/ComInput";
import ComButton from "../../Components/ComButton/ComButton";
import ComSelect from "../../Components/ComInput/ComSelect";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { useAuth } from "../../../auth/useAuth";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import moment from 'moment';
import { deleteData, getData } from "../../api/api";
import ComFamilyMember from "./ComFamilyMember";

export default function DetailProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const { role } = useAuth();
  const { data } = route.params;
  const [familyMems, setFamilyMems] = useState([]);
  const [elderData, setElderData] = useState({});
  const [refresh, setRefresh] = useState(false);

  const {
    text: {
      ElderProfile,
      EditProfile,
      contractsPage,
      common: { button },
    },
  } = useContext(LanguageContext);

  const loginSchema = yup.object().shape({
  });
  const medicalProfile = () => {
    navigation.navigate("MedicalProfile", { elderData: data });
  };
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

  const getElder = async () => {
    getData(`/elders/${data?.id}`, {})
      .then((elders) => {
        setElderData(elders?.data)
        setValue("fullName", data?.name ?? "Không có");
        setValue("address", data?.address ?? "Không có");
        setValue("idNumber", data?.cccd ?? "Không có");
        setValue("relationship", data?.relationship ?? "Không có");
        setValue("dateOfBirth", moment(data?.dateOfBirth, "YYYY-MM-DD").format("DD/MM/YYYY") ?? "Không có");
        setValue("gender", data?.gender ?? "Không có");
      })
      .catch((error) => {
        console.error("Error getData fetching /elders items:", error);
      })
  }

  const getBlock = async () => {
    getData(`/block/${data?.room?.blockId}`, {})
      .then((block) => {
        const blockName = block?.data?.name
        setValue("nurseHomeAddress", "Phòng " + data?.room?.name + ", khu " + blockName ?? "");
      })
      .catch((error) => {
        console.error("Error getData fetching items:", error);
      })
  }

  const getRoom = async () => {
    getData(`/room/${data?.roomId}`, {})
      .then((room) => {
        const blockName = room?.data?.block?.name
        setValue("nurseHomeAddress", room?.data?.name + ", " + blockName ?? "");
      })
      .catch((error) => {
        console.error("Error getData fetching items:", error);
      })
  }

  const getFamilyMems = async () => {
    getData(`/family-member?ElderId=${data?.id}&State=Active`, {})
      .then((members) => {
        const family = members?.data?.contends
        setFamilyMems(family)
      })
      .catch((error) => {
        console.error("Error getData fetching family-member:", error);
      })
  }

  useFocusEffect(
    useCallback(() => {

      data?.room?.blockId ? (
        getBlock()
      ) : (
        getRoom()
      )

      if (data) {
        getElder()
        getFamilyMems()
      }
    }, [data, setValue, refresh])
  );

  const representative = () => {
    navigation.navigate("CustomerProfile", { userData: data?.user });
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
                      uri: data?.imageUrl,
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
                    keyboardType="default"
                    errors={errors}
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
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <ComInput
                        label={EditProfile?.label?.dateOfBirth}
                        placeholder={EditProfile?.label?.dateOfBirth}
                        name="dateOfBirth"
                        edit={false}
                        control={control}
                        errors={errors}
                      />
                    </View>
                  </View>
                  {
                    role?.name == "Customer" && (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          gap: 10,
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <ComInput
                            label={EditProfile?.label?.idNumber}
                            placeholder={EditProfile?.placeholder?.idNumber}
                            name="idNumber"
                            edit={false}
                            control={control}
                            errors={errors}
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <ComInput
                            label="Mối quan hệ"
                            placeholder="Mối quan hệ"
                            name="relationship"
                            edit={false}
                            control={control}
                            errors={errors}
                          />
                        </View>
                      </View>
                    )
                  }

                  {
                    role?.name == "Nurse" && (
                      <ComInput
                        label="Mối quan hệ"
                        placeholder="Mối quan hệ"
                        name="relationship"
                        edit={false}
                        control={control}
                        errors={errors}
                      />
                    )
                  }
                  <ComInput
                    label={ElderProfile?.detail?.nursingHomeAdd}
                    placeholder={ElderProfile?.detail?.nursingHomeAdd}
                    name="nurseHomeAddress"
                    edit={false}
                    control={control}
                    errors={errors}
                  />
                  <ComInput
                    label={EditProfile?.label?.address}
                    placeholder={EditProfile?.placeholder?.address}
                    name="address"
                    edit={false}
                    control={control}
                    errors={errors}
                  />
                  <View style={{ marginHorizontal: 5}}>
                    <View style={{ marginBottom: 4 }}>
                      <Text style={{ fontWeight: "bold" }}>Thói quen sinh hoạt</Text>
                    </View>

                    <View style={{ maxHeight: 120, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: "#33B39C" }}>
                      <ScrollView
                        style={styles?.input}
                        nestedScrollEnabled={true}
                      >
                        <Text>{elderData?.habits || "Không có"}</Text>
                      </ScrollView>
                    </View>
                  </View>
                  <View style={{ marginHorizontal: 5}}>
                    <View style={{ marginBottom: 4 }}>
                      <Text style={{ fontWeight: "bold" }}>Ghi chú</Text>
                    </View>

                    <View style={{ maxHeight: 120, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: "#33B39C" }}>
                      <ScrollView
                        style={styles?.input}
                        nestedScrollEnabled={true}
                      >
                        <Text>{elderData?.notes || "Không có"}</Text>
                      </ScrollView>
                    </View>
                  </View>
                </View>
                <ComFamilyMember familyMems={familyMems} setRefresh={setRefresh} data={data} canAdd={data?.state == "Active"} />
              </ScrollView>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, paddingBottom: 5 }}>
              <ComButton onPress={medicalProfile} check={true} >
                {ElderProfile?.detail?.medicalProfile}
              </ComButton>
              {
                role?.name == "Nurse" &&
                (<ComButton onPress={representative} >
                  {contractsPage?.representative}
                </ComButton>)
              }
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
    paddingTop: 10,
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
    marginBottom: 10,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "gray",
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
    maxHeight: 100,
    padding: 5,
    
  },
});
