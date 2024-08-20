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
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import ComSelectedOneDate from "./../../Components/ComDate/ComSelectedOneDate";
import ComToast from "../../Components/ComToast/ComToast";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { useAuth } from "../../../auth/useAuth";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { postData, getData } from "../../api/api";
import ComNoData from "../../Components/ComNoData/ComNoData";

export default function RegisterVisitation() {
  const [selectedDate, setSelectedDate] = useState({});
  const { user, elders } = useAuth();
  const [selectedElderIds, setSelectedElderIds] = useState([]);

  const {
    text: { visitationText, servicePackages },
  } = useContext(LanguageContext);

  const navigation = useNavigation();

  const handleElderPress = (id) => {
    setSelectedElderIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((elderId) => elderId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const changeSelectedDate = (data) => {
    setSelectedDate(data);
  };

  const loginSchema = yup.object().shape({
    date: yup.date().required("Vui lòng chọn ngày đặt lịch"),
  });

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {},
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    const formData = {
      ...data,
      name: "Đăng ký lịch thăm nuôi",
      description: "Đăng ký lịch thăm nuôi",
      notes: "Đăng ký lịch thăm nuôi",
      userId: user?.id,
      date: moment(data?.date).format("YYYY-MM-DD"),
      type: "FollowUpVisit",
      elders: selectedElderIds.map((id) => ({ id })),
    };

    postData("/appointments", formData, {})
      .then((data) => {
        navigation.navigate("RegisterVisitationSuccess", { formData: formData });
      })
      .catch((error) => {
        if (error.response.status === 624)
          ComToast({ text: 'Bạn đã có lịch hẹn vào ngày này. Vui lòng chọn ngày khác.' });
        else
          ComToast({ text: 'Đã có lỗi xảy ra, vui lòng thử lại.' });
      });
  };

  const activeElders = elders?.filter((elder) => elder?.state === "Active");

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
                <View style={{ gap: 5 }}>
                  <Text style={{ color: "#A3A3A3", textAlign: "center", marginVertical: 10 }}>{servicePackages?.popup?.limitDays}</Text>
                  <Text style={{ textAlign: "center" }}>Thời gian làm việc: từ 07:00 đến 17:00</Text>
                </View>
                <ComSelectedOneDate
                  date={changeSelectedDate}
                  name="date"
                  control={control}
                  errors={errors}
                  enabled={true}
                  minDate={moment().add(1, 'day').toString()}
                  maxDate={moment().add(13, 'days').toString()}
                />
              </View>
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 24, marginVertical: 10 }}>
              {visitationText?.registerElder}
            </Text>
            <View>
              {activeElders?.length > 0 ? (
                <View>
                  {activeElders?.map((value, index) => (
                    <ComElder
                      key={index}
                      data={value}
                      onPress={() => handleElderPress(value?.id)}
                      isSelected={selectedElderIds.includes(value?.id)}
                    />
                  ))}
                </View>
              ) : (<ComNoData>Hiện tại đang không có người cao tuổi nào</ComNoData>)}
            </View>
            <View style={{ height: 20 }}></View>
          </ScrollView>
          <View style={{ marginVertical: 20 }}>
            <ComSelectButton
              disable={selectedElderIds?.length === 0}
              onPress={handleSubmit(onSubmit)}>
              {visitationText?.Confirm}
            </ComSelectButton>
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
