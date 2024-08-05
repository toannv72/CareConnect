import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Animated } from "react-native";
import { Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import UpIcon from "../../../assets/images/Nurse/RegisterService/UpIcon.png"
import DownIcon from "../../../assets/images/Nurse/RegisterService/DownIcon.png"
import { stylesApp } from "../../styles/Styles";

export default function ComHealthIndex({ data, healthMonitor, date, clickable, collapse }) {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const getStatusText = (status) => {
    switch (status) {
      case 'Normal':
        return { text: 'Bình thường', color: '#33B39C' };
      case 'Warning':
        return { text: 'Bất thường', color: '#fa0a0a' };
      case 'Critical':
        return { text: 'Nguy hiểm', color: '#fa0a0a' };
      default:
        return status;
    }
  };
  // có bất kỳ chỉ số con nào bất thường => trả về status chung là bất thường
  const overallStatus = data?.healthReportDetailMeasures.some(
    (detail) => detail?.status !== 'Normal'
  ) ? 'Warning' : 'Normal';

  return (
    <View style={{ marginVertical: 10 }}>
      <TouchableOpacity
        style={[
          styles.body,
          stylesApp.shadow,
          {
            borderColor: data?.isWarning == true ? "#fa6180" : "#33B39C",
            backgroundColor: data?.isWarning == true ? "#fac8d2" : "#caece6",
          },
          isExpanded && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
        ]}
        onPress={() => {
          clickable == false ? null :
            navigation.navigate("HealthMonitorIndexList", { healthMonitor: healthMonitor, id: data?.healthCategoryId, date: date })
        }}
      >
        <Text style={{ fontWeight: "600", width: "85%", marginBottom: 10 }}>
          {data?.healthCategory?.name}
        </Text>
        <TouchableOpacity
          style={styles.expandButton}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <Image
            source={isExpanded ? UpIcon : DownIcon}
            style={[styles.icon, { borderColor: data?.isWarning == true ? "#fa6180" : "#33B39C" }]} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <View style={styles?.left}>
            <Image
              source={{
                uri: data?.healthCategory?.imageUrl ||
                  "https://vinmec-prod.s3.amazonaws.com/images/20190404_090036_798062_tim.max-1800x1800.jpg",
              }}
              style={{
                width: "100%",
                height: 100,
                objectFit: "fill",
                borderWidth: 0.5,
                borderColor: "#000",
                borderRadius: 5
              }}
            />
          </View>
          <View style={styles?.value}>
            {/* {(data?.healthReportDetailMeasures.length == 1 || data?.healthCategoryId == 1) &&
              // chỉ hiển thị value và unit khi id = 1 là huyết áp hoặc chỉ có 1 chứ số con
              (<View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                flexWrap: "wrap",
              }}>
                <Text
                  style={{
                    fontWeight: "bold", fontSize: 25,
                    color: getStatusText(data?.healthReportDetailMeasures[0]?.status)?.color
                  }}>
                  {data?.healthReportDetailMeasures.length == 1 ?
                    data?.healthReportDetailMeasures[0]?.value :
                    data?.healthReportDetailMeasures[0]?.value + '/' + data?.healthReportDetailMeasures[1]?.value}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {data?.healthReportDetailMeasures[0]?.measureUnit?.unitType}
                </Text>
              </View>
              )} */}
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                flexWrap: "wrap",
              }}>
                <Text
                  style={{
                    fontWeight: "bold", fontSize: 25,
                    color: getStatusText(overallStatus)?.color
                  }}>
                  {data?.healthReportDetailMeasures.length == 1 ?
                    data?.healthReportDetailMeasures[0]?.value :
                    data?.healthReportDetailMeasures[0]?.value + '/' + data?.healthReportDetailMeasures[1]?.value}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {data?.healthReportDetailMeasures[0]?.measureUnit?.unitType}
                </Text>
              </View>

            <View style={{ width: "100%", marginTop: 10 }}>
              <Text style={{
                fontSize: 20,
                fontWeight: "600",
                color: getStatusText(overallStatus)?.color,
                textAlign: "center",
              }}>
                {getStatusText(overallStatus)?.text}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {isExpanded && (
        <View
          style={[styles.expandedView, styles.body,
          {
            borderColor: overallStatus == 'Warning' ? "#fa6180" : "#33B39C",
          }]}>
          {data?.healthReportDetailMeasures.map((detail, detailindex) => (
            <View key={detailindex} >
              {detailindex != 0 && (
                <View style={styles.collapseDivision} />
              )} 
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>{detail?.measureUnit?.name}: </Text>
                <Text style={[styles.expandedText, { fontWeight: "600" }]}>{detail?.value} {detail?.measureUnit?.unitType}</Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>Trạng thái: </Text>
                <Text style={[styles.expandedText, { color: getStatusText(detail?.status)?.color }]}>
                  {getStatusText(detail?.status)?.text}
                </Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>Ghi chú: </Text>
                <Text style={styles.expandedText}>{detail?.note}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  value: {
    flex: 0.50,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  left: {
    flex: 0.50,
    gap: 10,
  },
  expandButton: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  icon: {
    width: 35,
    height: 35,
    borderWidth: 2,
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#000',
  },
  expandedView: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: '#fff',
  },
  expandedText: {
    fontSize: 16,
  },
  collapseDivision:{
    borderTopWidth: 1, 
    paddingTop: 10, 
    marginTop: 10, 
    borderTopColor: "#33B39C" 
  }
});
