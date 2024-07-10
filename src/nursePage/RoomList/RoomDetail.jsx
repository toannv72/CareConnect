import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import ComNoData from "../../Components/ComNoData/ComNoData";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from '@react-navigation/native';
import ComElder from "./ComElder";
import ComHeader from "../../Components/ComHeader/ComHeader";

export default function RoomDetail({ data }) {
    const {
        text: { CareSchedule },
        setLanguage,
    } = useContext(LanguageContext);
    const navigation = useNavigation();
    const route = useRoute();
    const selectedRoom = route.params?.roomData || {};
    const [elderData, setElderData] = useState(selectedRoom?.elders)
    return (
        <>
            <ComHeader
                showBackIcon
                showTitle
                title={CareSchedule?.room + " " + selectedRoom?.name + " - " + CareSchedule?.area + " " + selectedRoom?.block?.name}
            />
            <View style={styles.body}>
                {selectedRoom?.elders.length == 0 ? (
                    <ComNoData>Không có dữ liệu</ComNoData>
                ) : (
                    <View>
                        {selectedRoom?.elders?.map((value, index) => (
                            <ComElder key={index} data={value}
                                onPress={() => {
                                    navigation.navigate("NurseElderDetailProfile", { id: value?.id, selectedRoom: selectedRoom });
                                }}
                                style={{ backgroundColor: "rgba(51, 179, 156, 0.26)" }}
                            />
                        ))}
                    </View>
                )}
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