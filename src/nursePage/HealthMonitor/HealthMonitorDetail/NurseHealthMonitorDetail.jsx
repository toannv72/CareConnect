import React, { useContext, useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { LanguageContext } from "../../../contexts/LanguageContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComPatient from "./ComPatient";
import { useRoute } from "@react-navigation/native";
import ComButtonDay from "../../../Components/ComButton/ComButtonDay";
import ComHealthIndex from "../../../Components/ComHealthIndex/ComHealthIndex";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import ComHeader from "../../../Components/ComHeader/ComHeader";
import { postData, getData } from "../../../api/api";
import User_fill from "../../../../assets/User_fill.png"
import { stylesApp } from "../../../styles/Styles";
import { useNavigation } from "@react-navigation/native";

export default function HealthMonitorDetail() {
  const route = useRoute();
  const { data, elderData, roomData } = route.params;
  const [loading, setLoading] = useState(false);
  const [healthMonitor, setHealthMonitor] = useState([]);
  const navigation = useNavigation();

  const {
    text: {
      HealthMonitorDetail,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);

  const onSubmit = (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  };
  const loginSchema = yup.object().shape({});
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    values: {
    },
  });

  const {
    control,
    formState: { errors },
  } = methods;

  const ComTimeDivision = ({ time }) => {
    return (
      <View style={{ flexDirection: "row", marginVertical: 10, gap: 10, alignItems: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{time}</Text>
        <View style={{ borderBottomColor: "#33B39C", borderBottomWidth: 1, flex: 1, height: 0 }}></View>
      </View>
    );
  };

  useEffect(() => {
    setLoading(!loading);
    getData(`/health-report?ElderId=${data?.elderId}`, {})
      .then((healthMonitor) => {
        setHealthMonitor(healthMonitor?.data?.contends);
        setLoading(loading);
      })
      .catch((error) => {
        setLoading(loading);
        console.error("Error getData fetching items:", error);
      });
  }, []);

  const toVietnamTime = (dateValue) => {
    const date = new Date(dateValue);
    date.setHours(date.getHours() + 7); // Convert to UTC+7
    return date;
  };

  const formattedTime = (dateValue) => {
    const hours = new Date(dateValue).getHours().toString().padStart(2, '0');
    const minutes = new Date(dateValue).getMinutes().toString().padStart(2, '0');
    const seconds = new Date(dateValue).getSeconds();
    return `${hours}:${minutes}`;
  };

  const datePart = toVietnamTime(data?.createdAt).toISOString().split('T')[0];

  // Filter healthMonitor list based on Vietnam time date part
  const filteredHealthMonitor = healthMonitor.filter(item =>
    toVietnamTime(item.createdAt).toISOString().split('T')[0] === datePart
  );
  return (
    <>
      <ComHeader
        title={HealthMonitorDetail?.title}
        showTitle
        showBackIcon
      />
      <View style={styles.body}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.patient}>
            <View style={styles.patient60}>
              <ComPatient data={data?.elder} />
            </View>
            <View style={styles.patient40}>
              <ComButtonDay><ComDateConverter>{datePart}</ComDateConverter></ComButtonDay>
            </View>
          </View>
          {filteredHealthMonitor?.map((item, index) => (
            <View key={index}>
              <ComTimeDivision time={`Lần đo thứ ${index + 1} - ${formattedTime(item?.createdAt)}`}></ComTimeDivision>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text>Chỉ số sức khỏe</Text>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <Image
                    source={User_fill}
                    style={{
                      width: 30,
                      height: 30,
                      objectFit: "fill",
                    }} />
                  <Text>{item?.creatorInfo?.fullName}</Text>
                </View>
              </View>

              {item?.healthReportDetails?.map((detail, detailIndex) => (
                <ComHealthIndex
                  key={detailIndex}
                  data={detail}
                  healthMonitor={healthMonitor}
                  date={item?.createdAt}
                  index={index + 1}
                  collapse={true}
                />
              ))}
              <View>
                <ComTextArea
                  label={"Ghi chú tổng quát"}
                  placeholder={"Ghi chú"}
                  name="email"
                  edit={false}
                  control={control}
                  keyboardType="default" // Set keyboardType for First Name input
                  errors={errors}
                  defaultValue={item?.notes}
                />
              </View>
            </View>
          ))}
          <View style={{ height: 30 }}></View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  patient: {
    flexDirection: "row",
  },
  patient60: {
    flex: 0.65,
  },
  patient40: {
    flex: 0.35,
    justifyContent: "center",
    alignItems: "center",
  },
});
