import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, StyleSheet, View} from "react-native";
import * as yup from "yup";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComInput from "../../Components/ComInput/ComInput";
import ComButton from "../../Components/ComButton/ComButton";
import ComSelect from "../../Components/ComInput/ComSelect";
import { ScrollView } from "react-native";
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
        setValue("fullName", data?.name ?? "");
        setValue("address", data?.address ?? "");
        setValue("idNumber", data?.cccd ?? "");
        setValue("dateOfBirth", moment(data?.dateOfBirth, "YYYY-MM-DD").format("DD/MM/YYYY") ?? "");
        setValue("gender", data?.gender ?? "");
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
                  {
                    role?.name == "Customer" && (
                      <ComInput
                        label={EditProfile?.label?.idNumber}
                        placeholder={EditProfile?.placeholder?.idNumber}
                        name="idNumber"
                        edit={false}
                        control={control}
                        errors={errors} // Pass errors object
                      />
                    )
                  }
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
                <ComFamilyMember familyMems={familyMems} setRefresh={setRefresh} data={data} canAdd={data?.state == "Active"}/>
              </ScrollView>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, paddingBottom: 5 }}>
              <ComButton onPress={medicalProfile} check={true} style={{ flex: role?.name == "Nurse" ? 0.6 : 1 }}>
                {ElderProfile?.detail?.medicalProfile}
              </ComButton>
              {
                role?.name == "Nurse" &&
                (<ComButton onPress={representative} style={{ flex: 0.4 }}>
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
  }
});
