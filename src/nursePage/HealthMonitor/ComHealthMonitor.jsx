import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import healthRecord from "../../../assets/images/HealthMonitor/healthRecord.png";
import { postData, getData } from "../../api/api";
import { stylesApp } from "../../styles/Styles";

export default function ComHealthMonitor({ data, isSelected, style, time }) {
  const {
    text: { healthMonitor },
    setLanguage,
  } = useContext(LanguageContext);
  const navigation = useNavigation();

  const [nurseData, setNurseData] = useState({})
  const [roomData, setRoomData] = useState({})
  const [loading, setLoading] = useState(false);

  const formattedTime = (dateValue) => {
    const hours = new Date(dateValue).getHours().toString().padStart(2, '0');
    const minutes = new Date(dateValue).getMinutes().toString().padStart(2, '0');
    const seconds = new Date(dateValue).getSeconds();
    return `${hours}:${minutes}`;
  };

  const formattedDate = (dateValue) => {
    console.log("dateValue", new Date(dateValue))
    const day = new Date(dateValue).getDate().toString().padStart(2, "0");
    const month = (new Date(dateValue).getMonth() + 1).toString().padStart(2, "0");
    const year = new Date(dateValue).getFullYear();
    return `${day}/${month}/${year}`;
};

  useEffect(() => {
    setLoading(!loading);
    getData(`/users/${data?.createdBy}`, {})
      .then((nurseData) => {
        console.log("nurseData", nurseData?.data)
        setNurseData(nurseData?.data);
        setLoading(loading);
      })
      .catch((error) => {
        setLoading(loading);
        console.error("Error getData fetching nurseData:", error);
      });

    // getData(`/room/${data?.elder?.roomId}`, {})
    //   .then((roomData) => {
    //     console.log("roomData", roomData?.data?.name)
    //     setRoomData(roomData?.data);
    //     setLoading(loading);
    //   })
    //   .catch((error) => {
    //     setLoading(loading);
    //     console.error("Error getData fetching nurseData:", error);
    //   });
  }, []);

  return (
    <TouchableOpacity
      style={[styles.body, stylesApp.shadow, isSelected && styles.selectedBody, style]}
      onPress={() => navigation.navigate("HealthMonitorDetail", { id: data?.id, data: data})} // Chuyển đến trang mới
    >
      <Image
        source={healthRecord}
        style={{
          width: 60,
          height: 60,
          borderRadius: 50,
          objectFit: "fill",
        }}
      />
      <View style={styles?.container1}>

        <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              Báo cáo sức khỏe ngày {formattedDate(data?.createdAt)}
            </Text>
          </Text>
        </View>
        <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {healthMonitor?.time}
            </Text>
            <Text>: {formattedTime(data?.createdAt)} </Text>
          </Text>
        </View>
        <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {healthMonitor?.nurse}
            </Text>
            <Text>:  {nurseData?.fullName}</Text>
          </Text>
        </View>
         <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              Số lần đo
            </Text>
            <Text>: {time}</Text>
          </Text>
        </View>
        {/* <View style={styles?.container}>
          <Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {healthMonitor?.status}
            </Text>
            <Text>: {data?.status}</Text>
          </Text>
        </View> */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  selectedBody: {
    backgroundColor: "rgba(51, 179, 156, 0.26)",
  },
  container: {
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  container1: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  text: {
    flex: 1,
  },
});
