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
import { useCart } from '../../contexts/CartContext';
import Toast from 'react-native-toast-message';

export default function AddingServiceElderRegister() {
    const [user] = useStorage("user", {});
    const [selectedElderId, setSelectedElderId] = useState(null);
    const [selectedElder, setSelectedElder] = useState({});
    const [loading] = useState(false);
    const route = useRoute();
    const { data } = route.params;
    const navigation = useNavigation();
    const { dispatch, cart } = useCart();

    const showToast = (type, text1, text2, position) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            position: position
        });
    }

    const addToCart = () => {
        console.log("Đã add to cart");
        if (checkDuplicateCartItem()) {
            showToast("error", "Đã đăng ký", "Dịch vụ này đã được đăng ký cho người cao tuổi", "bottom");
        } else {
            dispatch({
                type: 'ADD_ITEM', payload: {
                    "notes": "string",
                    "servicePackageId": data?.id,
                    "servicePackage": data,
                    "elder": selectedElder,
                    "elderId": selectedElderId,
                    "orderDates": [
                        {
                            "date": data?.eventDate
                        }
                    ]
                }
            });
            showToast("success", "Thêm vào giỏ hàng thành công", "", "bottom");
        }
    };

    const checkDuplicateCartItem = () => {
        return cart.some(item => item.elderId === selectedElderId && item.servicePackageId === data?.id);
    };

    const {
        text: { addingPackages },
    } = useContext(LanguageContext);

    const formatCurrency = (number) => {
        if (number) {
            return number.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            });
        } else {
            return null;
        }
    };

    const handleElderPress = (elder) => {
        setSelectedElderId(elder?.id);
        setSelectedElder(elder);
    };

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
                    <Image
                        source={backArrowWhite}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Image
                    source={{ uri: data?.imageUrl }}
                    style={{
                        height: 200,
                        objectFit: "fill",
                    }}
                />
            </View>
            <View style={styles.body}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }} numberOfLines={2}>
                        {data?.name}
                    </Text>
                    <Text style={{ fontSize: 16, marginBottom: 10 }}>
                        <Text style={{ fontWeight: "bold" }}>
                            {formatCurrency(data?.price)}
                        </Text>
                        /{addingPackages?.package?.month}
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
                                            isSelected={selectedElderId === value.id}
                                        />
                                    ))}
                                    <View style={{ height: 120 }}></View>
                                </View>
                        ) : (
                            <ComNoData>Hiện tại đang không có người cao tuổi nào</ComNoData>
                        )}
                    </ComLoading>
                </ScrollView>
                <View style={{ marginVertical: 20 }}>
                    <ComSelectButton
                        disable={!selectedElderId}
                        onPress={() => {
                            if (data?.type === "OneDay") {
                                addToCart(); //nếu là service OneDay => không chọn ngày
                            } else {//nếu là service khác => chọn ngày
                                navigation.navigate("AddingServiceCalendarRegister", { id: selectedElderId, data: data });
                            }
                        }}>
                        {data?.type === "OneDay" ? "Thêm vào giỏ hàng" : "Tiếp tục"}
                    </ComSelectButton>
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
    noDataContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    noDataImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
});
