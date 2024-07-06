import React, { useContext, useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import ComSelectButton from "../../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ComHeader from "../../../Components/ComHeader/ComHeader";
import ComCart from "./ComCart";
import ComNoData from "../../../Components/ComNoData/ComNoData";
import { useCart } from '../../../contexts/CartContext';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function Cart() {
    const { cart } = useCart();
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const navigation = useNavigation();
console.log("selectedItems", selectedItems)
    const calculateTotalPrice = (items) => {
        const total = items?.reduce((sum, item) => {
            return sum + (item?.servicePackage?.price * item?.orderDates?.length);
        }, 0);
        setTotalPrice(total);
    };

    useFocusEffect(
        useCallback(() => {
            // Reset selected items and checkboxes when the screen is focused
            setSelectedItems([]);
            if (cart?.length > 0) {
                cart.forEach(item => {
                    item.isSelected = false;
                });
            }
            setSelectAll(false); // Reset "Select All" checkbox when screen is focused
            setTotalPrice(0); // Reset total price when screen is focused
        }, [cart])
    );

    useEffect(() => {
        calculateTotalPrice(selectedItems);
    }, [selectedItems]);

    const handleCheck = (item, isChecked) => {
        item.isSelected = isChecked;
        const updatedItems = [...selectedItems];
        if (isChecked) {
            updatedItems.push(item);
        } else {
            const index = updatedItems.findIndex(selectedItem => selectedItem === item);
            if (index !== -1) {
                updatedItems.splice(index, 1);
            }
        }
        setSelectedItems(updatedItems);
        // Check if all items are selected to toggle "Select All" checkbox
        const allSelected = cart.every(item => selectedItems.includes(item));
        setSelectAll(allSelected);
    };

    const handleSelectAll = () => {
        const updatedItems = cart.map(item => {
            item.isSelected = !selectAll;
            return item;
        });
        setSelectedItems(!selectAll ? updatedItems : []);
        setSelectAll(!selectAll);
    };

    const handleProceedToCheckout = () => {
        navigation.navigate('ServicePayment', { selectedItems });
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
                                <ComCart key={index} data={item}
                                    deleteIcon={true}
                                    onCheck={handleCheck}
                                    isSelected={selectedItems.includes(item)}
                                />
                            ))}
                        </ScrollView>

                        <View>
                            <BouncyCheckbox
                                size={25}
                                isChecked={selectAll}
                                onPress={handleSelectAll}
                                fillColor="#33B39C"
                                textComponent={<Text>  Chọn tất cả</Text>}
                            />
                        </View>

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
                    <View style={{ gap: 20 }}>
                        <ComNoData>Giỏ hàng đang trống</ComNoData>
                        <ComSelectButton onPress={() => navigation.navigate("AddingService")}>
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
