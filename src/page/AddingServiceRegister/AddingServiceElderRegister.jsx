import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from '@react-navigation/native';
import ComElder from "../../Components/ComElder/ComElder";
import ComLoading from "../../Components/ComLoading/ComLoading";
import ComNoData from "../../Components/ComNoData/ComNoData";
import Nodata from "../../../assets/Nodata.png";
import { useStorage } from "../../hooks/useLocalStorage";

export default function AddingServiceElderRegister() {
    const [user, setUser] = useStorage("user", {});
    const [selectedElderId, setSelectedElderId] = useState(null);
    const [loading, setLoading] = useState(false);

    const {
        text: { addingPackages },
        setLanguage,
    } = useContext(LanguageContext);

    const route = useRoute();
    const { data } = route.params;


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

    const handleElderPress = (id) => {
        setSelectedElderId(id);
    };

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
                            :  {data?.servicePackageCategory?.name}
                        </Text>
                    </Text>

                    <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
                        {addingPackages?.register?.registerElder}
                    </Text>

                    <ComLoading show={loading}>
                        {user?.elders?.length > 0 ? (
                            <>
                                <View>
                                    {user?.elders?.map((value, index) => (
                                        <ComElder key={index} data={value}
                                            onPress={() => handleElderPress(value.id)}
                                            isSelected={selectedElderId === value.id}
                                        />
                                    ))}
                                </View>
                                <View style={{ height: 120 }}></View>
                            </>
                        ) : (
                           <ComNoData>Hiện tại đang không có người cao tuổi nào</ComNoData>
                        )}
                    </ComLoading>

                </ScrollView>
                <View style={{ marginVertical: 20 }}>
                    <ComSelectButton
                        disable={selectedElderId ? false : true}
                        onPress={() => {
                            navigation.navigate("AddingServiceCalendarRegister", { id: selectedElderId, data: data });
                        }}>
                        Tiếp tục
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