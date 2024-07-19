import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import servicePayment from "../../../assets/images/service/payment.png";
import { useNavigation } from '@react-navigation/native';
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter"
import ComPaymentMethod from "../Bills/BillDetail/ComPaymentMethod";
import momo from "../../../assets/momo.png";
import vnpay from "../../../assets/vnpay.png";
import moment from "moment";
import { postData } from "../../api/api"; // Import your API function
import { Linking } from 'react-native';
import Toast from 'react-native-toast-message';

export default function ServicePayment() {
    const {
        text: { addingPackages },
        setLanguage,
    } = useContext(LanguageContext);

    const navigation = useNavigation();
    const route = useRoute();
    const { servicePackage, elder, orderDates, type } = route?.params;
    const [selectedMethod, setSelectedMethod] = useState('momo');
    const [loading, setLoading] = useState(false);
    const [adjustedOrderDates, setAdjustedOrderDates] = useState(orderDates);
    const handleBackPress = () => { navigation.goBack() };

    const showToast = (type, text1, text2, position) => {
        Toast.show({ type: type, text1: text1, text2: text2, position: position, visibilityTime: 2000});
    }

    const handleMethodPress = (methodName) => {
        setSelectedMethod(methodName);
    };

    useEffect(() => {
        const sortedDates = [...orderDates].sort((a, b) => moment(a, 'YYYY-MM-DD').diff(moment(b, 'YYYY-MM-DD')));
        // Kiểm tra xem tất cả các ngày trong orderDates có phải là ngày quá khứ or hiện tại không
        const allPastDates = sortedDates.every(date => moment(date, 'YYYY-MM-DD').isSameOrBefore(moment(), 'day'));
        if (allPastDates) {
            // Lấy ngày tháng sau tương ứng nếu có
            const nextMonthDates = sortedDates.map(date => {
                const nextMonthDate = moment(date, 'YYYY-MM-DD').add(1, 'months');
                return nextMonthDate.isValid() ? nextMonthDate.format('YYYY-MM-DD') : null;
            });
            setAdjustedOrderDates(nextMonthDates);
        } else {
            setAdjustedOrderDates(sortedDates);
        }
    }, [orderDates]);

    const formatCurrency = (number) => {
        // Sử dụng hàm toLocaleString() để định dạng số
        return number?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    const totalMoney = () => {
        if (servicePackage?.type === "OneDay") {
            return servicePackage?.price;
        } else {
            const today = moment();
            const futureDates = adjustedOrderDates?.filter(date => moment(date)?.isAfter(today));
            return servicePackage?.price * futureDates?.length;
        }
    }

    const payment = () => {
        const transformedDates = servicePackage?.type === "OneDay" ? [{ "date": servicePackage?.eventDate }] : adjustedOrderDates.map(date => ({ date }));
        const formattedData = {
            "method": selectedMethod,
            "dueDate": moment().format('YYYY-MM-DD'),
            "description": "Thanh toán dịch vụ " + servicePackage?.name,
            "content": "Thanh toán dịch vụ " + servicePackage?.name,
            "notes": "Thanh toán dịch vụ " + servicePackage?.name,
            "orderDetails": [
                {
                    "notes": "Thanh toán dịch vụ " + servicePackage?.name + " cho người cao tuổi " + elder?.name,
                    "servicePackageId": servicePackage?.id,
                    "elderId": elder?.id,
                    "type": type,
                    "orderDates": transformedDates
                }
            ]
        }
        setLoading(true)
        postData("/orders/service-package?returnUrl=exp://rnnstoi-thaomy-8081.exp.direct/--/BillHistory", formattedData)
            .then((response) => {
                console.log("API Response: ", response.message);
                const url = response.message; // Assuming response.message contains the URL
                // Open the URL in the default browser
                setLoading(false)
                Linking.openURL(url)
                    .then(() => {
                        console.log("Opened successfully");
                        navigation.navigate("BillHistory")
                    })
                    .catch((err) => {
                        console.log("Failed to open URL: ", err);
                    });
            })
            .catch((error) => {
                console.log("API Error: ", error.response);
                setLoading(false)
                switch (error.response.status) {
                    case 609:
                        showToast("error", "Đăng ký thất bại", "Dịch vụ đã được đăng ký", "bottom");
                        break;
                    case 610:
                        showToast("error", "Đăng ký thất bại", "Dịch vụ đã được đăng ký", "bottom");
                        break;
                    case 611:
                        showToast("error", "Đăng ký thất bại", "Dịch vụ đã được đăng ký", "bottom");
                        break;
                    default:
                        showToast("error", "Đăng ký thất bại", "Đã có lỗi xảy ra. Vui lòng thử lại.", "bottom");
                        break;
                };
            });
    }

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backIconContainer}>
                    <Image source={backArrowWhite} style={styles.backIcon} />
                </TouchableOpacity>
                <Image
                    source={servicePayment}
                    style={{
                        height: 200,
                        width: "100%",
                        objectFit: "fill",
                    }}
                />
            </View>
            <ScrollView style={styles.body}>
                <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10, textAlign: 'center' }} numberOfLines={2}>
                    {addingPackages?.payment?.title}
                </Text>

                <Text style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={styles.contentBold}>
                        {addingPackages?.payment?.serviceName}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        : {servicePackage?.name}
                    </Text>
                </Text>
                <Text style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={styles.contentBold}>
                        Giá dịch vụ
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        : {formatCurrency(servicePackage?.price)}
                    </Text>
                </Text>

                <Text style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={styles.contentBold}>
                        {addingPackages?.payment?.elderName}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        : {elder?.name}
                    </Text>
                </Text>
                <Text style={styles.contentBold}>
                    {addingPackages?.payment?.time}:
                </Text>
                {servicePackage?.type === "OneDay" ? (
                    <Text style={{ fontSize: 16, marginBottom: 5 }}>
                        - <ComDateConverter>{orderDates}</ComDateConverter>
                    </Text>
                ) : (
                    adjustedOrderDates?.map((day, index) => {
                        const isFutureDate = moment(day)?.isAfter(moment(), 'day'); // Kiểm tra xem ngày có phải là ngày trong tương lai không
                        if (isFutureDate) {
                            return (
                                <Text style={{ fontSize: 16, marginBottom: 5 }} key={index}>
                                    - <ComDateConverter>{day}</ComDateConverter>
                                </Text>
                            );
                        } else {
                            return null; // Nếu không phải ngày trong tương lai, trả về null để không render
                        }
                    })
                )}

                <Text style={styles.contentBold}>Phương thức thanh toán</Text>
                <View style={styles.tableContainer}>
                    <ComPaymentMethod
                        name="Momo"
                        logo={momo}
                        isSelected={selectedMethod === 'momo'}
                        onPress={() => handleMethodPress('momo')}
                    />
                    <ComPaymentMethod
                        name="VnPay"
                        logo={vnpay}
                        isSelected={selectedMethod === 'VnPay'}
                        onPress={() => handleMethodPress('VnPay')}
                    />
                </View>
            </ScrollView>
            <View style={{ backgroundColor: "#fff", paddingHorizontal: 15 }}>
                <Text style={{ flexDirection: "row", marginTop: 5 }}>
                    <Text style={styles.contentBold}>
                        {addingPackages?.payment?.totalMoney}
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#33B39C" }}>
                        {servicePackage?.type === "OneDay" ? (
                            <>
                                : {formatCurrency(servicePackage?.price)} x 1 = {formatCurrency(totalMoney())}
                            </>
                        ) : (
                            <>
                                : {formatCurrency(servicePackage?.price)} x {adjustedOrderDates?.filter(date => moment(date)?.isAfter(moment()))?.length} = {formatCurrency(totalMoney())}
                            </>
                        )}
                    </Text>
                </Text>
                <ComSelectButton onPress={() => payment()} >
                    {loading ? <ActivityIndicator /> : addingPackages?.payment?.title}
                </ComSelectButton>
            </View>
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
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    tableContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#33B39C",
        paddingHorizontal: 10,
        marginBottom: 20
    },
});
