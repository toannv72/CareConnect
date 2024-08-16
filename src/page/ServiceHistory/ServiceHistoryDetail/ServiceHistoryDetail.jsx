import React, { useContext, useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import ComSelectButton from "../../../Components/ComButton/ComSelectButton";
import ComTable from "./ComTable";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../../assets/icon/backArrowWhite.png";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { postData, getData } from "../../../api/api";

export default function ServiceHistoryDetail() {
    const [data, setData] = useState({});
    const [orderDetailData, setOrderDetailData] = useState({});
    const [feedbackData, setFeedbackData] = useState([]);
    const route = useRoute();
    const { id, status, orderDetailId } = route.params;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [serviceData, setServiceData] = useState({});
    const [elderData, setElderData] = useState({});
    const {
        text: { addingPackages },
        setLanguage,
    } = useContext(LanguageContext);
    const handleBackPress = () => {
        navigation.goBack();
    };
    const formatCurrency = (number) => {
        if (typeof number !== 'undefined') {
            return number.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            });
        }
        return '';
    };
    // servise history 
    const historyColumnLabels = {
        userId: addingPackages?.history?.nurse,
        completedAt: addingPackages?.history?.time,
    };
    const historyColumns = ["userId", "completedAt"];
    const historyDataSource = orderDetailData
        ? orderDetailData?.orderDates?.filter((day) => new Date(day?.date) > new Date(data?.createdAt))
        : [];

    const lastHistoryDate = historyDataSource?.length > 0
        ? new Date(historyDataSource[historyDataSource?.length - 1].date)
        : null;
    const currentDate = new Date();

    const filteredOrderDates = orderDetailData?.orderDates?.filter(detail => {
        const orderDate = new Date(detail?.date);
        const createdDate = new Date(data?.createdAt);
        return orderDate > createdDate;
    });

    //Check trong vòng 5 ngày kể từ ngày cuối cùng của dịch vụ
    const daysDifference = lastHistoryDate ? Math?.round((currentDate - lastHistoryDate) / (1000 * 60 * 60 * 24)) : 0;
    const isWithinFiveDays = daysDifference > 0 && daysDifference <= 5;
    const currentPrice = orderDetailData?.price / filteredOrderDates?.length // giá lúc mua
    // tổng tiền mỗi dv    /   tổng số ngày > createAt 
    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            getData(`/orders/${id}`, {})
                .then((orders) => {
                    setData(orders?.data)
                    setServiceData(orders?.data?.orderDetails[0]?.servicePackage)
                    setElderData(orders?.data?.orderDetails[0]?.elder)
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error("Error getData fetching items:", error);
                });

            getData(`/order-detail/${orderDetailId}`, {})
                .then((ordersdetail) => {
                    setOrderDetailData(ordersdetail?.data)
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error("Error getData fetching items:", error);
                });

            getData(`/feedback?OrderDetailId=${orderDetailId}`, {})
                .then((feedback) => {
                    setFeedbackData(feedback?.data?.contends)
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error("Error getData fetching items:", error);
                });
        }, [])
    );

    const formattedDate = (dateValue) => {
        const day = new Date(dateValue).getDate().toString().padStart(2, "0");
        const month = (new Date(dateValue).getMonth() + 1).toString().padStart(2, "0");
        const year = new Date(dateValue).getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backIconContainer}>
                    <Image source={backArrowWhite} style={styles.backIcon} />
                </TouchableOpacity>
                <Image
                    source={{ uri: orderDetailData?.servicePackage?.imageUrl }}
                    style={{ height: 220, objectFit: "fill" }}
                />
            </View>
            <View style={styles.body}>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => { navigation.navigate("AddingServiceDetail", { id: orderDetailData?.servicePackage?.id }) }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }} numberOfLines={2}>
                            {orderDetailData?.servicePackage?.name}
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ flex: 1, fontSize: 16, marginBottom: 10 }}>
                            <Text style={{ fontWeight: "bold" }}>
                                {formatCurrency(currentPrice || 0)}
                            </Text>
                            /{addingPackages?.package?.time}
                        </Text>
                    </View>
                    <Text style={{ flexDirection: "row", marginBottom: 10 }}>
                        <Text style={styles.contentBold}>{addingPackages?.history?.dates}</Text>
                        <Text style={{ fontSize: 16 }}>: {formattedDate(data?.createdAt)}</Text>
                    </Text>
                    <TouchableOpacity style={{ flexDirection: "row", marginBottom: 10 }} onPress={() => navigation.navigate("ElderDetailProfile", { data: elderData })}>
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                            {addingPackages?.payment?.elderName}: 
                        </Text>
                        <Text style={{ fontSize: 16, color: "#33B39C" }}> {elderData?.name}</Text>
                    </TouchableOpacity>
                    <Text style={{ flexDirection: "row", fontSize: 16, marginBottom: 10 }}>
                        <Text style={{ fontWeight: "bold" }}>{addingPackages?.history?.status}</Text>
                        <Text>:  {status ? "Đã kết thúc" : "Chưa kết thúc"}</Text>
                    </Text>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.contentBold}>
                            {addingPackages?.history?.serviceDates}
                        </Text>
                        {orderDetailData?.orderDates &&
                            orderDetailData?.orderDates?.filter((day) => new Date(day?.date) > new Date(data?.createdAt))
                                ?.map((day, index) => (
                                    <Text style={{ fontSize: 16 }} key={index}>
                                        • {formattedDate(day?.date)}
                                    </Text>
                                ))
                        }
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ marginVertical: 10, fontSize: 16, fontWeight: 'bold' }}>
                            {addingPackages?.history?.serviceHistory}
                        </Text>
                        <ComTable columns={historyColumns} dataSource={historyDataSource} columnLabels={historyColumnLabels} />
                    </View>
                </ScrollView>
                <View style={{ marginBottom: 10, flexDirection: "row", gap: 10 }}>
                    {(isWithinFiveDays || feedbackData?.length > 0) && (//trong vòng 5 ngày sau ngày cuối hoặc đã có feedback
                        <View style={{ flex: 1 }}>
                            {feedbackData?.length > 0 ? (//nếu đã có feedback => xem
                                <ComSelectButton onPress={() => { navigation.navigate("FeedbackDetail", { id: feedbackData[0]?.id }) }}>
                                    Xem đánh giá
                                </ComSelectButton>
                            ) : (//nếu chưa có feedback => tạo
                                <ComSelectButton onPress={() => { navigation.navigate("CreateFeedback", { data: data, serviceData, orderDetailId }) }}>
                                    {addingPackages?.history?.feedback}
                                </ComSelectButton>
                            )}
                        </View>
                    )}
                    <View style={{ flex: 1 }}>
                        <ComSelectButton onPress={() => { navigation.navigate("BillDetail", { id }) }}>
                            Chi tiết thanh toán
                        </ComSelectButton>
                    </View>
                </View>
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
        // paddingTop: 25
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
