import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, FlatList, LayoutAnimation } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import userIcon from "../../../assets/User_fill.png"
import lockIcon from "../../../assets/images/Nurse/CareSchedule/time.png"
import checkIcon from "../../../assets/Vector.png"
import UpIcon from "../../../assets/images/Nurse/RegisterService/UpIcon.png"
import DownIcon from "../../../assets/images/Nurse/RegisterService/DownIcon.png"

export default function ComElder({ data }) {
  const {
    text: { healthMonitor },
    setLanguage,
  } = useContext(LanguageContext);
  const navigation = useNavigation();

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCollapsed(!isCollapsed);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      style={styles.body1}
      onPress={() => navigation.navigate("RegisterServiceDetail", { service: item })}
      >
      <Image
        source={{ uri: item?.img }}
        style={{
          width: 75,
          height: 75,
          objectFit: "fill",
        }}
      />
      <View >
        <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 5 }}>
          {item?.title}
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
          <Text>
            {item?.implementor ? item?.implementor : "Chưa có"}
          </Text>
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
          <Text>
            {item?.time ? item?.time : "Chưa có"}
          </Text>
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
          <Text>
            {item?.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View
      style={styles?.cardItem}>
      <TouchableOpacity
        style={styles?.body}
        onPress={toggleCollapse}
      >
        <Image
          source={{ uri: data?.elder?.img }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            objectFit: "fill",
          }}
        />
        <View style={styles?.container}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                {healthMonitor?.name}
              </Text>
              <Text>
                : {data?.elder?.name}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                {healthMonitor?.age}
              </Text>
              <Text>: {data?.elder?.age}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                {healthMonitor?.sex}
              </Text>
              <Text>: {data?.elder?.sex}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                {healthMonitor?.room}
              </Text>
              <Text>: {data?.elder?.room}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                {healthMonitor?.area}
              </Text>
              <Text>: {data?.elder?.area}</Text>
            </View>
          </View>
        <Image
          source={isCollapsed ? DownIcon : UpIcon}
          style={styles?.icon}
        />
      </TouchableOpacity>

      {!isCollapsed && (
        <FlatList
          data={data?.service}
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
