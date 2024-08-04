import React, { useContext, useState, useMemo, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from '@react-navigation/native';
import ComSelectWeekDays from "./ComSelectWeekDays";
import moment from "moment";
import { getData } from "../../api/api"; // Import your API function
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter"
import ComToast from "../../Components/ComToast/ComToast";

export default function AddingServiceCalendarRegister() {
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    const { elder, data } = route.params;
    const navigation = useNavigation();
    const {
        text: { addingPackages }, setLanguage,
    } = useContext(LanguageContext);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            // Enable from servicePackageDates if type is WeeklyDays
            let updatedWeekDays = [...weekDays]; // Create a copy of weekDays to avoid mutating state directly
            if (data?.type === "WeeklyDays" && data?.servicePackageDates) {
                const activeDays = data?.servicePackageDates?.map(date => date?.dayOfWeek);
                // Enable days based on servicePackageDates
                updatedWeekDays = updatedWeekDays.map(day => ({
                    ...day,
                    disable: !activeDays.includes(day?.value)
                }));
            }
            try {
                const orderDetail = await getData(`/order-detail?ElderId=${elder?.id}&ServicePackageId=${data?.id}`, {});
                const registeredDates = orderDetail?.data?.map(date => date?.dayOfWeek);
                // Disable registered dates in updatedWeekDays
                updatedWeekDays = updatedWeekDays.map(day => ({
                    ...day,
                    disable: day.disable || registeredDates.includes(day?.value)
                }));// Update state after processing
                setWeekDays(updatedWeekDays);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching orderDetail items:", error);
            }
        };
        fetchData();
    }, [data?.type, data?.servicePackageDates, elder?.id, data?.id, weekDays]); // Dependency array to watch for changes

    const [weekDays, setWeekDays] = useState([
        { value: "Monday", label: "T2", check: true, disable: false },
        { value: "Tuesday", label: "T3", check: true, disable: false },
        { value: "Wednesday", label: "T4", check: true, disable: false },
        { value: "Thursday", label: "T5", check: true, disable: false },
        { value: "Friday", label: "T6", check: true, disable: false },
        { value: "Saturday", label: "T7", check: true, disable: false },
        { value: "Sunday", label: "CN", check: true, disable: false },
    ]);

    const handleBackPress = () => { navigation.goBack(); };

    const formatCurrency = (number) => {
        return number?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };
    const handleDayPress = (index) => {
        const updatedDays = [...weekDays]; // Sao chép mảng weekDays để không thay đổi trực tiếp state
        updatedDays[index] = {
            ...updatedDays[index],
            check: !updatedDays[index].check
        };
        setWeekDays(updatedDays);
    };

    const getOrderDates = (selectedDays) => {
        let currentMonth = moment().month();
        let currentYear = moment().year();
        let daysInMonth = moment().daysInMonth();//tính số ngày có trong tháng hiện tại
        let dates = [];
        //tạo ra list các date theo thứ trong tuần đã được họn
        const generateDates = () => {
            dates = [];
            for (let i = 1; i <= daysInMonth; i++) {
                const date = moment().year(currentYear).month(currentMonth).date(i).format("YYYY-MM-DD");
                const dayOfWeek = moment(date).isoWeekday();
                if (!selectedDays.includes(moment.weekdays(dayOfWeek))) {
                    dates.push(date);
                }
            }
        };
        generateDates();
        // Kiểm tra xem tất cả các date có thuộc về quá khứ hoặc hiện tại không
        const allDatesInPastOrToday = dates.every(date => moment(date).isBefore(moment(), 'day') || moment(date).isSame(moment(), 'day'));
        if (allDatesInPastOrToday) {//nếu ttas cả các date là ngày quá khứ hoặc hiện tại
            currentMonth += 1; //nhảy qua tháng sau
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear += 1;
            }
            daysInMonth = moment().year(currentYear).month(currentMonth).daysInMonth();//tính lại số ngày có trong tháng mới
            generateDates();
        }
        return dates;
    };

    const calculateSelectedDates = () => {
        const selectedDays = weekDays.filter(day => day.check).map(day => day.value);
        const dates = getOrderDates(selectedDays); // Assuming getOrderDates is defined to return formatted dates
        return dates;
    };

    const checkDatesAgainstContractEnd = (dates) => {
        if (elder?.contractsInUse?.endDate) {
            const endDate = moment(elder?.contractsInUse?.endDate);
            return dates.some(date => moment(date).isAfter(endDate, 'day'));
        }
        return false;
    };

    const handlePayment = () => {
        const selectedDates = calculateSelectedDates();
        if (checkDatesAgainstContractEnd(selectedDates)) {
            ComToast({ text: 'Một số ngày bạn chọn vượt qua hạn kết thúc hợp đồng. Vui lòng chọn ngày khác.' })
        } else {
            navigation.navigate("ServicePayment", { servicePackage: data, elder: elder, orderDates: selectedDates, type: 'RecurringWeeks' });
        }
    };

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backIconContainer}>
                    <Image source={backArrowWhite} style={styles.backIcon} />
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
                <Text style={{ color: "gray" }}>Dịch vụ sẽ được gia hạn vào tháng sau với những thứ trong tuần bạn chọn dưới đây</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                    {loading ? (
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <ActivityIndicator />
                        </View>) : (
                        weekDays.map((day, index) => (
                            <View key={index} >
                                <ComSelectWeekDays
                                    check={day.check}
                                    onPress={() => handleDayPress(index)}
                                    disable={day.disable}
                                >
                                    {day.label}
                                </ComSelectWeekDays>
                            </View>
                        ))
                    )}
                </View>
                <View style={{ marginVertical: 10, gap: 5 }}>
                    <Text style={{ fontWeight: "600" }}>Danh sách những ngày sẽ thực hiện dịch vụ:</Text>
                    {calculateSelectedDates()?.filter(date => moment(date).isAfter(moment(), 'day'))?.length > 0 ? (
                        calculateSelectedDates()?.filter(date => moment(date).isAfter(moment(), 'day'))?.map((date, index) => (
                            <Text key={index}> • <ComDateConverter>{date}</ComDateConverter></Text>
                        ))
                    ) : (
                        <Text style={{ marginTop: 10 }}>
                            {weekDays.find(day => !day.check) && "Không thể đăng ký dịch vụ vào ngày này"}
                        </Text>
                    )}
                </View>
                <View style={{ height: 50 }}></View>
            </ScrollView>
            <View style={{ paddingHorizontal: 20, backgroundColor: "#fff" }}>
                <ComSelectButton
                    disable={calculateSelectedDates()?.length === 0}
                    onPress={handlePayment}>
                    Thanh toán ngay
                </ComSelectButton>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
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
