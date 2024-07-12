import React, { useContext, useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Text, SectionList } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { postData, getData } from "../../api/api";
import ComHeader from '../../Components/ComHeader/ComHeader';
import ComScheduledService from './ComScheduledService';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import moment from "moment";
import momo from "../../../assets/momo.png";
import vnpay from "../../../assets/vnpay.png";
import ComPaymentMethod from "../Bills/BillDetail/ComPaymentMethod";
import Toast from 'react-native-toast-message';

export default function ScheduledServicePayment({ }) {
    const navigation = useNavigation();
    const route = useRoute();
    const { selectedServices, data } = route?.params;
    const [selectedMethod, setSelectedMethod] = useState('momo');
    const showToast = (type, text1, text2, position) => { Toast.show({ type: type, text1: text1, text2: text2, position: position }) }

    const formatCurrency = (number) => {
        return number?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        }) ?? '';
    };

    const totalPrice = selectedServices.reduce((total, service) => total + (service.servicePackage.price * service.scheduledTimes.length), 0);

    const onConfirm = (payment) => {
        const endOfMonth = moment().endOf('month');// Xác định ngày cuối cùng của tháng hiện tại
        // Kiểm tra nếu tháng hiện tại có ngày 30
        const lastDayOfMonth = endOfMonth.date() >= 30 ? moment().date(30).format('YYYY-MM-DD') : endOfMonth.format('YYYY-MM-DD');
        const orderDetailsList = selectedServices.map((service) => {
            return {
                "notes": service?.servicePackage?.name,
                "servicePackageId": service?.servicePackage?.id,
                "elderId": service?.elder?.id,
                "type": service?.type,
                "orderDates": service?.scheduledTimes
            };
        });
        const formattedData = {
            "method": payment == "Later" ? "none" : selectedMethod,
            "dueDate": lastDayOfMonth,
            "description": data?.name,
            "content": data?.name,
            "notes": data?.name,
            "orderDetails": orderDetailsList
        }
        console.log(" formattedData", formattedData)
        postData("/orders/service-package?returnUrl=a", formattedData)
            .then((response) => {
                console.log("API Response: ", response.message);
                if (payment === "Now") {
                    Linking.openURL(url)
                        .then(() => {
                            console.log("Opened successfully");
                        })
                        .catch((err) => {
                            console.log("Failed to open URL: ", err);
                        });
                    showToast("success", "Xác nhận đăng ký thành công", "", "top");
                } else if (payment === "Later") {
                    showToast("success", "Đăng ký thành công", `Bạn vui lòng thanh toán dịch vụ trước ngày ${lastDayOfMonth}`, "top");
                    console.log("Payment will be made later");
                    navigation.navigate("Homes");
                }
            })
            .catch((error) => {
                console.log("API Error: ", error);
                // showToast("error", "Có lỗi xảy ra, vui lòng thử lại!", "", "bottom")
            });
    }

    return (
        <>
            <ComHeader
                showBackIcon={true}
                showTitle={true}
                title={"Xác nhận đăng ký"}
            />
            <View style={styles.body}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        selectedServices?.map((item, index) => (
                            <ComScheduledService
                                key={index}
                                data={item}
                                hideCheck={true}
                            />
                        ))
                    }
                </ScrollView>
                <View>
                    <ScrollView>
                        <View style={styles.tableContainer}>
                            <ComPaymentMethod
                                name="Momo"
                                logo={momo}
                                isSelected={selectedMethod === 'momo'}
                                onPress={() => setSelectedMethod('momo')}
                            />
                            <ComPaymentMethod
                                name="VnPay"
                                logo={vnpay}
                                isSelected={selectedMethod === 'VnPay'}
                                onPress={() => setSelectedMethod('VnPay')}
                            />
                        </View>
                    </ScrollView>
                    <View style={[{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }]}>
                        <Text style={{ fontWeight: "600", fontSize: 16 }}>
                            Tổng tiền
                        </Text>
                        <Text style={{ fontWeight: "600", fontSize: 16 }}>
                            {formatCurrency(totalPrice)}
                        </Text>
                    </View>
                    <View style={[{ flexDirection: "row", justifyContent: "space-between" }]}>

                        <ComSelectButton
                            disable={selectedServices?.length == 0}
                            onPress={() => onConfirm("Now")}
                        >   Thanh toán ngay   </ComSelectButton>
                        <ComSelectButton
                            disable={selectedServices?.length == 0}
                            onPress={() => onConfirm("Later")}
                        >   Thanh toán sau   </ComSelectButton>
                    </View>
                </View>

            </View>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
    },
    body: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
    },
    tableContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#33B39C",
        paddingHorizontal: 10,
        marginTop: 10
    },
});