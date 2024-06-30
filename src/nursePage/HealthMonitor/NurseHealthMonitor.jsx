import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from '@react-navigation/native';
import ComElder from "../../Components/ComElder/ComElder";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { postData, getData } from "../../api/api";
import ComNoData from "../../Components/ComNoData/ComNoData";
import ComLoading from "../../Components/ComLoading/ComLoading";

export default function NurseHealthMonitor({ data }) {
    const {
        text: { NurseHealthMonitor },
        setLanguage,
    } = useContext(LanguageContext);
    const navigation = useNavigation();
    const [elderData, setElderData] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(!loading);
        getData(`/elders?RoomId=1`, {})
        // getData(`/elders?RoomId==${id}`, {})
            .then((elders) => {
                console.log(" elders", elders?.data?.contends)
                setElderData(elders?.data?.contends);
                setLoading(loading);
            })
            .catch((error) => {
                setLoading(loading);
                console.error("Error getData fetching items:", error);
            });
    }, []);

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