import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, FlatList, LayoutAnimation } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter"
import ComDateTimeConverter from "../../Components/ComDateConverter/ComDateTimeConverter"
import userIcon from "../../../assets/User_fill.png"
import lockIcon from "../../../assets/images/Nurse/CareSchedule/time.png"
import checkIcon from "../../../assets/Vector.png"
import UpIcon from "../../../assets/images/Nurse/RegisterService/UpIcon.png"
import DownIcon from "../../../assets/images/Nurse/RegisterService/DownIcon.png"
import moment from "moment";

export default function ComElder({ data }) {
  const {
    text: { healthMonitor }, setLanguage } = useContext(LanguageContext);
  const navigation = useNavigation();
  const today = moment().format("YYYY-MM-DD");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCollapsed(!isCollapsed);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'InComplete':
        return { text: 'Chưa thực hiện', color: 'green' };
      case 'Complete':
        return { text: 'Đã thực hiện', color: '#000' };
      case 'NotPerformed':
        return { text: 'Hết hạn thực hiện', color: 'red' };
      default:
        return status;
    }
  };

  const renderItem = ({ item, index }) => {
    const todayOrderDate = item?.orderDates?.find(orderDate =>
      moment(orderDate?.date).format("YYYY-MM-DD") === today
    )

    return (
      <TouchableOpacity
        key={index}
        style={styles.body1}
        onPress={() => navigation.navigate("RegisterServiceDetail", { serviceData: item?.servicePackage, elderData: data, todayOrderDate })}
      >
        <Image source={{ uri: item?.servicePackage?.imageUrl }}
          style={{
            width: 75,
            height: 75,
            objectFit: "fill",
            borderWidth: 0.5,
            borderColor: "#000"
          }}
        />
        <View >
          <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 5 }}>
            {item?.servicePackage?.name}
          </Text>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Image
              source={userIcon}
              style={{
                width: 20,
                height: 20,
                objectFit: "fill",
                tintColor: "#33B39C"
              }}
            />
            <Text>{todayOrderDate?.implementor ? todayOrderDate?.implementor : "Chưa có"}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Image
              source={lockIcon}
              style={{
                width: 22,
                height: 22,
                objectFit: "fill",
              }}
            />
            <Text>{todayOrderDate?.completedAt ? ComDateTimeConverter(todayOrderDate?.completedAt) : "Chưa có"}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 7 }}>
            <Image
              source={checkIcon}
              style={{
                width: 17,
                height: 17,
                objectFit: "fill",
                marginLeft: 2
              }}
            />
            <Text style={{fontWeight: "bold"}}>{getStatusText(todayOrderDate?.status)?.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View
      style={styles?.cardItem}>
      <TouchableOpacity
        style={styles?.body}
        onPress={toggleCollapse}
      >
        <Image
          source={{ uri: data?.imageUrl }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            objectFit: "fill",
            borderWidth: 0.5,
            borderColor: "#000"
          }}
        />
        <View style={styles?.container}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {healthMonitor?.name}
            </Text>
            <Text> : {data?.name} </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {healthMonitor?.age}
            </Text>
            <Text>: <ComDateConverter>{data?.dateOfBirth}</ComDateConverter></Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {healthMonitor?.sex}
            </Text>
            <Text>: {data?.gender == "Male" ? "Nam" : "Nữ"}</Text>
          </View>
        </View>
        <Image source={isCollapsed ? DownIcon : UpIcon} style={styles?.icon} />
      </TouchableOpacity>

      {!isCollapsed && (
        <FlatList
          data={data?.orderDetails}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    gap: 20,
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "rgba(51, 179, 156, 0.26)",
  },
  body1: {
    flexDirection: "row",
    gap: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderTopColor: "#33B39C",
    alignItems: "center",
    borderTopWidth: 1
  },
  container: {
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  cardItem:
  {
    borderWidth: 1,
    borderColor: "#33B39C",
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 4, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  icon: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 15,
    top: 15,
  },
});
