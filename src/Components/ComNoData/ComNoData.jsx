import React from "react";
import { View, StyleSheet, Image, Text } from 'react-native';
import Nodata from "../../../assets/Nodata.png";

export default function ComNoData({ children, style }) {
    return (
        <View style={styles?.noDataContainer}>
            <Image
                source={Nodata}
                style={styles?.noDataImage}
            />
            <Text style={{ fontSize: 16, textAlign: "center" }}>{children || "Không có dữ liệu"}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    noDataContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    noDataImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
});
