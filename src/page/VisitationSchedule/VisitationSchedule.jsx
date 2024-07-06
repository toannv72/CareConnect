import React, { useContext, useState, useCallback } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ComVisitationSchedule from "./ComVisitationSchedule";
import { LanguageContext } from "./../../contexts/LanguageContext";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComInputSearch from "../../Components/ComInput/ComInputSearch";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";
import ComLoading from "../../Components/ComLoading/ComLoading";
import Visitation from "../../../assets/images/VisitationSchedule/VisitationSchedule.png";
import plusIcon from "../../../assets/profile_icons/plus.png";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComButton from "../../Components/ComButton/ComButton";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { postData, getData } from "../../api/api";
import { useAuth } from "../../../auth/useAuth";

export default function VisitationSchedule() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const searchSchema = yup.object().shape({
    search: yup.string(),
  });
  const navigation = useNavigation();
  const {
    text: {
      visitationText,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);
  const methods = useForm({
    resolver: yupResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const register = () => {
    navigation.navigate("RegisterVisitation");

  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getData(`/appointments?UserId=${user?.id}&SortColumn=date&SortDir=Desc`, {})
        .then((appointments) => {
          setData(appointments?.data?.contends);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching service-package:", error);
        });
    }, [user?.id])
  );
  return (
    <>
      <ComHeader
        title={visitationText?.titleHeader}
        showTitle
        showBackIcon
      />
      <View style={styles.body}>
        <View style={{ gap: 10 }}>
          <View style={styles.imageBody}>
            <Image source={Visitation} style={styles.image} />
          </View>
          <Text
            style={{
              color: "#716767",
              textAlign: "center",
              paddingHorizontal: 20,
            }}
          >
            {visitationText?.visitationContent}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#000",
              paddingHorizontal: 5,
              fontSize: 20,
            }}
          >
            {visitationText?.textHistory}
          </Text>
          <TouchableOpacity style={styles.register} onPress={register}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
              <Image
                source={plusIcon}
                style={{
                  height: 25,
                  width: 25,
                  objectFit: "fill",
                }}
              />
              <Text
                style={{
                  color: "#000",
                  paddingHorizontal: 5,
                  fontSize: 18,
                }}
              >
                {visitationText?.register}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ComLoading show={loading}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View>
              {data?.map((value, index) => (
                <ComVisitationSchedule key={index} data={value} />
              ))}
            </View>
            <View style={{ height: 320 }}></View>
          </ScrollView>
        </ComLoading>
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
  register: {
    flexDirection: "row",
    marginBottom: 10,
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
  imageBody: {
    padding: 1,
    borderRadius: 10,
    borderWidth: 0.5,
    overflow: "hidden", // Ẩn phần ảnh nằm ngoài
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "180%",
    height: "180%",
    resizeMode: "cover",
    bottom: -50,
  },
});
