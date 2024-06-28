import React, { useContext, useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { LanguageContext } from "../../contexts/LanguageContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComPatient from "./ComPatient";
import { useRoute } from "@react-navigation/native";
import ComButtonDay from "../../Components/ComButton/ComButtonDay";
import ComHealthIndex from "../../Components/ComHealthIndex/ComHealthIndex";
import ComTextArea from "../../Components/ComInput/ComTextArea";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { postData, getData } from "../../api/api";
import User_fill from "../../../assets/User_fill.png"

export default function HealthMonitorDetail() {
  // const [data, setData] = useState({
  //   img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
  //   name: "Lê Hiếu Nghĩa Đệ Nhất ",
  //   age: "34",
  //   sex: "Nam",
  //   room: "17",
  //   bed: "3",
  //   id: 1,
  // });

  const route = useRoute();
  const { data } = route.params;
  const [loading, setLoading] = useState(false);
  const [healthMonitor, setHealthMonitor] = useState([]);

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
    handleSubmit,
    register,
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
        console.log("setHealthMonitor", healthMonitor?.data?.contends)
        setHealthMonitor(healthMonitor?.data?.contends);
        setLoading(loading);
      })
      .catch((error) => {
        setLoading(loading);
        console.error("Error getData fetching items:", error);
      });


  }, []);

  const formattedTime = (dateValue) => {
    const hours = new Date(dateValue).getHours().toString().padStart(2, '0');
    const minutes = new Date(dateValue).getMinutes().toString().padStart(2, '0');
    const seconds = new Date(dateValue).getSeconds();
    return `${hours}:${minutes}`;
  };
  return (
    <>
      <ComHeader
        title={HealthMonitorDetail?.title}
        showTitle
        showBackIcon
      />
      <View style={styles.body}>
        <View style={styles.patient}>
          <View style={styles.patient60}>
            <ComPatient data={data?.elder} />
          </View>
          <View style={styles.patient40}>
            <ComButtonDay>8/8/2023</ComButtonDay>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles?.scrollView}
        >

          {
            healthMonitor?.map((item, index) => (
              <View key={index}>
                <ComTimeDivision time={`Lần ${index + 1} - ${formattedTime(item?.createdAt)}`}></ComTimeDivision>
                <View style={{ flexDirection: "row",  alignItems: "center", justifyContent: "space-between" }}>
                  <Text>Chỉ số sức khỏe</Text>
                  <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Image
                      source={User_fill}
                      style={{
                        width: 30,
                        height: 30,
                        objectFit: "fill",
                      }}/>

                    <Text>Ten y ta</Text>

                  </View>

                </View>

                {item?.healthReportDetails?.map((detail, detailIndex) => (
                  <ComHealthIndex key={detailIndex} data={detail} healthMonitor={healthMonitor}></ComHealthIndex>
                ))}
                <ComTextArea
                  label={"Ghi chú"}
                  placeholder={"Ghi chú"}
                  name="email"
                  edit={false}
                  control={control}
                  keyboardType="default" // Set keyboardType for First Name input
                  errors={errors}
                  defaultValue={item?.notes}
                />
              </View>
            )
            )
          }

          <View style={{ height: 30 }}></View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  patient: {
    flexDirection: "row",
  },
  patient60: {
    flex: 0.7,
  },
  patient40: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
});
