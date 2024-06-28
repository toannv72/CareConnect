import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import plusIcon from "../../../assets/profile_icons/plus.png";
import { useNavigation } from '@react-navigation/native';
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComHealthMonitor from "./ComHealthMonitor";
import { postData, getData } from "../../api/api";
import ComNoData from "../../Components/ComNoData/ComNoData";
import ComLoading from "../../Components/ComLoading/ComLoading";

export default function HealthMonitorList({ }) {
    const [healthMonitor, setHealthMonitor] = useState([])
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    const { id } = route.params;
    console.log("healthMonitor", healthMonitor.length)

    const {
        text: { NurseHealthMonitor },
        setLanguage,
    } = useContext(LanguageContext);
    const navigation = useNavigation();


    useEffect(() => {
        setLoading(!loading);
        getData(`/health-report?ElderId=${id}`, {})
            .then((healthMonitor) => {
                setHealthMonitor(healthMonitor?.data?.contends);
                setLoading(loading);
            })
            .catch((error) => {
                setLoading(loading);
                console.error("Error getData fetching items:", error);
            });


    }, []);

    const groupedData = healthMonitor.reduce((acc, item) => {
        const date = new Date(item.createdAt).toISOString().split('T')[0]; // Chuẩn hóa ngày thành yyyy-mm-dd
        // const date = item?.createdAt;
        acc[date] = acc[date] || [];
        acc[date].push(item);
        return acc;
    }, {});

    const formattedDate = (dateValue) => {
        console.log("dateValue", new Date(dateValue))
        const day = new Date(dateValue).getDate().toString().padStart(2, "0");
        const month = (new Date(dateValue).getMonth() + 1).toString().padStart(2, "0");
        const year = new Date(dateValue).getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <ComHeader
                showBackIcon
                showTitle
                title={NurseHealthMonitor?.title}
            />
            <View style={styles.body}>
                <ComLoading show={loading}>
                    {
                        healthMonitor.length == 0 ? (
                            <ComNoData>Không có dữ liệu</ComNoData>
                        ) : (
                            Object.entries(groupedData).map(([date, items]) => (
                                <View key={date}>
                                    <Text style={styles.dateHeader}>{formattedDate(date)}</Text>
                                    {items[0] && ( // Chỉ hiển thị nếu có mục cho ngày đó
                                        <ComHealthMonitor data={items[0]} />
                                    )}
                                </View>
                            ))
                        )
                    }
                </ComLoading>
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
    imageContainer: {
        position: 'absolute',
        bottom: 40,
        right: 40,
    },
    dateHeader: {
        fontWeight: "600",
        fontSize: 16,
        marginVertical: 5
    }
})