import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from '@react-navigation/native';
import moment from "moment";
import { getData } from "../../api/api"; // Import your API function
import Calendar31Days from './Calendar31Days';
import ComToast from "../../Components/ComToast/ComToast";

export default function ServiceDayRegister() {
    const [enabledDates, setEnabledDates] = useState([]);
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

    useEffect(() => {
        setLoading(true);
        getData(`/order-detail?ElderId=${elder?.id}&ServicePackageId=${data?.id}`, {})
            .then((orderDetail) => {
                setOrderDetail(orderDetail?.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error fetching order details:", error);
            });
    }, []);

    useEffect(() => {
        if (data?.servicePackageDates) {
            let enabledDates = data?.servicePackageDates.map(date => date?.repetitionDay);
            if (orderDetail?.length > 0) {
                enabledDates = enabledDates.filter(date =>
                    !orderDetail.some(item => item?.dayOfMonth === date || new Date(item?.date).getDate() === date)
                );
            }
            setEnabledDates(enabledDates);
        }
    }, [data?.servicePackageDates, orderDetail]);

    const handlePayment = () => {
        // Kiểm tra xem tất cả các ngày đã chọn có phải là ngày trong quá khứ hoặc hiện tại không
        const allDatesArePastOrToday = selectedDates.every(date => moment(date).isSameOrBefore(moment(), 'day'));

        const updatedDates = allDatesArePastOrToday
            ? selectedDates.map(date => moment(date).add(1, 'month').format('YYYY-MM-DD'))
            : selectedDates;
        // Kiểm tra ngày kết thúc hợp đồng, nếu có ngày vượt => trả về true, ko thì false
        const hasDatesAfterContractEnd = checkDatesAgainstContractEnd(updatedDates);
        //nếu có ngày vượt ngày kết thúc hợp đồng => báo lỗi
        if (hasDatesAfterContractEnd) {
            ComToast({
                text: 'Một số ngày bạn chọn vượt qua hạn kết thúc hợp đồng. Vui lòng chọn ngày khác.',
                duration: 2500,
            });
        } else {//nếu không thì cho thanh toán bình thường
            navigation.navigate("ServicePayment", { servicePackage: data, elder: elder, orderDates: updatedDates, type: "RecurringDay" });
        }
    };

    const checkDatesAgainstContractEnd = (dates) => {
        if (elder?.contractsInUse?.endDate) {
            const endDate = moment(elder?.contractsInUse?.endDate);//lấy ra ngày kết thúc
            return dates.some(date => moment(date).isAfter(endDate, 'day'));//check trong list date có ngày nào vượt qua ngày kết thúc ko
        }
        return false;
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
                    <Calendar31Days
                        selectedDates={selectedDates}
                        setSelectedDates={setSelectedDates}
                        enableDates={enabledDates}
                    />
                </View>
            </ScrollView>
            <View style={{ paddingHorizontal: 20, backgroundColor: "#fff", paddingVertical: 30 }}>
                <ComSelectButton
                    disable={selectedDates?.length === 0}
                    onPress={handlePayment}>
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
        paddingTop: 25,
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
        marginTop: 35,
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
