import React, { useContext, useState, useMemo, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from '@react-navigation/native';
import SelectedDates from "./ComSelectedDates";
import ComSelectWeekDays from "./ComSelectWeekDays";
import ComRadioGroup from "../../Components/ComRadioGroup/ComRadioGroup";
import moment from "moment";
import Toast from 'react-native-toast-message';
import { getData } from "../../api/api"; // Import your API function
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter"
import Calendar31Days from './Calendar31Days';

export default function ServiceDayRegister() {
    const [selectedId, setSelectedId] = useState('');
    const [registeredDates, setRegisteredDates] = useState([]);
    const [disabledDates, setDisabledDates] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [orderDetail, setOrderDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    const { elder, data } = route.params;
    const navigation = useNavigation();
    const {
        text: { addingPackages },
        setLanguage,
    } = useContext(LanguageContext);

    const handleBackPress = () => {
        navigation.goBack();
    };

    const formatCurrency = (number) => {
        return number.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    const handleSelectedDatesChange = (dates) => {
        setSelectedDates(dates); // Update selectedDates state
    };

    useEffect(() => {
        setLoading(!loading);
        getData(`/order-detail?ElderId=${elder?.id}&ServicePackageId=${data?.id}`, {})
            .then((orderDetail) => {
                setOrderDetail(orderDetail?.data);
                setLoading(loading);
            })
            .catch((error) => {
                setLoading(loading);
                console.error("Error getData fetching items:", error);
            });
    }, []);

    useEffect(() => {
        if (data?.servicePackageDates) {
            if (orderDetail.length === 0) {
                // Nếu orderDetail rỗng, sử dụng các ngày từ servicePackageDates
                const disabledDates = data?.servicePackageDates.map(date => date?.repetitionDay);
                setDisabledDates(disabledDates);
            } else {
                // Extract dates from service package data
                const serviceDates = data?.servicePackageDates.map(date => date?.repetitionDay);
                // Filter order details to find disabled dates
                const disabledDates = serviceDates.filter(date => 
                    !orderDetail.some(item => item?.dayOfMonth === date || new Date(item?.date).getDate() === date)
                );//               Check ngày calendar trùng dayOfMonth        Check ngày calendar trùng date
                setDisabledDates(disabledDates);
            }
        }
    }, [data?.servicePackageDates, orderDetail]);


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
            <ScrollView style={styles.body}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }} numberOfLines={2}>
                    {data?.name}
                </Text>
                {/* price */}
                <Text style={{ fontSize: 16, marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>
                        {formatCurrency(data?.price)}
                    </Text>
                    /{addingPackages?.package?.time}
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
                <Text style={{ color: "gray" }}>Dịch vụ sẽ được gia hạn vào tháng sau với những ngày bạn chọn dưới đây</Text>

                <View>
                    {/* <SelectedDates
                        servicePackageDates={data?.servicePackageDates}
                        onDatesChange={handleSelectedDatesChange} // Callback to receive selected dates
                        disableHeader={true}
                    /> */}
                        <Calendar31Days selectedDates={selectedDates} setSelectedDates={setSelectedDates} enableDates={disabledDates}/>
                </View>
            </ScrollView>
            <View style={{ paddingHorizontal: 20, backgroundColor: "#fff", paddingVertical: 30 }}>
                <ComSelectButton
                    disable={selectedDates?.length == 0}
                    onPress={() => {
                        navigation.navigate("ServicePayment", { servicePackage: data, elder: elder, orderDates: selectedDates, type: "RecurringDay" });
                    }}>
                    Thanh toán ngay
                </ComSelectButton>
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