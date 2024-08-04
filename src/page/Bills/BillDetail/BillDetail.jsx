import React, { useContext, useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { getData, postData } from "../../../api/api";
import ComHeader from "../../../Components/ComHeader/ComHeader";
import ComButton from "../../../Components/ComButton/ComButton";
import ComDateTimeConverter from "../../../Components/ComDateConverter/ComDateTimeConverter";
import ComTag from "../ComTag";
import ComPaymentMethod from "./ComPaymentMethod";
import ComPaymentInfo from "./ComPaymentInfo";
import ComToast from "../../../Components/ComToast/ComToast";
import ComBillDetail from "./ComBillDetail";
import moment from 'moment';
import billImg from "../../../../assets/bill.png";
import momo from "../../../../assets/momo.png";
import vnpay from "../../../../assets/vnpay.png";
import ComLoading from "../../../Components/ComLoading/ComLoading";
import { Linking } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const BillDetail = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true); // Start with loading true
    const navigation = useNavigation();
    const { text: { bill } } = useContext(LanguageContext);
    const route = useRoute();
    const { id } = route.params;
    const [selectedMethod, setSelectedMethod] = useState('momo');
    const [isOverDue, setIsOverDue] = useState(false);

    const handleMethodPress = (methodName) => {
        setSelectedMethod(methodName);
    };

    const formatCurrency = (number) => {
        return number?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    useFocusEffect(
        useCallback(() => {
            setLoading(true); // Start loading
            getData(`/orders/${id}`, {})
                .then((order) => {
                    setData(order?.data || {});
                    if (order?.data?.dueDate) {
                        const dueDate = moment(order?.data.dueDate, "YYYY-MM-DD").startOf('day');
                        const now = moment().startOf('day');
                        setIsOverDue(now.isAfter(dueDate));
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.log("Error fetching order:", error);
                });
        }, [id])
    );

    const payment = () => {
        setLoading(true); // Start loading
        const formattedData = {
            "orderId": id,
            "returnUrl": "https://careconnectadmin.vercel.app/paymentStatus",
            "method": selectedMethod
        }
        postData("/orders/service-package-payment", formattedData)
            .then((response) => {
                const url = response.message;
                Linking.openURL(url)
                    .then(() => {
                        navigation.navigate("ServicePaymentStatus", { orderId: id })
                    })
                    .catch((err) => {
                        setLoading(false);
                        console.log("Failed to open URL: ", err);
                    });
            })
            .catch((error) => {
                setLoading(false); // Start loading
                console.log("API Error: ", error);
                if (error.response.status == 400) {
                    if (data?.status === "Paid")
                        ComToast({ text: 'Thanh toán thất bại. Đơn hàng đã được thanh toán xong.' });
                    else
                        ComToast({ text: 'Thanh toán thất bại. Đơn hàng đã quá hạn thanh toán.' });
                } else {
                    ComToast({ text: 'Đã có lỗi xảy ra. Vui lòng thử lại.' });
                }
            });
    }

    return (
        <>
            <ComHeader
                title={bill?.detail?.title}
                showTitle
                showBackIcon
            />
            <View style={styles.body}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    {loading ? (
                        <ComLoading show={loading} />
                    ) : (
                        <>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Image
                                    source={billImg}
                                    style={{
                                        height: 150,
                                        width: 100,
                                        resizeMode: "cover",
                                    }} />
                            </View>

                            <Text style={styles.contentBold}>{bill?.detail?.customerInfo}</Text>
                            <View style={styles.tableContainer}>
                                <ComBillDetail title={bill?.title} content={data?.description}></ComBillDetail>
                                <ComBillDetail title={bill?.billId} content={data?.id}></ComBillDetail>
                                <ComBillDetail title={bill?.dueDate} content={moment(data?.dueDate, "YYYY-MM-DD").format("DD/MM/YYYY")}></ComBillDetail>
                                {data?.status === "Paid" && (
                                    <>
                                        <ComBillDetail title={bill?.detail?.paymentDate} content={ComDateTimeConverter(data?.paymentDate)} />
                                        <ComBillDetail title={bill?.detail?.paymentMethod} content={data?.method} />
                                    </>
                                )}
                                <View style={{ flexDirection: "row", paddingVertical: 10, justifyContent: "space-between", borderTopWidth: 1, borderColor: '#ddd' }}>
                                    <Text style={{ fontWeight: "600" }}>{bill?.status}</Text>
                                    <ComTag status={data?.status} />
                                </View>
                            </View>

                            <Text style={styles.contentBold}>{bill?.detail?.paymentInfo}</Text>

                            <View style={styles.tableContainer}>
                                {
                                    data?.orderDetails?.map((detail, index) => (
                                        <ComPaymentInfo key={index} data={detail} createdAt={data?.createdAt} />
                                    ))
                                }
                                <ComBillDetail title={bill?.total} content={formatCurrency(data?.amount)} />
                            </View>

                            {(data?.status === "UnPaid" || data?.status === "Failed") && (
                                <>
                                    <Text style={styles.contentBold}>{bill?.detail?.paymentMethod}</Text>
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
                                    <ComButton
                                        onPress={() => { payment() }}
                                        disable={isOverDue}>
                                        {data?.status === "Failed" ? "Thanh toán lại" : bill?.detail?.pay}
                                    </ComButton>
                                </>
                            )}
                        </>
                    )}
                </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
    },
    contentBold: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "600"
    },
    tableContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#33B39C",
        paddingHorizontal: 10,
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 10,
    },
    labelText: {
        fontWeight: '600'
    },
    contentText: {
        flex: 1,
        textAlign: "right"
    }
});

export default BillDetail;
