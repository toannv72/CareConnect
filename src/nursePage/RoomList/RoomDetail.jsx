import React, { useContext, useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import ComNoData from "../../Components/ComNoData/ComNoData";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import ComElder from "./ComElder";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { postData, getData } from "../../api/api";
import ComLoading from "../../Components/ComLoading/ComLoading";

export default function RoomDetail({ data }) {
    const {
        text: { CareSchedule },
        setLanguage,
    } = useContext(LanguageContext);
    const navigation = useNavigation();
    const route = useRoute();
    const selectedRoom = route.params?.roomData || {};
    const [elderData, setElderData] = useState([])
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            getData(`/elders?RoomId=${selectedRoom?.id}`, {})
                .then((elders) => {
                    const validElder = elders?.data?.contends?.filter(elder => elder?.isContractActive == true)
                    setElderData(validElder);
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
                title={CareSchedule?.room + " " + selectedRoom?.name + " - " + CareSchedule?.area + " " + selectedRoom?.block?.name}
            />
            <View style={styles.body}>
                <ComLoading show={loading}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                        {elderData?.length == 0 ? (
                            <ComNoData>Không có dữ liệu</ComNoData>
                        ) : (
                            <View>
                                {elderData?.map((value, index) => (
                                    <ComElder key={index} data={value}
                                        onPress={() => {
                                            navigation.navigate("NurseElderDetailProfile", { id: value?.id, selectedRoom: selectedRoom });
                                        }}
                                        style={{ backgroundColor: "rgba(51, 179, 156, 0.26)" }}
                                    />
                                ))}
                            </View>
                        )}
                    </ScrollView>
                </ComLoading>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
    },
})