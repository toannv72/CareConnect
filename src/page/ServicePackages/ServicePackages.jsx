import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ComPackage from "./ComPackage";

export default function ServicePackages() {
  const [data, setData] = useState([
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      color: "#F7E863",
      text: "Gói cơ bản",
      context: "Cung cấp tất cả các dịch vụ cần thiết cho người thân của bạn",
      people: 2,
      money: 1000000000,
    },
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      color: "#8DF7AB",
      text: "Gói cơ bản",
      context: "Cung cấp tất cả các dịch vụ cần thiết cho người thân của bạn",
      people: 2,
      money: 100000000,
    },
  ]);

  return (
    <View style={styles.body}>
      <View>
        {data?.map((value, index) => (
          <ComPackage key={index} data={value} />
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
