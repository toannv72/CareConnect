import React, { useContext, useState, useMemo, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from '@react-navigation/native';
import ComSelectWeekDays from "./ComSelectWeekDays";
import ComRadioGroup from "../../Components/ComRadioGroup/ComRadioGroup";
import moment from "moment";
import { getData } from "../../api/api";
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter"
import { Calendar } from "react-native-calendars";
import Calendar31Days from './Calendar31Days';
import ComToast from "../../Components/ComToast/ComToast";

export default function ServiceAnydayRegister() {
    const [selectedId, setSelectedId] = useState('1');
    const [registeredDates, setRegisteredDates] = useState([]);
    const [registereddayOfMonth, setRegistereddayOfMonth] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [orderDetail, setOrderDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    const { elder, data } = route.params;
    const navigation = useNavigation();
    const minDate = moment().add(1, 'day').format('YYYY-MM-DD');
    const maxDate = useMemo(() => {
        if (elder?.contractsInUse?.endDate) {//nếu cơ hợp đồng còn hạn
            const endDate = moment(elder?.contractsInUse?.endDate);
            const diffMonths = endDate.diff(moment(), 'months');//so sánh ngày kết thúc hopdong với ngày hiện tại
            if (diffMonths < 2) { return endDate.format('YYYY-MM-DD'); }//nếu còn ít hơn 2 tháng, maxdate là hạn kết thúc hopdong
        }//nếu > 2 tháng, maxdate là ngày cuối cùng, tháng thứ 2 kể thử hiện tại
        return moment().add(2, 'months').endOf('month').format('YYYY-MM-DD');
    }, [elder?.contractsInUse?.endDate]);

    const { text: { addingPackages } } = useContext(LanguageContext);

    const handleBackPress = () => { navigation.goBack(); };
    const formatCurrency = (number) => {
        return number?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    };

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
        }]), []);

    const handleDayPress = (index) => {
        const updatedDays = [...weekDays]; // Sao chép mảng weekDays để không thay đổi trực tiếp state
        updatedDays[index] = {
            ...updatedDays[index],
            check: !updatedDays[index].check
        };
        setWeekDays(updatedDays);
    };

    const handleAnyDayPress = (day) => {
        const dateString = day.dateString;
        const updatedSelectedDates = [...selectedDates];
        // Kiểm tra xem ngày đã được chọn hay chưa
        const index = updatedSelectedDates?.indexOf(dateString);
        if (index !== -1) { // Nếu ngày đã được chọn, loại bỏ nó khỏi mảng
            updatedSelectedDates?.splice(index, 1);
        } else { // Nếu ngày chưa được chọn, thêm nó vào mảng
            updatedSelectedDates?.push(dateString);
        } // Cập nhật selectedDates với mảng mới
        setSelectedDates(updatedSelectedDates);
    };

    const handleRadioGroupChange = (id) => {
        setSelectedId(id);
        setSelectedDates([])
        const resetWeekDays = weekDays?.map(day => ({
            ...day, check: true // Reset lại trạng thái check về true
        }));
        setWeekDays(resetWeekDays);
    };

    const [weekDays, setWeekDays] = useState([
        { value: "Monday", label: "T2", check: true, disable: false },
        { value: "Tuesday", label: "T3", check: true, disable: false },
        { value: "Wednesday", label: "T4", check: true, disable: false },
        { value: "Thursday", label: "T5", check: true, disable: false },
        { value: "Friday", label: "T6", check: true, disable: false },
        { value: "Saturday", label: "T7", check: true, disable: false },
        { value: "Sunday", label: "CN", check: true, disable: false },
    ]);

    const getType = (selectedId) => {
        switch (selectedId) {
            case '1':
                return 'One_Time';
            case '2':
                return 'RecurringWeeks';
            case '3':
                return 'RecurringDay';
            default:
                return '';
        }
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
        const filteredDates = dates.filter(date => !registeredDates.includes(date));//loại bỏ những ngày đã được chọn mua từ option 1
        return filteredDates;
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const orderDetail = await getData(`/order-detail?ElderId=${elder?.id}&ServicePackageId=${data?.id}`, {});
                const registeredDates = orderDetail?.data?.map(date => date?.date);
                setRegisteredDates(registeredDates);
                setRegistereddayOfMonth(orderDetail?.data?.map(date => date?.dayOfMonth))
                setOrderDetail(orderDetail?.data)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orderDetail items:", error);
                setLoading(false);
            }
        }; fetchData();
    }, [elder?.id, data?.id]);

    useEffect(() => {
        const updatedWeekDays = weekDays.map(weekDayItem => ({
            ...weekDayItem,
            disable: orderDetail.some(item => item.dayOfWeek === weekDayItem.value)
        }));
        setWeekDays(updatedWeekDays);
    }, [orderDetail]);

    const disableDates = useMemo(() => {
        const disabledDates = {};
        registeredDates.forEach(date => {
            disabledDates[date] = { disabled: true, disableTouchEvent: true };
        });
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const registereddayOfMonth = orderDetail
            .filter(item => item.dayOfWeek === null && item.dayOfMonth !== null && item.date === null)
            .map(item => item.dayOfMonth);

        registereddayOfMonth.forEach(item => {
            if (item) {
                const currentMonthDate = new Date(currentYear, currentMonth, item);
                const formattedDate = moment(currentMonthDate).format('YYYY-MM-DD');
                disabledDates[formattedDate] = { disabled: true, disableTouchEvent: true };
            }
        });
        // Add logic to disable dates based on the dayOfWeek from orderDetail
        const daysOfWeekToDisable = orderDetail
            .filter(item => item.dayOfWeek !== null && item.dayOfMonth === null && item.date === null)
            .map(item => item.dayOfWeek);
        daysOfWeekToDisable.forEach(dayOfWeek => {
            for (let i = 1; i <= moment().daysInMonth(); i++) {
                const date = moment().date(i);
                if (date.format('dddd') === dayOfWeek) {
                    const formattedDate = date.format('YYYY-MM-DD');
                    disabledDates[formattedDate] = { disabled: true, disableTouchEvent: true };
                }
            }
        });
        return disabledDates;
    }, [registeredDates, registereddayOfMonth, orderDetail]);

    const getDisabledDates = (orderDetail) => {
        const currentMonth = new Date().getMonth();
        const getDatesForDayOfWeek = (dayOfWeek) => {
            const daysInMonth = moment().daysInMonth();
            const datesInMonth = [];
            for (let i = 1; i <= daysInMonth; i++) {
                const date = moment().date(i);
                if (date.format('dddd') === dayOfWeek) {
                    datesInMonth.push(date.date()); // Use `.date()` to get the day number
                }
            }
            return datesInMonth;
        };
    
        return orderDetail?.map(item => {
            if (item?.dayOfMonth !== null) {
                return item?.dayOfMonth;
            } else if (item?.date) {
                const date = new Date(item?.date);
                if (!isNaN(date) && date.getMonth() === currentMonth) {
                    return date.getDate();
                }
            } else if (item?.dayOfWeek) {
                return getDatesForDayOfWeek(item.dayOfWeek);
            }
            return null; // Default value if no valid date is found
        }).flat().filter(date => date !== null); // Flatten and filter out null values
    };
    
    const handlePayment = () => {//check sát ngày
        const allDatesInPastOrToday = selectedDates.every(date => moment(date).isSameOrBefore(moment(), 'day'));
        const contractEndDate = moment(elder?.contractsInUse?.endDate);
        // Function to check if adding a month to selected dates exceeds the contract end date
        const checkDatesWithMonthAdded = (dates) => {
            return dates.map(date => moment(date).add(1, 'month')).some(date => date.isAfter(contractEndDate, 'day'));
        };

        if (allDatesInPastOrToday && checkDatesWithMonthAdded(selectedDates)) {
            ComToast({
                text: 'Một số ngày bạn chọn vượt qua hạn kết thúc hợp đồng. Vui lòng chọn ngày khác.',
                duration: 2500
            });
        } else {
            let orderDates = [];
            const filteredSelectedDates = selectedDates.filter(date => !registeredDates.includes(date));
            const filteredCalculatedDates = calculateSelectedDates().filter(date => !registeredDates.includes(date));

            if (selectedId === '1' || selectedId === '3') {
                orderDates = filteredSelectedDates;
            } else if (selectedId === '2') {
                orderDates = filteredCalculatedDates;
            }
            navigation.navigate("ServicePayment", { servicePackage: data, elder: elder, orderDates: orderDates, type: getType(selectedId) });
        }
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
                    <Text style={{ fontWeight: "bold" }}> {formatCurrency(data?.price)}
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
                    onPress={handleRadioGroupChange}
                    selectedId={selectedId} />
                {(selectedId === '1') && (
                    <Calendar
                        minDate={minDate}
                        maxDate={maxDate}
                        onDayPress={(day) => handleAnyDayPress(day)}
                        markedDates={{
                            ...selectedDates.reduce((dates, date) => {
                                dates[date] = { selected: true, selectedColor: '#33B39C' };
                                return dates;
                            }, {}),
                            ...disableDates
                        }}
                        hideExtraDays={true}
                    />
                )}
                {(selectedId === '2') && (
                    <>
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
                            )
                            }
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
                    </>
                )}
                {(selectedId === '3') && (
                    <View>
                        <Calendar31Days selectedDates={selectedDates} setSelectedDates={setSelectedDates} disableDates={getDisabledDates(orderDetail)} />
                    </View>
                )}
                <View style={{ height: 50 }}></View>
            </ScrollView>
            <View style={{ paddingHorizontal: 20, backgroundColor: "#fff" }}>
                <ComSelectButton
                    disable={selectedDates?.length === 0 && calculateSelectedDates()?.length == 0}
                    onPress={handlePayment} > Thanh toán ngay </ComSelectButton>
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
        // paddingTop: 25,
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
        marginTop: 10,
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
