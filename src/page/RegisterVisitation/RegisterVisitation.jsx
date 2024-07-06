import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Keyboard,
} from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import ComElder from "../../Components/ComElder/ComElder";
import ComButton from "../../Components/ComButton/ComButton";
import ComSelectedOneDate from "./../../Components/ComDate/ComSelectedOneDate";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { useAuth } from "../../../auth/useAuth";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";

export default function RegisterVisitation() {
  const [selectedDate, setSelectedDate] = useState({});
  const { user, elders } = useAuth();
  const [selectedElderId, setSelectedElderId] = useState(null);

  const {
    text: { visitationText },
  } = useContext(LanguageContext);

  const navigation = useNavigation();

  const handleElderPress = (id) => {
    setSelectedElderId(id);
  };

  const changeSelectedDate = (data) => {
    setSelectedDate(data);
  };

  const loginSchema = yup.object().shape({
  });

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      text: "",
      date: yup.date().required("Vui lòng chọn ngày đặt lịch"),
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {

    // Example formData construction
    const formData = {
      ...data,
      name: "Đăng ký lịch thăm nuôi",
      description: "Đăng ký lịch thăm nuôi",
      notes: "Đăng ký lịch thăm nuôi",
      userId: user?.id,
      date: moment(data?.date).format("YYYY-MM-DD"),
      type: "None",
    };
    console.log("formData:", formData);

    // postData("/appointments", formData, {})
    //   .then((data) => {
    //     console.log("Registration successful:", data);
    //     navigation.navigate("RegisterVisitationSuccess", { date: selectedDate });
    //   })
    //   .catch((error) => {
    //     console.log("Error registering:", error);
    //     showToast("error", "Đã có lỗi xảy ra, vui lòng thử lại", "", "bottom");
    //   });

    // Simulated success navigation
    navigation.navigate("RegisterVisitationSuccess", { formData: formData });
  };

  return (
    <>
      <ComHeader
        showTitle={true}
        title={visitationText?.titleHeader}
        showBackIcon
      />
      <View style={styles.body}>
        <FormProvider {...methods}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#33B39C",
              }}
            >
              <View style={{ width: "90%" }}>
                <ComSelectedOneDate
                  date={changeSelectedDate}
                  name="date"
                  control={control}
                  errors={errors}
                  enabled={true}
                />
              </View>
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 24, marginVertical: 10 }}>
              {visitationText?.registerElder}
            </Text>
            <View>
              {elders?.map((value, index) => (
                <ComElder
                  key={index}
                  data={value}
                  onPress={() => handleElderPress(value?.id)}
                  isSelected={selectedElderId === value?.id}
                />
              ))}
            </View>
            <View style={{ height: 20 }}></View>
          </ScrollView>
          <View style={{ marginVertical: 20 }}>
            <ComButton onPress={handleSubmit(onSubmit)}>
              {visitationText?.Confirm}
            </ComButton>
          </View>
        </FormProvider>
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
  },
});


