import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import { FavoriteContext } from "../../contexts/FavoriteContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from '@react-navigation/native';
import { postData, getData } from "../../api/api";
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter";
import Heart from "../../../assets/heart.png";
import moment from "moment";

export default function AddingServiceDetail() {
    const {
        text: { addingPackages },
        setLanguage,
    } = useContext(LanguageContext);
    const { favorites, toggleFavorite } = useContext(FavoriteContext);
    const route = useRoute();
    const { id } = route.params;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigation = useNavigation();
    const handleBackPress = () => { navigation.goBack() };

    const formatCurrency = (number) => {
        return number?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        }) ?? '';
    };

    useEffect(() => {
        setLoading(true)
        getData(`/service-package/${id}`, {})
            .then((packageData) => {
                setData(packageData?.data);
                // check tổng lượt đăng ký
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                console.log("Error fetching service-package:", error);
            });
    }, [])

    const isFavorite = favorites.some(item => item.id === data?.id);

    const isValidService = (service) => {//check service hợp lệ thì mở đăng ký
        const validStatus = service?.state === "Active"; // Check trạng thái còn tồn tại hay không
        const endRegistrationDate = moment(service?.endRegistrationDate);
        const hasNotExpired = service?.type == "OneDay" ? moment().isSameOrBefore(endRegistrationDate, "day") : true;
        const hasSlotsLeft = service?.type == "OneDay" ? service?.registrationLimit !== 0 ? service?.totalOrder < service?.registrationLimit : service?.totalOrder >= service?.registrationLimit : true;
        return validStatus && hasNotExpired && hasSlotsLeft;
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
                        height: 250,
                        objectFit: "fill",
                    }}
                />
            </View>

            <View style={styles.body}>
                <View style={{ flex: 1, gap: 10, backgroundColor: "#ECECEE", borderRadius: 20 }}>
                    <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-between" }}>
                        <View style={{ padding: 10, backgroundColor: "#33B39C", justifyContent: "center", borderTopRightRadius: 50, borderBottomRightRadius: 50, width: "45%" }}>
                            <Text style={{ fontSize: 16, color: "#fff", fontWeight: "600", paddingLeft: 5 }} numberOfLines={1}>
                                {data?.servicePackageCategory?.name}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => toggleFavorite(data)}
                            style={[{ backgroundColor: isFavorite ? "#fac8d2" : "#bdbbbb", justifyContent: "center", padding: 10, borderRadius: 50, marginRight: 25 }]}>
                            <Image source={Heart}
                                style={{ width: 25, height: 25, tintColor: isFavorite ? "red" : "#636360" }} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                        <View style={{ paddingHorizontal: 20, paddingBottom: 20, gap: 10 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}>
                                {data?.name}
                            </Text>
                            {/* price */}
                            <Text style={{ fontSize: 16 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                                    {formatCurrency(data?.price)}
                                </Text>
                                /{addingPackages?.package?.time}
                            </Text>

                            {data?.registrationLimit !== 0 && (//có giới hạn người đăng ký
                                <Text style={{ flexDirection: "row" }}>
                                    <Text style={styles.contentBold}>
                                        {addingPackages?.package?.registrationLimit}
                                    </Text>
                                    <Text style={{ fontSize: 16 }}>
                                        : {data?.registrationLimit} {addingPackages?.package?.people}
                                    </Text>
                                </Text>
                            )}

                            {
                                data?.type == "OneDay" && (
                                    <View style={{ gap: 10 }}>
                                        {data?.endRegistrationDate && (
                                            <Text style={{ flexDirection: "row" }}>
                                                <Text style={{ fontWeight: "600", fontSize: 16 }}>
                                                    {addingPackages?.package?.endRegistrationStartDate}
                                                </Text>
                                                <Text>
                                                    : <ComDateConverter>{data?.endRegistrationDate}</ComDateConverter>
                                                </Text>
                                            </Text>)
                                        }
                                        {data?.eventDate && (
                                            <Text style={{ flexDirection: "row" }}>
                                                <Text style={{ fontWeight: "600", fontSize: 16 }}>
                                                    {addingPackages?.package?.eventDate}
                                                </Text>
                                                <Text>
                                                    : <ComDateConverter>{data?.eventDate}</ComDateConverter>
                                                </Text>
                                            </Text>)
                                        }
                                    </View>
                                )
                            }
                            {/* mô tả */}
                            {/* <Text style={{ fontWeight: "600", fontSize: 16 }}>
                                {addingPackages?.package?.description}
                            </Text> */}
                            <Text style={{ fontSize: 16 }}>{data?.description}</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <ComSelectButton onPress={() => { navigation.navigate("AddingServiceRegister", { data: data }) }}
                        disable={!isValidService(data)}>
                        {addingPackages?.register?.registerTitle}
                    </ComSelectButton>
                </View>
            </View >
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
        // paddingTop: 25,
        backgroundColor: "#fff",
    },
    contentBold: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "600"
    },
    backIconContainer: {
        position: 'absolute',
        zIndex: 100,
        marginTop: 10,
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
