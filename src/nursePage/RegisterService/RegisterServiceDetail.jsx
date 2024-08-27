import React, { useContext, useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComButton from "../../Components/ComButton/ComButton";
import ComToast from "../../Components/ComToast/ComToast";
import ComPopup from "../../Components/ComPopup/ComPopup";
import { putData } from "../../api/api";
import { postData, getData } from "../../api/api";
import ComDateTimeConverter from "../../Components/ComDateConverter/ComDateTimeConverter"
import moment from "moment";

export default function RegisterServiceDetail({ }) {
    const {
        text: { NurseRegisterService },
        setLanguage,
    } = useContext(LanguageContext);

    const navigation = useNavigation();
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState(false);
    const [orderdate, setOrderdate] = useState({});
    const { serviceData, todayOrderDate, elderData } = route.params || {};
    console.log(" elderData", elderData)
    const [isComplete, setIsComplete] = useState(todayOrderDate?.status);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            getData(`/order-date/${todayOrderDate?.id}`, {})
                .then((orderdate) => {
                    setOrderdate(orderdate?.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error("Error getData fetching items:", error);
                });
        }, [isComplete])
    );

    const getStatusText = (status) => {
        switch (status) {
            case 'InComplete':
                return { text: 'Chưa thực hiện', color: 'green' };
            case 'Complete':
                return { text: 'Đã thực hiện', color: '#000' };
            case 'NotPerformed':
                return { text: 'Không có', color: 'red' };
            case 'Missed':
                return { text: 'Đã quá hạn', color: 'red' };
            case 'Processed':
                return { text: 'Đã giải quyết', color: '#000' };
            default:
                return status;
        }
    };

    const onConfirm = () => {
        const formattedData = {
            status: "Complete"
        }
        setLoading(true)
        putData(`/order-date`, todayOrderDate?.id, formattedData, {})
            .then((response) => {
                setLoading(false)
                ComToast({ text: 'Xác nhận thành công' });
                setIsComplete("Complete")
                handleClosePopup()
            })
            .catch((error) => {
                setLoading(false)
                console.error("API Error: ", error);
                handleClosePopup()
                ComToast({ text: 'Có lỗi xảy ra, vui lòng thử lại!' });
            });
    }

    const handleClosePopup = () => {
        setPopup(false);
    };

    return (
        <>
            <ComHeader
                showBackIcon
                showTitle
                title={"Chi tiết dịch vụ"}
            />
            <View style={styles?.body}>
                <Image
                    source={{ uri: serviceData?.imageUrl }}
                    style={{
                        height: 200,
                        objectFit: "fill",
                    }}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles?.content}>
                        <Text style={styles?.title}>{serviceData?.name}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                                Người cao tuổi
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("ElderDetailProfile", { data: elderData })}>
                                <Text>
                                    : {elderData?.name}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                                {NurseRegisterService?.status}
                            </Text>
                            <Text>
                                : {getStatusText(orderdate?.status)?.text}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                                {NurseRegisterService?.implementor}
                            </Text>
                            <Text>
                                : {orderdate?.user?.fullName ? orderdate?.user?.fullName : "Chưa có"}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                                {NurseRegisterService?.time}
                            </Text>
                            <Text>
                                : {orderdate?.completedAt ? ComDateTimeConverter(orderdate?.completedAt) : "Chưa có"}
                            </Text>
                        </View>

                        <Text style={{ fontWeight: "600" }}>{NurseRegisterService?.description}:</Text>
                        <Text>{serviceData?.description}</Text>
                    </View>
                </ScrollView>
                {(isComplete == "InComplete" && moment(todayOrderDate?.date).isSame(moment(), 'day')) && (
                    <View style={styles?.content}>
                        <ComButton onPress={() => { setPopup(true) }} style={{ justifyContent: "center", alignItems: "center" }}>
                            {loading ? <ActivityIndicator color="#fff" /> : NurseRegisterService?.markToComplete}
                        </ComButton>
                    </View>
                )}
            </View>
            <ComPopup
                visible={popup}
                title="Xác nhận đã thực hiện dịch vụ"
                onClose={handleClosePopup}
                buttons={[
                    { text: 'Hủy', onPress: handleClosePopup, check: true },
                    { text: 'Xác nhận', onPress: () => { onConfirm() } },
                ]}
            >
                <Text style={{ textAlign: "center" }}>Bạn xác nhận đã thực hiện dịch vụ này cho người cao tuổi?</Text>
            </ComPopup>
        </>
    )

}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: "#fff",
    },
    title: {
        fontWeight: "600",
        fontSize: 18,
        textAlign: "center",
        marginBottom: 10
    },
    container: {
        flex: 1,
    },
    content: {
        marginVertical: 10,
        gap: 5,
        paddingHorizontal: 20,
    }
})