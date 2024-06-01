import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View, ScrollView, } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import billImg from "../../../assets/bill.png";
import momo from "../../../assets/momo.png";
import vnpay from "../../../assets/vnpay.png";
import { useRoute } from "@react-navigation/native";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComButton from "../../Components/ComButton/ComButton";
import ComTag from "./ComTag";
import ComPaymentMethod from "./ComPaymentMethod";
import ComBillDetail from "./ComBillDetail";

export default function BillDetail() {
    const [data, setData] = useState({
        billId: "987654321",
        contractID: "12345432",
        customer: "Nguyễn Văn B",
        elder: "Nguyễn Văn A",
        dueDate: "09/05/2024",
        payDate: "05/05/2024",
        title: "Hóa đơn tháng 10 hợp đồng số #12345432",
        service: "Gói cơ bản",
        totalMoney: 15000000,
        status: "Chưa thanh toán",
        paymentMethod: "Momo"
    });

    const {
        text: { bill },
        setLanguage,
    } = useContext(LanguageContext);

    const route = useRoute();
    const { id } = route.params;

    const [selectedMethod, setSelectedMethod] = useState('Momo');

    const handleMethodPress = (methodName) => {
        setSelectedMethod(methodName);
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
            <ComHeader
                title={bill?.detail?.title}
                showTitle
                showBackIcon
            ></ComHeader>
            <View style={styles.body}>
                <ScrollView  >
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Image
                            source={billImg}
                            style={{
                                height: 150,
                                width: 100,
                                objectFit: "fill",
                            }} />
                    </View>

                    <Text style={styles.contentBold}>{bill?.detail?.customerInfo}</Text>
                    <View style={styles.tableContainer}>

                        <ComBillDetail title={bill?.title} content={data?.title}></ComBillDetail>
                        <ComBillDetail title={bill?.billId} content={data?.billId}></ComBillDetail>
                        <ComBillDetail title={bill?.detail?.contractId} content={data?.contractID}></ComBillDetail>
                        <ComBillDetail title={bill?.detail?.customer} content={data?.customer}></ComBillDetail>
                        <ComBillDetail title={bill?.elder} content={data?.elder}></ComBillDetail>
                        <ComBillDetail title={bill?.dueDate} content={data?.dueDate}></ComBillDetail>
                        <ComBillDetail title={bill?.status} content={<ComTag text={data?.status} paid={data?.status === "Đã thanh toán" ? true : false}></ComTag>}></ComBillDetail>

                        {
                            data?.status === "Đã thanh toán" && (
                                <>
                                    <ComBillDetail title={bill?.detail?.paymentDate} content={data?.payDate} />
                                    <ComBillDetail title={bill?.detail?.paymentMethod} content={data?.paymentMethod} />
                                </>
                            )
                        }
                    </View>

                    <Text style={styles.contentBold}>{bill?.detail?.paymentInfo}</Text>

                    <View style={styles.tableContainer}>
                        <ComBillDetail title={bill?.detail?.totalMoney} content={formatCurrency(data?.totalMoney)} />
                    </View>
                    {data?.status === "Chưa thanh toán" && (
                        <>
                            <Text style={styles.contentBold}>{bill?.detail?.paymentMethod}</Text>
                            <View style={styles.tableContainer}>
                                <ComPaymentMethod
                                    name="Momo"
                                    logo={momo}
                                    isSelected={selectedMethod === 'Momo'}
                                    onPress={() => handleMethodPress('Momo')}
                                />

                                <ComPaymentMethod
                                    name="VnPay"
                                    logo={vnpay}
                                    isSelected={selectedMethod === 'VnPay'}
                                    onPress={() => handleMethodPress('VnPay')}
                                />
                            </View>
                        </>
                    )}

                    {data?.status === "Chưa thanh toán" && (
                        <ComButton> {bill?.detail?.pay}</ComButton>
                    )}
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
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
        paddingHorizontal: 20,
        marginBottom: 10
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'space-between',
        flexWrap: "wrap",
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 10,
        alignItems: 'center'
    },
    labelText: {
        fontWeight: '600'
    },
    contentText: {
        width: '50%',
        textAlign: "right"
    }
});
