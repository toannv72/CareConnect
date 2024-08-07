import React, { useContext, useState, useCallback } from "react";
import { View, StyleSheet, Image, Text, FlatList, TouchableOpacity, Platform } from 'react-native';
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ComElder from "./ComElder";
import ComNoData from "../../Components/ComNoData/ComNoData";
import ComHeader from "../../Components/ComHeader/ComHeader";
import RegisterServiceImg from "./RegisterServiceImg.png";
import DownIcon from "../../../assets/images/Nurse/RegisterService/DownIcon.png";
import visitSchedule from "../../../assets/icon/Group130.png";
import { getData } from "../../api/api";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function RegisterService() {
    const {
        text: { CareSchedule },
        setLanguage,
    } = useContext(LanguageContext);
    const route = useRoute();
    const roomData = route.params || {};
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            getData(`/care-services?RoomId=${roomData?.roomData?.id}&Date=${moment(selectedDate).format("YYYY-MM-DD")}`, {})
                .then((careServices) => {
                    const careServicesData = careServices?.data?.elders;
                    setData(careServicesData ? careServicesData : []);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error("Error getData fetching items:", error);
                });
        }, [selectedDate])
    );

    const handleDateChange = (event, selectedDate) => {
        setShowPicker(Platform.OS === 'ios'); // Keep picker open for iOS

        if (selectedDate) {
            setSelectedDate(selectedDate);
        }
    };

    return (
        <>
            <ComHeader
                showBackIcon
                showTitle
                title={"Phòng " + roomData?.roomData?.name + " - Khu " + roomData?.roomData?.block?.name}
            />
            <View style={styles.body}>
                <Image
                    source={RegisterServiceImg}
                    style={{
                        height: 200,
                        width: "100%",
                        objectFit: "contain",
                    }}
                />
                <View style={{ paddingHorizontal: 10, flexDirection: "row", gap: 10, justifyContent: "center", alignItems: "center", marginTop: 5 }}>
                    <Image
                        source={visitSchedule}
                        style={{
                            height: 50,
                            width: 50,
                            objectFit: "contain",
                            backgroundColor: "rgba(51, 179, 156, 0.26)",
                            borderRadius: 10, flex: 1
                        }}
                    />
                    <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.datePickerButton}>
                        <Text style={styles.dateText}>{moment(selectedDate).format("DD/MM/YYYY")}</Text>
                        <Image source={DownIcon} style={styles?.icon} />
                    </TouchableOpacity>
                    {showPicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={selectedDate}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={handleDateChange}
                            minimumDate={new Date()}
                        />
                    )}
                </View>
                {/* Display ComNoData if no data or all data have no orders */}
                {data?.length === 0 || data.every(item => item?.orderDetailsService?.length === 0) ? (
                    <ComNoData>Không có dữ liệu</ComNoData>
                ) : (
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => item?.orderDetailsService?.length > 0 && <ComElder data={item} selectedDate={selectedDate} />}
                        keyExtractor={(item, index) => index.toString()}
                        style={{ margin: 10 }}
                    />
                )}
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#fff",
        flex: 1,
    },
    datePickerButton: {
        backgroundColor: "#fff",
        height: 50,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#33B39C",
        justifyContent: "center",
        flex: 3
    },
    dateText: {
        fontWeight: "bold",

    },
    icon: {
        width: 25,
        height: 25,
        position: 'absolute',
        right: 15,
        top: 10,
      },
});
