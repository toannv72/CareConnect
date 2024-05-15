import { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ComNotification from "./ComNotification/ComNotifications";
import ComSelectButton from "../../Components/ComButton/ComSelectButton";

export default function Notification({}) {
  const [select, setSelect] = useState(false);
  const [select1, setSelect1] = useState(true);
  const [select2, setSelect2] = useState(true);
  const data = [
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      name: "Phát hiện cụ ABC có chỉ số sức khỏe bất thường ",
      day: "10:00 - 14/05/2024 ",
    },
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      name: "Phát hiện cụ ABC có chỉ số sức khỏe bất thường ",
      day: "10:00 - 14/05/2024 ",
    },
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      name: "Phát hiện cụ ABC có chỉ số sức khỏe bất thường ",
      day: "10:00 - 14/05/2024 ",
    },
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      name: "Phát hiện cụ ABC có chỉ số sức khỏe bất thường ",
      day: "10:00 - 14/05/2024 ",
    },
  ];
  const check = () => {
    setSelect(false);
    setSelect1(true);
    setSelect2(true);
  };
  const check1 = () => {
    setSelect(true);
    setSelect1(false);
    setSelect2(true);
  };
  const check2 = () => {
    setSelect(true);
    setSelect1(true);
    setSelect2(false);
  };
  return (
    <View style={styles.body}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles?.scrollView}
      >
        <View style={styles?.buttonContainer}>
          <ComSelectButton onPress={check} check={select}>
            Tất cả
          </ComSelectButton>
          <ComSelectButton onPress={check1} check={select1}>
            Khẩn cấp
          </ComSelectButton>
          <ComSelectButton onPress={check2} check={select2}>
            Thanh toán
          </ComSelectButton>
          <ComSelectButton onPress={check2} check={select2}>
            Thanh toán
          </ComSelectButton>
          <View style={{ width: 20 }}></View>
        </View>
      </ScrollView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles?.scrollView}
        showsHorizontalScrollIndicator={false}
      >
        <ComNotification tile={"Hôm nay"} data={data} />

        <ComNotification tile={"Trước đó"} data={data} />
        <ComNotification tile={"Trước đó"} data={data} />
        <ComNotification tile={"Trước đó"} data={data} />

        <View style={{ height: 190 }}></View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
    paddingHorizontal:15
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    flexWrap: "wrap",
    marginBottom: 10,
  },
  scrollView: {
    flexGrow: 0,
    flexShrink: 0,
  },
});
