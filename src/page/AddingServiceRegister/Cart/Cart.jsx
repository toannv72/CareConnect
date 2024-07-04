import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import ComSelectButton from "../../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useNavigation } from '@react-navigation/native';
import ComHeader from "../../../Components/ComHeader/ComHeader";
import ComCart from "./ComCart";
import ComNoData from "../../../Components/ComNoData/ComNoData";
import { useCart } from '../../../contexts/CartContext';

export default function Cart() {
    const { cart } = useCart();
    const [totalPrice, setTotalPrice] = useState(0);
    const navigation = useNavigation();

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = cart?.reduce((sum, item) => {
                return sum + (item?.servicePackage?.price * item?.orderDates?.length);
            }, 0);
            setTotalPrice(total);
        };
        calculateTotalPrice();
    }, [cart]);

    const handleProceedToCheckout = () => {
        navigation.navigate('CheckoutScreen');
    };

    const {
        text: { addingPackages },
    } = useContext(LanguageContext);

    const formatCurrency = (number) => {
        return number?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        }) ?? '';
    };

    return (
        <>
            <ComHeader
                title={addingPackages?.register?.cart}
                showTitle
                showBackIcon
            />
            <View style={styles.container}>
                {cart?.length > 0 ? (
                    <>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                            {cart.map((item, index) => (
                                <ComCart key={index} data={item} />
                            ))}
                        </ScrollView>

                        <View style={[styles.row, { marginVertical: 10 }]}>
                            <Text style={{ fontWeight: "600", fontSize: 16 }}>
                                Tổng tiền
                            </Text>
                            <Text style={{ fontWeight: "600", fontSize: 16 }}>
                                {formatCurrency(totalPrice)}
                            </Text>
                        </View>
                        <ComSelectButton onPress={handleProceedToCheckout}>
                            Thanh toán
                        </ComSelectButton>
                    </>
                ) : (
                    <View style={{gap: 20}}>
                        <ComNoData>Giỏ hàng đang trống</ComNoData>
                        <ComSelectButton onPress={handleProceedToCheckout}>
                            Đi đến danh sách các dịch vụ
                        </ComSelectButton>
                    </View>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: "center"
    },
    emptyCartText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});
