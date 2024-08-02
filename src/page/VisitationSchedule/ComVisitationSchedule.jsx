import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";

export default function ComVisitationSchedule({ data }) {
  const {
    text: { servicePackages },
    setLanguage,
  } = useContext(LanguageContext);

  const [date] = data?.date?.split("T");
  const [year, month, day] = date.split("-");

  const getTypeText = (status) => {
    switch (status) {
      case 'FollowUpVisit':
        return { text: 'Thăm nuôi', color: 'green' };
      case 'ProcedureCompletion':
        return { text: 'Gia hạn hợp đồng', color: 'red' };
      case 'Consultation':
        return { text: 'Hoàn thành thủ tục', color: 'red' };
      case 'Cancel':
        return { text: 'Hủy hợp đồng', color: 'red' };
      default:
        return status;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Pending':
        return { text: 'Đang chờ', color: 'green' };
      case 'Completed':
        return { text: 'Đã hoàn thành', color: 'red' };
      case 'Cancelled':
        return { text: 'Đã hủy', color: 'red' };
      default:
        return status;
    }
  };

  return (
    <TouchableOpacity style={[styles.body]}>
      <View style={styles.day}>
        <Text style={styles.textYear}>{year}</Text>
        <View
          style={{ backgroundColor: "#33B39C", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 }}
        >
          <Text style={styles.textDay}>{day}</Text>
          <Text style={styles.textDay}>- -</Text>
          <Text style={styles.textDay}>{month}</Text>
        </View>
      </View>

      <View style={styles?.container}>
        {/* <Text style={{ fontWeight: "bold", fontSize: 16 }}>{data?.text}</Text> */}
        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Người đăng ký
          </Text>
          <Text>: {data?.user?.fullName}</Text>
        </Text>

        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Số điện thoại
          </Text>
          <Text>: {data?.user?.phoneNumber}</Text>
        </Text>
        {
          data?.type == 'FollowUpVisit' && (<Text style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Người cao tuổi: </Text>
            {
              data?.elders?.length > 0 && (
                data?.elders?.map((elder, index) => (
                  <Text key={index}>{elder?.name}{index < data.elders?.length - 1 && ", "}</Text>
                )))
            }
          </Text>)
        }

        {
          (data?.type == 'ProcedureCompletion' || data?.type == 'Cancel' ) && (
            <Text>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Mã hợp đồng
              </Text>
              <Text>: {data?.contract?.id}</Text>
            </Text>
          )
        }

        {
          data?.type == 'Consultation' && (
            <Text>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Gói dưỡng lão
              </Text>
              <Text>: {data?.nursingPackage?.name}</Text>
            </Text>
          )
        }

        <Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Loại lịch hẹn:
          </Text>
          <Text> {getTypeText(data?.type)?.text}</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Trạng thái:
          </Text>
          <Text> {getStatusText(data?.status)?.text}</Text>
        </Text>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    gap: 18,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
    backgroundColor: "#caece6",
    elevation: 4, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  day: {
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  textDay: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  textYear: {
    fontSize: 16,
    color: "#33B39C",
  },
});
