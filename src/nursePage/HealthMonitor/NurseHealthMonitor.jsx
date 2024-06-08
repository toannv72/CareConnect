import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from '@react-navigation/native';
import ComElder from "../../Components/ComElder/ComElder";
import ComHeader from "../../Components/ComHeader/ComHeader";

export default function NurseHealthMonitor({ data }) {
    const {
        text: { NurseHealthMonitor },
        setLanguage,
    } = useContext(LanguageContext);
    const navigation = useNavigation();

    const [elderData, setElderData] = useState([
        {
            img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
            name: "Nguyễn Văn toàn",
            age: "34",
            sex: "Nam",
            room: "17",
            bed: "3",
            id: 1,
        },
        {
            img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
            name: "Nguyễn Văn toàn",
            age: "34",
            sex: "Nam",
            room: "17",
            bed: "3",
            id: 2,
        },
        {
            img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
            name: "Nguyễn Văn toàn",
            age: "34",
            sex: "Nam",
            room: "17",
            bed: "3",
            id: 3,
        },
    ])

    return (
        <>
            <ComHeader
                showBackIcon
                showTitle
                title={NurseHealthMonitor?.title}
            />
            <View style={styles.body}>
                <View>
                    {elderData?.map((value, index) => (
                        <ComElder key={index} data={value}
                            onPress={() => {
                                navigation.navigate("ListHealthMonitor", { id: value?.id });
                            }}
                            style={{ backgroundColor: "rgba(51, 179, 156, 0.26)" }}
                        />
                    ))}
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
    },
})