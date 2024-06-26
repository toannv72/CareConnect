import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from '@react-navigation/native';
import { postData, getData } from "../../api/api";

export default function AddingServiceDetail() {

    const {
        text: { addingPackages },
        setLanguage,
    } = useContext(LanguageContext);

    const route = useRoute();
    const { id } = route.params;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});

    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    const formatCurrency = (number) => {
        if (number) {
            // Sử dụng hàm toLocaleString() để định dạng số
            return number.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            });
        } else {
            return null; // or any default value you want to return
        }
    };

    useEffect(() => {
        // Lấy danh sách sản phẩm
        getData(`/service-package/${id}`, {})
            .then((packageData) => {
                setData(packageData?.data);
            })
            .catch((error) => {
                console.error("Error fetching service-package:", error);
            });
    }, [])

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backIconContainer}>
                    <Image
                        source={backArrowWhite}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Image
                    source={{ uri: data?.imageUrl }}
                    style={{
                        height: 250,
                        objectFit: "fill",
                    }}
                />
            </View>

            <View style={styles.body}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }} numberOfLines={2}>
                        {data?.name}
                    </Text>
                    {/* price */}
                    <Text style={{ fontSize: 16, marginBottom: 10 }}>
                        <Text style={{ fontWeight: "bold" }}>
                            {formatCurrency(data?.price)}
                        </Text>
                        /{addingPackages?.package?.month}
                    </Text>
                    {/* category */}
                    <Text style={{ flexDirection: "row", marginBottom: 10 }}>
                        <Text style={styles.contentBold}>
                            {addingPackages?.package?.category}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            : {data?.servicePackageCategory?.name}
                        </Text>
                    </Text>

                    {data?.registrationLimit !== 0 && (
                        <Text style={{ flexDirection: "row", marginBottom: 10 }}>
                            <Text style={styles.contentBold}>
                                {addingPackages?.package?.registrationLimit}
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                : {data?.registrationLimit}
                            </Text>
                            / {addingPackages?.package?.time}
                        </Text>
                    )}

                    {data?.timeBetweenServices !== 0 && (
                        <Text style={{ flexDirection: "row", marginBottom: 10 }}>
                            <Text style={styles.contentBold}>
                                {addingPackages?.package?.timeBetweenServices}
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                : {data?.timeBetweenServices}
                            </Text>
                            {" " + addingPackages?.package?.people}
                        </Text>
                    )}
                    {/* mô tả */}
                    <Text style={styles.contentBold}>
                        {addingPackages?.package?.description}
                    </Text>
                    <Text style={{ fontSize: 16 }}>{data?.description}</Text>
                </ScrollView>
                <View style={{ marginVertical: 20 }}>
                    <ComSelectButton
                        onPress={() => {
                            navigation.navigate("AddingServiceRegister", { data: data });
                        }}>
                        {addingPackages?.register?.registerTitle}
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
});
