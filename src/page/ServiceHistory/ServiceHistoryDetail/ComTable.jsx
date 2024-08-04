import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import ComDateTimeConverter from "../../../Components/ComDateConverter/ComDateTimeConverter";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import { useNavigation } from '@react-navigation/native';

export default function ComTable({ columns, dataSource, columnLabels, linkColumns = [] }) {
  const navigation = useNavigation();
  const formatCurrency = (number) => {
    // Sử dụng hàm toLocaleString() để định dạng số
    if (typeof number !== 'undefined') {
      return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    }
    return '';
  };

  return (

    <View style={styles.tableContainer}>
      {/* Header Row */}
      <View style={styles.row}>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>
            Người thực hiện
          </Text>
        </View>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>
            Thời gian
          </Text>
        </View>
      </View>
      {/* Data Rows */}
      {dataSource?.map((rowData, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          <View style={styles.dataCell}>
            {
              rowData?.user?.fullName ? (
                <TouchableOpacity onPress={() => { navigation.navigate("UserNurseProfile", { id: rowData?.user?.id }) }}>
                  <Text style={[styles.dataText, { color: "#33B39C" }]}>{rowData?.user?.fullName ? rowData?.user?.fullName : "Chưa có"}</Text>
                </TouchableOpacity>
              ) : (
                <Text style={[styles.dataText]}>Chưa có</Text>
              )
            }

          </View>
          <View style={styles.dataCell}>
            <Text style={[styles.dataText]}>{rowData?.completedAt ? ComDateTimeConverter(rowData?.completedAt) : <ComDateConverter>{rowData?.date}</ComDateConverter>}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#33B39C"
  },
  tableContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#33B39C",
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  headerCell: {
    flex: 1,
    borderRadius: 10,
    padding: 10
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  dataCell: {
    flex: 1,
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  dataText: {
    textAlign: 'left',
  },
  numberText: {
    textAlign: 'right',
  },
})