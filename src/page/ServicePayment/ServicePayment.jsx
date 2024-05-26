import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import servicePayment from "../../../assets/images/service/payment.png";
import { useNavigation } from '@react-navigation/native';

export default function ServicePayment() {
    const [data, setData] = useState({
        id: "54326789",
        servicePrice: 100000,
        serviceName: "Châm cứu bấm huyệt",
        register: "Nguyễn Văn A",
        elder: "Trần Thị B",
        time: ["09/05/2024", "24//05/2024", "25/05/2024"],
        totalMoney: 300000
    });

    const {
        text: { addingPackages },
        setLanguage,
    } = useContext(LanguageContext);

    const route = useRoute();
    const { id } = route.params;
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    const formatCurrency = (number) => {
        // Sử dụng hàm toLocaleString() để định dạng số
        return number.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

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
                        objectFit: "fill",
                    }}
                />
            </View>
            <ScrollView style={styles.body}>
                <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10, textAlign: 'center' }} numberOfLines={2}>
                    {addingPackages?.payment?.title}
                </Text>
                {/* price */}
                <Text style={{ fontSize: 16, marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>
                        {addingPackages?.payment?.billId}
                    </Text>
                    : {data.id}
                </Text>
                {/* category */}
                <Text style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={styles.contentBold}>
                        {addingPackages?.payment?.serviceName}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        : {data?.serviceName}
                    </Text>
                </Text>
                {/* register */}
                <Text style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={styles.contentBold}>
                        {addingPackages?.payment?.registerName}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        : {data?.register}
                    </Text>
                </Text>
                {/* elder */}
                <Text style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={styles.contentBold}>
                        {addingPackages?.payment?.elderName}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        : {data?.elder}
                    </Text>
                </Text>
                {/* time */}
                <Text style={styles.contentBold}>
                    {addingPackages?.payment?.time}:
                </Text>
                {data?.time.map((day, index) => (
                    <Text style={{ fontSize: 16 }} key={index}>
                        - {day}
                    </Text>
                ))}
                {/* total */}
                <Text style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={styles.contentBold}>
                        {addingPackages?.payment?.totalMoney}
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#33B39C" }}>
                        : {formatCurrency(data?.servicePrice)} x {data?.time.length} = {formatCurrency(data?.totalMoney)}
                    </Text>
                </Text>

                <View style={{ marginVertical: 20 }}>
                    <ComSelectButton
                    // onPress={() => {
                    //     navigation.navigate("AddingServiceRegister", { id: data.id });
                    // }}
                    >
                        {addingPackages?.payment?.title}
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
    header:{
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
