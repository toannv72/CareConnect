import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";

export default function ComTable({ columns, dataSource, columnLabels, linkColumns = [] }) {

  const formatCurrency = (number) => {
    // Sử dụng hàm toLocaleString() để định dạng số
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (

    <View style={styles.tableContainer}>
      {/* Header Row */}
      <View style={styles.row}>
        {columns.map((column, index) => (
          <View key={index} style={styles.headerCell}>
            <Text style={styles.headerText}>
              {columnLabels ? columnLabels[column] || column : column}
            </Text>
          </View>
        ))}
      </View>
      {/* Data Rows */}
      {dataSource.map((rowData, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {columns.map((column, colIndex) => (
            <View key={colIndex} style={styles.dataCell}>
              <Text style={[styles.dataText, typeof rowData[column] === 'number' && styles.numberText]}>{formatCurrency(rowData[column])}</Text>
            </View>
          ))}
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