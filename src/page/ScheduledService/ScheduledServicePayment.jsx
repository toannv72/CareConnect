import React, { useContext, useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Text, SectionList } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { postData, deleteData } from "../../api/api";
import ComHeader from '../../Components/ComHeader/ComHeader';
import ComScheduledService from './ComScheduledService';
import ComToast from "../../Components/ComToast/ComToast";
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import moment from "moment";
import momo from "../../../assets/momo.png";
import vnpay from "../../../assets/vnpay.png";
import ComPaymentMethod from "../Bills/BillDetail/ComPaymentMethod";
import Toast from 'react-native-root-toast';
import { Linking } from 'react-native';

export default function ScheduledServicePayment({ }) {
    const navigation = useNavigation();
    const route = useRoute();
    const { selectedServices, data } = route?.params;
    const [selectedMethod, setSelectedMethod] = useState('momo');

    const formatCurrency = (number) => {
        return number?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        }) ?? '';
    };

    const totalPrice = selectedServices.reduce((total, service) => total + (service.servicePackage.price * service.scheduledTimes?.length), 0);

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

        postData("/orders/service-package?returnUrl=https://careconnectadmin.vercel.app/paymentStatus", formattedData)
            .then((response) => {
                console.log("API Response: ", response);
                deleteSchedule()
                if (payment === "Now") {
                    const url = response.message;
                    const orderId = response.orderId;
                    Linking.openURL(url)
                        .then(() => {
                            console.log("Opened successfully");
                            navigation.navigate("ServicePaymentStatus", { orderId: orderId })
                        })
                        .catch((err) => {
                            console.log("Failed to open URL: ", err);
                        });
                    ComToast({ text: 'Xác nhận đăng ký thành công' });
                } else if (payment === "Later") {
                    ComToast({ text: `Đăng ký thành công. Bạn vui lòng thanh toán dịch vụ trước ngày ${moment(lastDayOfMonth).format("DD/MM/YYYY")}` });
                    navigation.navigate("BillHistory");
                }
            })
            .catch((error) => {
                console.log("API Error: ", error);
                switch (error.response.status) {
                    case 609:
                        ComToast({ text: 'Đăng ký thất bại. Dịch vụ đã được đăng ký 609' });
                        break;
                    case 610:
                        ComToast({ text: 'Đăng ký thất bại. Dịch vụ đã được đăng ký 610' });
                        break;
                    case 611:
                        ComToast({ text: 'Đăng ký thất bại. Dịch vụ đã được đăng ký 611' });
                        break;
                    default:
                        ComToast({ text: 'Đăng ký thất bại. Đã có lỗi xảy ra. Vui lòng thử lại.' });
                        break;
                };
            });

    }

    const deleteSchedule = () => {
        deleteData(`/scheduled-service`, data?.id)
            .then((response) => {
                console.log("Delete scheduled-service successfully");
            })
            .catch((error) => {
                console.log("API Delete scheduled-service Error: ", error);
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
                            style={{ flex: 0.9 }}
                            disable={selectedServices?.length == 0}
                            onPress={() => onConfirm("Now")}
                        >  Thanh toán ngay  </ComSelectButton>
                        <ComSelectButton
                            style={{ flex: 0.9 }}
                            disable={selectedServices?.length == 0}
                            onPress={() => onConfirm("Later")}
                        >  Thanh toán sau  </ComSelectButton>
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