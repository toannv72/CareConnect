import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import ComElder from "./ComElder";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { postData, getData } from "../../api/api";
import ComNoData from "../../Components/ComNoData/ComNoData";
import ComLoading from "../../Components/ComLoading/ComLoading";
import { useAuth } from "../../../auth/useAuth";
import moment from "moment";

export default function NurseHealthMonitor({ data }) {
    const {
        text: { NurseHealthMonitor, CareSchedule },
        setLanguage,
    } = useContext(LanguageContext);
    const { user } = useAuth();
    const route = useRoute();
    const navigation = useNavigation();
    const [nursingSchedules, setNursingSchedules] = useState([])
    const [loading, setLoading] = useState(false);
    const today = moment().format("YYYY-MM-DD");

    useEffect(() => {
        setLoading(true);
        getData(`/care-schedule?CareMonth=${moment().month() + 1}&CareYear=${moment().year()}&UserId=${user?.id}`, {})
            .then((schedule) => {
                const schedules = schedule?.data?.contends || [];
                const uniqueRooms = filterUniqueRooms(schedules);
                setNursingSchedules(uniqueRooms);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log("Error getData fetching items:", error);
            });
    }, []);

    const filterUniqueRooms = (schedules) => {
        const uniqueRooms = [];
        const seenIds = {};
        schedules.forEach(schedule => {
            if (!seenIds[schedule?.room?.id]) {
                seenIds[schedule?.room?.id] = true;
                uniqueRooms.push(schedule?.room);
            }
        });
        return uniqueRooms;
    }

    return (
        <>
            <ComHeader
                showBackIcon
                showTitle
                title={"Theo dõi sức khỏe"}
            />
            <View style={styles.body}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    <ComLoading show={loading}>
                        {nursingSchedules?.length == 0 ? (
                            <ComNoData>Không có dữ liệu</ComNoData>
                        ) : (
                            nursingSchedules?.map((value, index) => (//danh sách phòng có length > 0
                                <View key={index}>
                                    {value?.elders?.length > 0 && //phòng có elder mới hiển thị
                                        <View key={value}>
                                            <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 10 }}>Phòng {value?.name} - Khu {value?.block?.name}</Text>
                                            {value?.elders.map((elder, elderIndex) => (
                                                <View key={elderIndex}>
                                                    <ComElder
                                                        key={elderIndex}
                                                        data={elder}
                                                        onPress={() => {
                                                            navigation.navigate("ListHealthMonitor", { id: elder?.id });
                                                        }}
                                                        style={{ backgroundColor: "#d3f5ef", marginBottom: 10 }}
                                                    />
                                                </View>
                                            ))}
                                        </View>}
                                </View>
                            ))
                        )}
                    </ComLoading>
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        // paddingTop: 20,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
    },
})