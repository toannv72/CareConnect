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
import { useAuth } from "../../../auth/useAuth";

export default function RegisterService() {
    const {
        text: { CareSchedule },
        setLanguage,
    } = useContext(LanguageContext);
    const route = useRoute();
    const { user } = useAuth();
    const roomData = route.params || {};
    const [data, setData] = useState([]);
    const [careSchedule, setCareSchedule] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const getCareSchedule = async () => {
        try {
            const careSchedule = await getData(`/care-schedule?CareMonth=${moment().month() + 1}&CareYear=${moment().year()}&UserId=${user?.id}`, {});
            const careServicesData = careSchedule?.data?.contends[0]?.rooms[0];
            setCareSchedule(careServicesData ? careServicesData : []);
            return careServicesData;
        } catch (error) {
            console.error("Error fetching care-schedule items:", error);
            return null; 
        }
    };

    const getCareServices = async (roomId) => {
        try {
          const careServices = await getData(`/care-services?RoomId=${roomId}&Date=${moment(selectedDate).format("YYYY-MM-DD")}`, {});
          const careServicesData = careServices?.data?.elders?.filter(elder => elder?.state === "Active");
          setData(careServicesData ? careServicesData : []);
        } catch (error) {
          console.error("Error fetching care-services items:", error);
        }
      };

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const fetchedCareSchedule = await getCareSchedule();
                    if (fetchedCareSchedule?.id) {
                        await getCareServices(fetchedCareSchedule.id);
                    }
                } catch (error) {
                    console.error("Error in fetching data:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
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
                title={"Phòng " + careSchedule?.name + " - Khu " + careSchedule?.block?.name}
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
                            borderRadius: 10,
                            flex: 1,
                            borderWidth: 1,
                            borderColor: "#33B39C"
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
