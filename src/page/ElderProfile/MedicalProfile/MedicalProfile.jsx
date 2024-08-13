import { useState, useEffect, useRef, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { LanguageContext } from "../../../contexts/LanguageContext";
import ComHeader from "../../../Components/ComHeader/ComHeader";
import ComElder from "../../../Components/ComElder/ComElder";
import ComButton from "../../../Components/ComButton/ComButton";
import ComMedical from "./ComMedical";
import { useNavigation } from "@react-navigation/native";
import underlyingMedical from "./underlyingMedical.png"
import { postData, getData } from "../../../api/api";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../../../../auth/useAuth";
import blood from "../../../../assets/images/ElderMedicalRecord/blood.png"
import height from "../../../../assets/images/ElderMedicalRecord/height.png"
import weight from "../../../../assets/images/ElderMedicalRecord/weight.jpg"
import move from "../../../../assets/images/ElderMedicalRecord/move.jpg"
import { stylesApp } from "../../../styles/Styles";

export default function MedicalProfile() {
  const route = useRoute();
  const { role } = useAuth();
  const { elderData } = route.params;
  const [medicalData, setMedicalData] = useState([])
  const {
    text: {
      ElderProfile,
      MedicalProfile
    },
    setLanguage,
  } = useContext(LanguageContext);
  const navigation = useNavigation();

  useEffect(() => {
    getData(`/medical-records?ElderId=${elderData?.id}`, {})
      .then((medical) => {
        setMedicalData(medical?.data?.contends[0])
      })
      .catch((error) => {
        setLoading(false)
        console.error("Error getData fetching medical-records items:", error);
      });

  }, [elderData]);

  const ComUnderlyingMedical = ({ data }) => {
    return (
      <View style={[styles?.underlyingMedical, stylesApp.shadow]}>
        <Image
          source={underlyingMedical}
          style={{ width: 60, height: 60, objectFit: "fill" }}
        />
        <Text>{data}</Text>
      </View>
    );
  };

  return (
    <>
      <ComHeader
        title={ElderProfile?.detail?.medicalProfile}
        showTitle
        showBackIcon
      />
      <View style={styles?.body}>
        <ComElder data={elderData} style={{ borderWidth: 0 }}></ComElder>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ fontWeight: "600", fontSize: 16 }}>{MedicalProfile?.generalIndex}</Text>
          <View style={styles?.content}>
            <ComMedical image={weight} title={"Cân nặng"} value={medicalData?.weight} unit={"Kg"} ></ComMedical>
            <ComMedical image={height} title={"Chiều cao"} value={medicalData?.height} unit={"Cm"} ></ComMedical>
            <ComMedical image={blood} title={"Nhóm máu"} value={medicalData?.bloodType} unit={""} ></ComMedical>
            {/* <ComMedical image={move} title={"Khả năng di chuyển"} value={medicalData?.move} unit={""} ></ComMedical> */}
          </View>
          <Text style={{ fontWeight: "600", fontSize: 16 }}>{MedicalProfile?.underlyingMedical}</Text>
          {
            medicalData?.diseaseCategories?.length == 0 ? (
              <ComUnderlyingMedical data={"Không có"}></ComUnderlyingMedical>
            ) : (
              <>
                {
                  medicalData?.diseaseCategories?.map((disease, index) => (
                    <View key={index}>
                      <ComUnderlyingMedical key={index} data={disease?.name}></ComUnderlyingMedical>
                    </View>
                  ))
                }

              </>
            )
          }

          <Text style={{ fontWeight: "600", fontSize: 16, marginTop: 5 }}>{MedicalProfile?.note}</Text>
          <View style={[styles?.underlyingMedical, stylesApp.shadow, { marginBottom: 30, paddingVertical: 5 }]}>
            <Image
              source={underlyingMedical}
              style={{ width: 60, height: 60, objectFit: "fill" }}
            />
            <Text>{medicalData?.note || "Không có"}</Text>
          </View>
        </ScrollView>
        <ComButton onPress={() => { navigation.navigate(role?.name == "Nurse" ? "ListHealthMonitor" : "HealthMonitorList", { id: elderData?.id }) }}
          style={{ marginBottom: 30, borderRadius: 50 }}>
          Theo dõi sức khỏe
        </ComButton>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    justifyContent: "space-between",
    marginVertical: 10
  },
  underlyingMedical: {
    backgroundColor: "#F7FFFE",
    borderWidth: 2,
    borderColor: "#ACDED3",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 5
  }
});