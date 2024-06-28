import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { getData } from "../../../api/api";
import ComHeader from "../../../Components/ComHeader/ComHeader";
import ComButton from "../../../Components/ComButton/ComButton";
import ComTag from "../ComTag";
import ComPaymentMethod from "./ComPaymentMethod";
import ComPaymentInfo from "./ComPaymentInfo";
import ComBillDetail from "./ComBillDetail";
import moment from 'moment';
import billImg from "../../../../assets/bill.png";
import momo from "../../../../assets/momo.png";
import vnpay from "../../../../assets/vnpay.png";
import ComLoading from "../../../Components/ComLoading/ComLoading";

const BillDetail = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true); // Start with loading true

    const { text: { bill } } = useContext(LanguageContext);
    const route = useRoute();
    const { id } = route.params;
    const [selectedMethod, setSelectedMethod] = useState('Momo');

    const handleMethodPress = (methodName) => {
        setSelectedMethod(methodName);
    };

    const formatCurrency = (number) => {
        return number.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    useEffect(() => {
        setLoading(true); // Start loading
        getData(`/orders/${id}`, {})
            .then((order) => {
                setData(order?.data || {});
                setLoading(false); // Stop loading on success
                console.log("BillDetail orders", order?.data);
            })
            .catch((error) => {
                setLoading(false); // Stop loading on error
                console.error("Error fetching order:", error);
            });
    }, [id]); // Include id in dependency array to fetch new data when id changes

    return (
        <>
            <ComHeader
                title={bill?.detail?.title}
                showTitle
                showBackIcon
            />

            {loading ? (
                <ComLoading />
            ) : (
                <ScrollView style={styles.body}>
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
                                <ComBillDetail title={bill?.detail?.paymentDate} content={data?.payDate} />
                                <ComBillDetail title={bill?.detail?.paymentMethod} content={data?.method} />
                            </>
                        )}
                        <View style={{ flexDirection: "row", paddingVertical: 10, justifyContent: "space-between" }}>
                            <Text style={{ fontWeight: "600" }}>{bill?.status}</Text>
                            <ComTag status={data?.status} />
                        </View>
                    </View>

                    <Text style={styles.contentBold}>{bill?.detail?.paymentInfo}</Text>

                    <View style={styles.tableContainer}>
                        {
                            data?.orderDetails.map((detail, index) => (
                                <ComPaymentInfo key={index} data={detail} />
                            ))
                        }
                        <ComBillDetail title={bill?.total} content={formatCurrency(data?.amount)} />
                    </View>

                    {data?.status === "UnPaid" && (
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
                            <ComButton>{bill?.detail?.pay}</ComButton>
                        </>
                    )}
                </ScrollView>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
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
