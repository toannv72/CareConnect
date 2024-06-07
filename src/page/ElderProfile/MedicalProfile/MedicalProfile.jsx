import { useState, useEffect, useRef, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { LanguageContext } from "../../../contexts/LanguageContext";
import ComHeader from "../../../Components/ComHeader/ComHeader";
import ComElder from "../../../Components/ComElder/ComElder";
import ComMedical from "./ComMedical";
import { useNavigation } from "@react-navigation/native";
import underlyingMedical from "./underlyingMedical.png"

export default function MedicalProfile() {
  const {
    text: {
      ElderProfile,
      MedicalProfile
    },
    setLanguage,
  } = useContext(LanguageContext);
  const navigation = useNavigation();

  const elderData = {
    img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
    name: "Nguyễn Văn toàn",
    age: "34",
    sex: "Nam",
    room: "17",
    bed: "3",
    id: 1,
  }

  const [medicalData, setMedicalData] = useState([
    {
      img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
      title: "Cân nặng",
      value: "54",
      unit: "kg",
      id: 1
    },
    {
      img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRY-gvCfdzIMZ0e-8ezrIgW_nQO1A0VkbgSYcq-gXEQLbpeEqF2",
      title: "Chiều cao",
      value: "156",
      unit: "cm",
      id: 2
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0-xe-I8t8i7GokOLp5cJjQWAeTlFaDyOAuA&s",
      title: "Nhóm máu",
      value: "AB",
      unit: null,
      id: 3
    },
    {
      img: "https://img.freepik.com/premium-vector/hand-drawn-elderly-characters-walk-with-canes-flat-style-isolated-background_1375-22900.jpg?w=360",
      title: "Khả năng di chuyển",
      value: "Bình thường",
      unit: null,
      id: 4
    }
  ])

  const [underlyingData, setUnderlyingData] = useState([
    {
      id: 1,
      title: "Tiểu đường"
    },
    {
      id: 2,
      title: "Huyết áp cao"
    },
    {
      id: 3,
      title: "Khớp"
    }
  ])

  const noteData = {
    id: 1,
    content: "Có biểu hiện ... nhẹ"
  }

  const ComUnderlyingMedical = ({ data }) => {
    return (
      <View style={styles?.underlyingMedical}>
        <Image
          source={underlyingMedical}
          style={{ width: 60, height: 60, objectFit: "fill" }}
        />
        <Text>{data?.title}</Text>
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
            {medicalData.map((medical, index) => (
              <ComMedical key={index} data={medical}></ComMedical>

            ))}
          </View>

          <Text style={{ fontWeight: "600", fontSize: 16 }}>{MedicalProfile?.underlyingMedical}</Text>
          <View>
            {underlyingData.map((underlyingItem, index) => (
              <ComUnderlyingMedical key={index} data={underlyingItem}></ComUnderlyingMedical>
            ))}
          </View>

          <Text style={{ fontWeight: "600", fontSize: 16, marginTop: 5 }}>{MedicalProfile?.note}</Text>
          <View style={[styles?.underlyingMedical,{marginBottom: 30}]}>
            <Image
              source={underlyingMedical}
              style={{ width: 60, height: 60, objectFit: "fill" }}
            />
            <Text>{noteData?.content}</Text>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 20,
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