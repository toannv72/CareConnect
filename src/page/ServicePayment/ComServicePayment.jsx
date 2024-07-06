import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Delete from "../../../assets/Delete.png";
import { useCart } from '../../contexts/CartContext';
import ComPopup from "../../Components/ComPopup/ComPopup";
import Toast from 'react-native-toast-message';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const formatCurrency = (number) => {
    return number?.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    }) ?? '';
};

const ComServicePayment = ({ data, deleteIcon, onCheck }) => {
    if (!data) return null; // Early return if data is undefined or null

    const { servicePackage, contract, quantity, elder, orderDates } = data;
    const { dispatch } = useCart(); // Get dispatch function from CartContext
    const [popup, setPopup] = useState(false);

    const showToast = (type, text1, text2, position) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            position: position
        });
    }
    const handleClosePopup = () => {
        setPopup(false);
    };
    const handleOpenPopup = () => {
        setPopup(true);
    };

    const handleDeleteItem = () => {
        console.log("REMOVE_ITEM")
        dispatch({
            type: 'REMOVE_ITEM',
            payload: {
                servicePackageId: servicePackage?.id,
                elderId: elder?.id
            }
        });
        showToast("success", "Đã xóa dịch vụ thành công", "", "top");
        handleClosePopup()
    };
    return (
        <View style={[styles.row]}>
            {servicePackage && (
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Image
                        source={{ uri: servicePackage.imageUrl }}
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 5,
                            resizeMode: "cover",
                        }}
                    />
                    <View style={{ gap: 3, flex: 1, marginLeft: 10 }}>
                        <View style={{ flexDirection: "row", gap: 5 }}>
                            <Text style={[styles.labelText, { flex: 0.9 }]} numberOfLines={2}>{servicePackage.name}</Text>
                            {deleteIcon && (
                                <TouchableOpacity onPress={handleOpenPopup} style={{ flex: 0.1 }}>
                                    <Image
                                        source={Delete}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            resizeMode: "cover",
                                            tintColor: "red",
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View style={{ gap: 3 }}>
                                <Text style={{ flexDirection: "row" }} numberOfLines={1}>
                                    <Text style={styles.labelText}>Phân loại</Text>
                                    <Text style={styles.contentText}>: Gói dịch vụ</Text>
                                </Text>
                                <Text style={{ flexDirection: "row" }} numberOfLines={1}>
                                    <Text style={styles.labelText}>Người nhận</Text>
                                    <Text>: {elder?.name ?? 'Unknown'}</Text>
                                </Text>
                                <Text style={styles.labelText} >
                                    {formatCurrency(servicePackage.price) + " x " + orderDates.length}
                                </Text>
                            </View>
                            <Text style={styles.labelText}>
                                {formatCurrency(servicePackage.price * orderDates.length)}
                            </Text>
                        </View>
                    </View>

                </View>
            )}
            <ComPopup
                visible={popup}
                title="Bạn có chắc muốn xóa dịch vụ khỏi giỏ hàng?"
                onClose={handleClosePopup}
                buttons={[
                    { text: 'Đóng', onPress: handleClosePopup, check: true },
                    { text: 'Xác nhận', onPress: handleDeleteItem },
                ]}
            />
        </View>
    );
}

export default ComServicePayment;

const styles = StyleSheet.create({
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
