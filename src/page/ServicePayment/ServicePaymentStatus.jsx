import React, { useContext, useCallback, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ComTitlePage from "../../Components/ComTitlePage/ComTitlePage";
import { LanguageContext } from "../../contexts/LanguageContext";
import fail from "../../../assets/images/payment/fail.png";
import Loading_2 from "../../../assets/images/payment/Loading_2.gif";
import Overdue from "../../../assets/images/payment/overdue.png";
import check from "../../../assets/images/payment/check.gif";
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter"
import ComButton from "../../Components/ComButton/ComButton";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../../auth/useAuth";
import { getData } from "../../api/api";

export default function ServicePaymentStatus() {
    const navigation = useNavigation();
    const {
        text: {
            paymentStatus, bill,
            common: { button },
        },
        setLanguage,
    } = useContext(LanguageContext);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const route = useRoute();
    const { orderId } = route.params;
    const { user } = useAuth();
    const toHomes = () => {
        navigation.navigate("Homes", { screen: "Home" });
    };

    const toBillDetail = () => {
        navigation.navigate("BillDetail", { id: data?.id });
    };

    const fetchData = () => {
        setLoading(true); // Start loading
        getData(`/orders/${orderId}`, {})
            .then((order) => {
                setData(order?.data || {});
                setLoading(false); // Stop loading on success
            })
            .catch((error) => {
                setLoading(false); // Stop loading on error
                console.log("Error fetching order:", error);
            });
    };

    useFocusEffect(
        useCallback(() => {
            fetchData(); // Fetch data when screen is focused
        }, [orderId])
    );

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (data?.status == "UnPaid")
                fetchData(); // Fetch data every 2 seconds
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [data?.status]);

    const getStatusText = (status) => {
        switch (status) {
            case 'Paid':
                return { text: paymentStatus?.paidTitle, color: '#33B39C', img: check };
            case 'UnPaid':
                return { text: paymentStatus?.unpaidTitle, color: '#33B39C', img: Loading_2 };
            case 'OverDue':
                return { text: paymentStatus?.overdueTitle, color: 'none', img: Overdue };
            case 'Failed':
                return { text: paymentStatus?.failTitle, color: 'red', img: fail };
            default:
                return status;
        }
    };

    const formatCurrency = (number) => {
        return number.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    return (
        <View style={styles?.body}>
            <View style={styles?.container}>
                <ComTitlePage>
                    <Text style={{ color: getStatusText(data?.status)?.color }}>{getStatusText(data?.status)?.text}</Text>
                </ComTitlePage>
                {data?.status === "Paid" &&
                    <Image style={{ width: 200, height: 200, tintColor: getStatusText(data?.status)?.color }} source={check} />
                }
                {data?.status === "UnPaid" &&
                    <Image style={{ width: 200, height: 200, tintColor: getStatusText(data?.status)?.color }} source={Loading_2} />
                }
                {data?.status === "OverDue" &&
                    <Image style={{ width: 200, height: 200, tintColor: getStatusText(data?.status)?.color }} source={Overdue} />
                }
                {data?.status === "Failed" &&
                    <Image style={{ width: 200, height: 200, tintColor: getStatusText(data?.status)?.color }} source={fail} />
                }
                <View style={styles?.container1}>
                    <View >
                        {(data?.status === "Paid" || data?.status === "UnPaid") && (
                            <View style={{ marginVertical: 10 }}>
                                {data?.status === "Paid" &&
                                    <Text style={{ textAlign: "center", fontSize: 16 }}>Cảm ơn bạn đã tin tưởng CareConnect</Text>
                                }
                                {data?.status === "UnPaid" &&
                                    <Text style={{ textAlign: "center", fontSize: 16 }}>Bạn vui lòng thanh toán đơn hàng trước ngày {<ComDateConverter>{data?.dueDate}</ComDateConverter>} để có thể sử dụng dịch vụ</Text>
                                }
                            </View>
                        )}

                        {data?.status === "OverDue" && (
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ textAlign: "center", fontSize: 16 }}>{paymentStatus?.backLater}</Text>
                            </View>
                        )}

                        {data?.status === "Failed" && (
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ textAlign: "center", fontSize: 16 }}>{paymentStatus?.error}</Text>
                                <Text style={{ textAlign: "center", fontSize: 16 }}>{paymentStatus?.backLater}</Text>
                            </View>
                        )}
                        {
                            data && (
                                <View style={{ gap: 10 }}>
                                    <Text style={{ flexDirection: "row", fontSize: 16 }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                                            {bill?.billId}
                                        </Text>
                                        <Text>: {data?.id}</Text>
                                    </Text>
                                    <Text style={{ flexDirection: "row", fontSize: 16 }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                                            {bill?.total}
                                        </Text>
                                        <Text>: {formatCurrency(data?.amount || 0)}</Text>
                                    </Text>
                                </View>
                            )
                        }
                    </View>
                </View>
            </View>

            <View
                style={{
                    width: "90%",
                    backgroundColor: "#fff",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginVertical: 10,
                    gap: 20
                }}
            >
                <ComButton onPress={toHomes} style={{ flex: 1 }} check={true}>
                    Về trang chủ
                </ComButton>
                {(data?.status === "Paid" || data?.status === "UnPaid") && (
                    <ComButton onPress={toBillDetail} style={{ flex: 1 }}>
                        Chi tiết thanh toán
                    </ComButton>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        gap: 30,
    },
    container: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
        width: "90%",
    },
    container1: {
        width: "100%",
        paddingHorizontal: 30,
        justifyContent: "center",
        flexWrap: "wrap",
    },
});
