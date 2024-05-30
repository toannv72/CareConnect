import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComButton from "../../Components/ComButton/ComButton";

export default ContractDetail = () => {
  return (
    <>
      <View style={styles.main}>
        <ComHeader
          showBackIcon={true}
          showTitle={true}
          title={"Chi tiết hợp đồng"}
        />
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          Thông tin hợp đồng
        </Text>
        <View style={styles.contex}>
          <View style={styles.bodySeparator}>
            <Text style={styles.text}>Hợp đồng</Text>
            <Text style={styles.text2}>Hợp đồng</Text>
          </View>
          <View style={styles.bodySeparator}>
            <Text style={styles.text}>Mã hợp đồng</Text>
            <Text style={styles.text2}>Hợp đồng</Text>
          </View>
          <View style={styles.bodySeparator}>
            <Text style={styles.text}>Mã hợp đồng</Text>
            <Text style={styles.text2}>Hợp đồng</Text>
          </View>
          <View style={styles.bodySeparator}>
            <Text style={styles.text}>Thời hạn</Text>
            <Text style={styles.text2}>8/10/2022 - 8/10/2023</Text>
          </View>
          <View style={styles.bodySeparator2}>
            <Text style={styles.text}>Trạng thái</Text>
            <Text style={styles.text2}>Nguyễn văn toàn</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingBottom:20
        }}
      >
        <ComButton>Yêu cầu gia hạn</ComButton>
        <ComButton>Yêu cầu hủy</ComButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    gap: 15,
  },

  bodySeparator: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
    alignItems: "center",
    marginHorizontal: 15,
  },
  bodySeparator2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text2: {
    fontSize: 16,
  },
  contex: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
  },
});
