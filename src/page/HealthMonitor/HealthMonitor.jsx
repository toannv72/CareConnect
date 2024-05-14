import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ComHealth from "./ComHealth";

export default function HealthMonitor() {
  const [data, setData] = useState([
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      name: "Nguyễn Văn toàn",
      age: "34",
      sex: "Nam",
      room: "17",
      bed: "3",
    },
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      name: "Nguyễn Văn toàn",
      age: "34",
      sex: "Nam",
      room: "17",
      bed: "3",
    },
  ]);

  return (
    <View style={styles.body}>
      <View>
        {data?.map((value, index) => (
          <ComHealth key={index} data={value} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
});
