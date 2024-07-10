import React, { useContext, useState, useMemo, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from '@react-navigation/native';
import SelectedDates from "../../Components/ComDate/ComSelectedDates";
import ComSelectWeekDays from "./ComSelectWeekDays";
import ComRadioGroup from "../../Components/ComRadioGroup/ComRadioGroup";
import moment from "moment";
import Toast from 'react-native-toast-message';
import { getData } from "../../api/api"; // Import your API function
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter"

export default function AddingServiceCalendarRegister() {
    const [selectedId, setSelectedId] = useState('');
    const [registeredDates, setRegisteredDates] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    const { elder, data } = route.params;
    const navigation = useNavigation();
    const {
        text: { addingPackages },
        setLanguage,
    } = useContext(LanguageContext);
    const showToast = (type, text1, text2, position) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            position: position
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            // Step 1: Enable from servicePackageDates if type is WeeklyDays
            let updatedWeekDays = [...weekDays]; // Create a copy of weekDays to avoid mutating state directly
            if (data?.type === "WeeklyDays" && data?.servicePackageDates) {
                const activeDays = data?.servicePackageDates.map(date => date?.dayOfWeek);
                // Enable days based on servicePackageDates
                updatedWeekDays = updatedWeekDays.map(day => ({
                    ...day,
                    disable: !activeDays.includes(day?.value)
                }));
            }
            // Step 2: Fetch registeredDates from API
            try {
                const orderDetail = await getData(`/order-detail?ElderId=${elder?.id}&ServicePackageId=${data?.id}`, {});
                const registeredDates = orderDetail?.data?.map(date => date?.dayOfWeek);
                // Step 3: Disable registered dates in updatedWeekDays
                updatedWeekDays = updatedWeekDays.map(day => ({
                    ...day,
                    disable: day.disable || registeredDates.includes(day?.value)
                }));
                // Update state after processing
                setRegisteredDates(orderDetail?.data);
                setWeekDays(updatedWeekDays);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching orderDetail items:", error);
            }
        };
        fetchData();
    }, [data?.type, data?.servicePackageDates, elder?.id, data?.id, weekDays]); // Dependency array to watch for changes

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
        { value: "Monday", label: "T2", check: true, disable: false },
        { value: "Tuesday", label: "T3", check: true, disable: false },
        { value: "Wednesday", label: "T4", check: true, disable: false },
        { value: "Thursday", label: "T5", check: true, disable: false },
        { value: "Friday", label: "T6", check: true, disable: false },
        { value: "Saturday", label: "T7", check: true, disable: false },
        { value: "Sunday", label: "CN", check: true, disable: false },
    ]);

    const handleBackPress = () => {
        navigation.goBack();
    };

    const formatCurrency = (number) => {
        return number.toLocaleString("vi-VN", {
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
        const currentMonth = moment().month();
        const daysInMonth = moment().daysInMonth();
        const dates = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const date = moment().date(i).month(currentMonth).format("YYYY-MM-DD");
            const dayOfWeek = moment(date).isoWeekday();

            if (!selectedDays.includes(moment.weekdays(dayOfWeek))) {
                dates.push(date);
            }
        }
        return dates;
    };

    const handleSelectedDatesChange = (dates) => {
        setSelectedDates(dates); // Update selectedDates state
    };

    const calculateSelectedDates = () => {
        const selectedDays = weekDays.filter(day => day.check).map(day => day.value);
        const dates = getOrderDates(selectedDays); // Assuming getOrderDates is defined to return formatted dates
        return dates;
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
                {data?.type == "AnyDay" &&
                    <ComRadioGroup
                        radioButtons={radioButtons}
                        onPress={setSelectedId}
                        selectedId={selectedId}
                    />}

                {(selectedId === '1' || selectedId === '3' || data?.type == "MultipleDays") && (
                    <View>
                        <SelectedDates
                            servicePackageDates={data?.servicePackageDates}
                            onDatesChange={handleSelectedDatesChange} // Callback to receive selected dates
                        />
                    </View>
                )}
                {(selectedId === '2' || data?.type == "WeeklyDays") && (
                    <>
                        <Text style={{color: "gray"}}>Dịch vụ sẽ được gia hạn vào tháng sau với những thứ trong tuần bạn chọn dưới đây</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                            {
                                loading ? (
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
                                )
                            }
                        </View>
                        <View style={{ marginVertical: 10, gap: 5 }}>
                            <Text style={{ fontWeight: "600" }}>Danh sách những ngày sẽ thực hiện dịch vụ trong tháng này:</Text>
                            {
                                calculateSelectedDates()?.map((date, index) => (
                                    <Text  key={index}> • <ComDateConverter>{date}</ComDateConverter></Text>
                                ))
                            }

                        </View>
                    </>
                )}
                <View style={{ height: 50 }}></View>
            </ScrollView>
            <View style={{ paddingHorizontal: 20, backgroundColor: "#fff" }}>
                <ComSelectButton
                    disable={calculateSelectedDates()?.length === 0} 
                    onPress={() => {
                        const selectedDates = calculateSelectedDates();
                        navigation.navigate("ServicePayment", { servicePackage: data, elder: elder, orderDates: selectedDates, type: 'RecurringWeeks' });
                    }}>
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
