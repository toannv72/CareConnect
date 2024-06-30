import React, { useContext, useState, useMemo } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from '@react-navigation/native';
import SelectedDates from "../../Components/ComDate/ComSelectedDates";
import ComSelectWeekDays from "./ComSelectWeekDays";
import ComRadioGroup from "../../Components/ComRadioGroup/ComRadioGroup";
import ComPeriodCalendar from "./ComPeriodCalendar";

export default function AddingServiceCalendarRegister() {
    const [selectedId, setSelectedId] = useState('1');

    const radioButtons = useMemo(() => ([
        {
            id: '1',
            label: 'Theo ngày',
            value: '1'
        },
        {
            id: '2',
            label: 'Theo tuần',
            value: '2'
        },
        {
            id: '3',
            label: 'Theo tháng',
            value: '3'
        }
    ]), []);

    const [weekDays, setWeekDays] = useState([
        { value: "Monday", label: "T2", check: true },
        { value: "Tuesday", label: "T3", check: true },
        { value: "Wednesday", label: "T4", check: true },
        { value: "Thursday", label: "T5", check: true },
        { value: "Friday", label: "T6", check: true },
        { value: "Saturday", label: "T7", check: true },
        { value: "Sunday", label: "CN", check: true },
    ]);

    const {
        text: { addingPackages },
        setLanguage,
    } = useContext(LanguageContext);

    const route = useRoute();
    const { id, data } = route.params;
    console.log( "CalendarRegiste id:", id)

    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    const formatCurrency = (number) => {
        // Sử dụng hàm toLocaleString() để định dạng số
        return number.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };
    const handleDayPress = (index) => {
        const updatedDays = weekDays.map((day, i) =>
            i === index ? { ...day, check: !day.check } : day
        );
        setWeekDays(updatedDays);
    };

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backIconContainer}>
                    <Image
                        source={backArrowWhite}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Image
                    source={{ uri: data?.imageUrl }}
                    style={{
                        height: 200,
                        objectFit: "fill",
                    }}
                />
            </View>
            <ScrollView style={styles.body}>
                <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }} numberOfLines={2}>
                    {data?.name}
                </Text>
                {/* price */}
                <Text style={{ fontSize: 16, marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>
                        {formatCurrency(data?.price)}
                    </Text>
                    /{addingPackages?.package?.month}
                </Text>

                {/* category */}
                <Text style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={styles.contentBold}>
                        {addingPackages?.package?.category}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        :  {data?.servicePackageCategory?.name}
                    </Text>
                </Text>

                <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
                    {addingPackages?.register?.registerTime}
                </Text>

                <ComRadioGroup
                    radioButtons={radioButtons}
                    onPress={setSelectedId}
                    selectedId={selectedId}
                />

                { (selectedId === '1' || selectedId === '3') && (
                    <View>
                        <SelectedDates></SelectedDates>
                    </View>
                )}
                {selectedId === '2' && (
                    <>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            {weekDays.map((day, index) => (
                                <View key={index} style={{ marginRight: 11 }}>
                                    <ComSelectWeekDays
                                        check={day.check} 
                                        onPress={() => handleDayPress(index)}
                                    >
                                        {day.label}
                                    </ComSelectWeekDays>
                                </View>
                            ))}
                        </View>
                        <View>
                            <ComPeriodCalendar></ComPeriodCalendar>
                        </View>
                    </>
                )}

                <View style={{ marginBottom: 30 }}>
                    <ComSelectButton
                        onPress={() => {
                            // navigation.navigate("ServicePayment", { id: data.id });
                        }}>
                        Tiếp tục
                    </ComSelectButton>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
    },
    header: {
        paddingTop: 50,
        backgroundColor: "#fff",
    },
    contentBold: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "bold"
    },
    backIconContainer: {
        position: 'absolute',
        zIndex: 100,
        marginTop: 60,
        marginLeft: 10,
        padding: 3,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    backIcon: {
        width: 50,
        height: 50,
    },
});
