import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
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

    const {
        text: { NurseHealthMonitor },
        setLanguage,
    } = useContext(LanguageContext);
    const navigation = useNavigation();

    useEffect(() => {
        setLoading(!loading);
        getData(`/health-report?ElderId=${id}&SortColumn=createdAt&SortDir=Desc`, {})
            .then((healthMonitor) => {
                setHealthMonitor(healthMonitor?.data?.contends);
                setLoading(loading);
            })
            .catch((error) => {
                setLoading(loading);
                console.error("Error getData fetching items:", error);
            });
    }, []);

    const toVietnamTime = (dateValue) => {
        const date = new Date(dateValue);
        date.setHours(date.getHours() + 7); // Convert to UTC+7
        return date;
    };

    const groupedData = healthMonitor.reduce((acc, item) => {
        const date = toVietnamTime(item.createdAt).toISOString().split('T')[0]; // Convert to Vietnam time and format date as yyyy-mm-dd
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
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                        {
                            healthMonitor.length == 0 ? (
                                <ComNoData>Không có dữ liệu</ComNoData>
                            ) : (
                                Object.entries(groupedData).map(([date, items]) => (
                                    <View key={date}>
                                        <Text style={styles.dateHeader}>{formattedDate(date)}</Text>
                                        {items[0] && ( // Chỉ hiển thị nếu có mục cho ngày đó
                                            <ComHealthMonitor data={items[0]} time={groupedData[date].length}/>
                                        )}
                                    </View>
                                ))
                            )
                        }
                    </ScrollView>
                </ComLoading>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
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