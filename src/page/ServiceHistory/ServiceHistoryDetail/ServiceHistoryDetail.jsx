import React, { useContext, useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import ComSelectButton from "../../../Components/ComButton/ComSelectButton";
import ComTable from "./ComTable";
import ComPopup from "../../../Components/ComPopup/ComPopup";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../../assets/icon/backArrowWhite.png";
import sadIcon from "../../../../assets/Sad.png";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { postData, getData } from "../../../api/api";

export default function ServiceHistoryDetail() {
    const [data, setData] = useState({});
    const [popupVisible, setPopupVisible] = useState(false);
    const route = useRoute();
    const { id, status } = route.params;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [serviceData, setServiceData] = useState({});
    const [elderData, setElderData] = useState({});

    const handleOpenPopup = () => {
        setPopupVisible(true);
    };
    const handleClosePopup = () => {
        setPopupVisible(false);
    };
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
    // servise history 
    const historyColumnLabels = {
        id: addingPackages?.history?.nurse,
        time: addingPackages?.history?.time,
    };
    const historyColumns = ["id", "time"];
    const historyDataSource = [
        { id: '1234321', time: "10:00 - 08/05/2024" },
        { id: '6789987', time: "10:00 - 08/05/2024" },
        { id: '5703126', time: "10:00 - 08/05/2024" },
        { id: '0033775', time: "10:00 - 08/05/2024" },
    ];

    useFocusEffect(
        useCallback(() => {
            setLoading(!loading);
            getData(`/orders/${id}`, {})
                .then((orders) => {
                    setData(orders?.data)
                    setServiceData(orders?.data?.orderDetails[0]?.servicePackage)
                    setElderData(orders?.data?.orderDetails[0]?.elder)
                    setLoading(loading);
                })
                .catch((error) => {
                    setLoading(loading);
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
            <ComPopup
                visible={popupVisible}
                title="Bạn muốn hủy gian hạn Dịch vụ xoa bóp bấm huyệt theo tuần?"
                image={sadIcon}
                buttons={[
                    { text: 'Đóng', onPress: handleClosePopup, check: true },
                    { text: 'Xác nhận', onPress: () => { navigation.navigate("CancelRenewSuccess", { id: data.id }); } },
                ]}
                onClose={handleClosePopup}
            >
                <Text>Gói dịch vụ sẽ không tự động gia hạn lại</Text>

            </ComPopup>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backIconContainer}>
                    <Image
                        source={backArrowWhite}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Image
                    source={{ uri: serviceData?.imageUrl }}
                    style={{
                        height: 200,
                        objectFit: "fill",
                    }}
                />
            </View>
            <ScrollView style={styles.body}>
                <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }} numberOfLines={2}>
                    {serviceData?.name}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, fontSize: 16, marginBottom: 10 }}>
                        <Text style={{ fontWeight: "bold" }}>
                            {formatCurrency(serviceData?.price || 0)}
                        </Text>
                        /{addingPackages?.package?.month}
                    </Text>
                </View>
                <Text style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={styles.contentBold}>
                        {addingPackages?.history?.dates}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        : {formattedDate(data?.createdAt)}
                    </Text>
                </Text>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.contentBold}>
                        {addingPackages?.history?.serviceDates}
                    </Text>

                    {
                        data?.orderDetails?.length > 0 &&
                        data?.orderDetails[0]?.orderDates?.map((day, index) => (
                            <Text style={{ fontSize: 16 }} key={index}>
                                • {formattedDate(day?.date)}
                            </Text>
                        ))
                    }
                </View>
                <Text style={{ flexDirection: "row", fontSize: 16, marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>
                        {addingPackages?.payment?.elderName}
                    </Text>
                    <Text>
                        : {elderData?.name}
                    </Text>
                </Text>
                <Text style={{ flexDirection: "row", fontSize: 16, marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>
                        {addingPackages?.history?.status}
                    </Text>
                    <Text>
                        :  {status ? "Đã kết thúc" : "Chưa kết thúc"}
                    </Text>
                </Text>
                {/* <Text style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={styles.contentBold}>
                        {addingPackages?.package?.category}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        : {serviceData?.category}
                    </Text>
                </Text>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.contentBold}>
                        {addingPackages?.package?.description}
                    </Text>
                    <Text style={{ fontSize: 16 }}>{serviceData?.context}</Text>
                </View> */}
                <View style={{marginBottom:10}}>
                    <Text style={{ marginVertical: 10, fontSize: 16, fontWeight: 'bold' }}>
                        {addingPackages?.history?.serviceHistory}
                    </Text>
                    <ComTable columns={historyColumns} dataSource={historyDataSource} columnLabels={historyColumnLabels} />
                </View>
                <View style={{ marginBottom: 40 }}>
                    <ComSelectButton
                        onPress={() => {
                            navigation.navigate("CreateFeedback", { data: data });
                        }}>
                        {addingPackages?.history?.feedback}
                    </ComSelectButton>
                    <ComSelectButton
                        onPress={() => {
                            handleOpenPopup()
                        }}>
                        {addingPackages?.history?.cancelRenewal}
                    </ComSelectButton>
                </View>
            </ScrollView>
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
        paddingTop: 50
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
