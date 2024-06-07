import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";

export default function ComMedical({ data, onPress, isSelected, style }) {

    return (
        <>
            <View style={styles?.body}>
                <View style={styles?.title}>
                    <Image
                        source={{ uri: data?.img }}
                        style={styles?.image}
                    />
                    <Text
                        style={{ fontWeight: "600", fontSize: 16, flex: 3 }}
                        numberOfLines={2}
                        ellipsizeMode='tail'>
                        {data?.title}
                    </Text>
                </View>
                <View style={styles?.valueContain}>
                    <Text style={{ fontSize: 25, fontWeight: "bold", color: "#66CAB8" }}>{data?.value}</Text>
                    <Text style={{ fontSize: 20, color: "#707776"}} numberOfLines={1} ellipsizeMode='tail' >{data?.unit}</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        paddingVertical: 15,
        backgroundColor: "#F7FFFE",
        paddingHorizontal: 15,
        borderWidth: 2,
        borderColor: "#ACDED3",
        borderRadius: 10,
        width: "49%",
        alignItems: "center"
    },
    title:{
        flexDirection: "row", 
        alignItems: "center", 
        marginBottom: 10, 
        flexWrap: "wrap"
    },
    image:{
        width: 40,
        height: 40,
        borderRadius: 10,
        objectFit: "fill",
        padding: 5,
        marginRight: 10, 
        flex: 1
    },
    valueContain:{
        flexDirection: "row",  
        justifyContent: "center", 
        alignItems: "center", 
        gap: 10
    }
});