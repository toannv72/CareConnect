import React, { useContext, useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ComElder from "./ComElder";
import ComNoData from "../../Components/ComNoData/ComNoData";
import ComHeader from "../../Components/ComHeader/ComHeader";
import RegisterServiceImg from "./RegisterServiceImg.png"
import { postData, getData } from "../../api/api";
import moment from "moment";

export default function RegisterService({ }) {
    const {
        text: { CareSchedule },
        setLanguage,
    } = useContext(LanguageContext);
    const navigation = useNavigation();
    const route = useRoute();
    const roomData = route.params || {};
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const today = moment().format("YYYY-MM-DD");

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            getData(`/care-services?RoomId=${roomData?.roomData?.id}&Date=${today}`, {})
                .then((careServices) => {
                    setData(careServices?.data?.elders);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error("Error getData fetching items:", error);
                });
        }, [])
    );

    return (
        <>
            <ComHeader
                showBackIcon
                showTitle
                title={"Phòng " + roomData?.roomData?.name + " - Khu " + roomData?.roomData?.block?.name}
            />
            <View style={styles.body}>
                <Image
                    source={RegisterServiceImg}
                    style={{
                        height: 200,
                        width: "100%",
                        objectFit: "contain",
                    }}
                />
                {/* nếu k có elder nào       nếu tất cả các elder đều không có order   =>  hiện ComNoData*/}
                {data.length == 0 || data.every(item => item?.orderDetails.length === 0) ? (
                    <ComNoData>Không có dữ liệu</ComNoData>
                ) : (
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => item?.orderDetails.length > 0 && <ComElder data={item} />}
                        keyExtractor={(item, index) => index.toString()}
                        style={{ margin: 10 }}
                    />
                )}
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#fff",
        flex: 1,
    },
})