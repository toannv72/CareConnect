import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";

export default function ComTag({ status }) {

    const getStatusStyle = () => {
        switch (status) {
            case "Paid":
                return { borderColor: "#33B39C", color: "#33B39C", text: "Đã thanh toán" };
            case "UnPaid":
                return { borderColor: "orange", color: "orange", text: "Chưa thanh toán" };
            case "OverDue":
                return { borderColor: "red", color: "red", text: "Đã quá hạn" };
            case "Failed":
                return { borderColor: "red", color: "red", text: "Đã xảy ra lỗi" };
            default:
                return { borderColor: "gray", color: "gray", text: "" };
        }
    };

    const { borderColor, color, text } = getStatusStyle();

    return (
        <View style={[styles.container, { borderColor }]}>
            <Text style={[styles.text, { color }]}>{text}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5,
    },
    text: {
        fontSize: 14,
    },
})