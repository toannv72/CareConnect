import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import taskIcon from "../../../assets/Nurse/CareSchedule/task.png"
import timeIcon from "../../../assets/Nurse/CareSchedule/time.png"

export default function ComSchedule({ data, onPress, isSelected }) {
    const {
        text: { CareSchedule },
        setLanguage,
    } = useContext(LanguageContext);
    const navigation = useNavigation();

    return (
        <>
            <TouchableOpacity
                style={[styles?.body, isSelected && styles?.selectedBody]}
                onPress={onPress}
            >
                <Image
                    source={taskIcon}
                    style={{
                        width: 60,
                        height: 60,
                        objectFit: "fill",
                        backgroundColor: "#14A499"
                    }}
                />
                <View style={styles?.container}>
                    <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 7 }}>
                        {CareSchedule?.room} {data?.roomId} -  {CareSchedule?.area} {data?.areaId}
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            source={timeIcon}
                            style={{
                                width: 25,
                                height: 25,
                                objectFit: "fill",
                                marginRight: 5
                            }}
                        />
                        <Text style={{ fontSize: 14}}>{data?.time}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 10,
    },
    container:{
        marginVertical: 5
    }
})