import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import { stylesApp } from "../../../styles/Styles";

export default function ComMedical({ image, title, value, unit, onPress, isSelected, style }) {

    return (
        <>
            <View style={[styles?.body, stylesApp.shadow]}>
                <View style={styles?.title}>
                    <Image
                        source={image}
                        style={styles?.image}
                    />
                    <Text
                        style={{ fontWeight: "600", fontSize: 16, flex: 3 }}
                        numberOfLines={2}
                        ellipsizeMode='tail'>
                        { title}
                    </Text>
                </View>
                <View style={styles?.valueContain}>
                    <Text style={{ fontSize: 25, fontWeight: "bold", color: "#66CAB8" }}>{value || "Không có"}</Text>
                    <Text style={{ fontSize: 20, color: "#707776"}} numberOfLines={1} ellipsizeMode='tail' >{unit}</Text>
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
        alignItems: "center",
    },
    title:{
        flexDirection: "row", 
        alignItems: "center", 
        marginBottom: 5, 
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