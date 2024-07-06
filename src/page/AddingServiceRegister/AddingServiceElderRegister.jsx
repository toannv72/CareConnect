import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import ComElder from "../../Components/ComElder/ComElder";
import ComLoading from "../../Components/ComLoading/ComLoading";
import ComNoData from "../../Components/ComNoData/ComNoData";
import { useStorage } from "../../hooks/useLocalStorage";
import { postData, getData } from "../../api/api";
import Toast from 'react-native-toast-message';

export default function AddingServiceElderRegister() {
    const [user] = useStorage("user", {});
    const [selectedElder, setSelectedElder] = useState(null);
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    const { data } = route.params;
    const navigation = useNavigation();
    const [registeredDates, setRegisteredDates] = useState([]);
    const { text: { addingPackages } } = useContext(LanguageContext);

    const showToast = (type, text1, text2, position) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            position: position
        });
    }

    const formatCurrency = (number) => {
        if (number) {
            return number.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            });
        } else { return null; }
    };
    const handleElderPress = (elder) => {
        setSelectedElder(elder);
    };

    const onpressPayment = () => {
        setLoading(!loading);
        getData(`/order-detail?ElderId=${selectedElder?.id}&ServicePackageId=${data?.id}`, {})
            .then((orderDetail) => {
                setLoading(loading);
                if (orderDetail?.data?.length > 0)
                    showToast('error', 'Dịch vụ đã được đăng ký', 'Dịch vụ này đã được đăng ký cho người cao tuổi bạn chọn', 'top')
                else
                    navigation.navigate("ServicePayment", { servicePackage: data, elder: selectedElder, orderDates: data?.eventDate, type: 'One_Time' });
            })
            .catch((error) => {
                setLoading(loading);
                console.error("Error getData fetching orderDetail items:", error);
            });
    }

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
                    <Image source={backArrowWhite} style={styles.backIcon} />
                </TouchableOpacity>
                <Image source={{ uri: data?.imageUrl }} style={{ height: 200, objectFit: "fill" }} />
            </View>
            <View style={styles.body}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false} >
                    <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }} numberOfLines={2}>
                        {data?.name}
                    </Text>
                    <Text style={{ fontSize: 16, marginBottom: 10 }}>
                        <Text style={{ fontWeight: "bold" }}>
                            {formatCurrency(data?.price)}
                        </Text>
                        /{addingPackages?.package?.time}
                    </Text>
                    <Text style={{ flexDirection: "row", marginBottom: 10 }}>
                        <Text style={styles.contentBold}>
                            {addingPackages?.package?.category}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            :  {data?.servicePackageCategory?.name}
                        </Text>
                    </Text>
                    <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
                        {addingPackages?.register?.registerElder}
                    </Text>
                    <ComLoading show={loading}>
                        {user?.elders?.length > 0 ? (
                            <View>
                                {user?.elders?.map((value, index) => (
                                    <ComElder key={index} data={value}
                                        onPress={() => handleElderPress(value)}
                                        isSelected={selectedElder?.id === value.id}
                                    />))}
                            </View>
                        ) : (<ComNoData>Hiện tại đang không có người cao tuổi nào</ComNoData>)}
                    </ComLoading>
                </ScrollView>
                {data?.type === "OneDay" ? (
                    <ComSelectButton
                        disable={!selectedElder}
                        onPress={() => onpressPayment()}>
                        Thanh toán ngay
                    </ComSelectButton>
                ) : (<ComSelectButton
                    disable={selectedElder?.length === 0}
                    onPress={() => {
                        if (data?.type === "MultipleDays") {
                            navigation.navigate("ServiceDayRegister", { elder: selectedElder, data: data });
                        } else if (data?.type === "AnyDay") {
                            navigation.navigate("ServiceAnydayRegister", { elder: selectedElder, data: data });
                        } else if (data?.type === "WeeklyDays") {
                            navigation.navigate("AddingServiceCalendarRegister", { elder: selectedElder, data: data });
                        }
                    }}> Tiếp tục </ComSelectButton>)
                }
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
});
