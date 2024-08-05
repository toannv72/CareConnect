import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import taskIcon from "../../../assets/images/Nurse/CareSchedule/task.png"
import timeIcon from "../../../assets/images/Nurse/CareSchedule/time.png"

export default function ComSchedule({ data, shift, onPress, isSelected }) {
    const {
        text: { CareSchedule },
        setLanguage,
    } = useContext(LanguageContext);
    const navigation = useNavigation();

    const formatTime = (time) => {
        const [hour, minute] = time.split(":");
        return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
      };

    return (
        <>
            <TouchableOpacity
                style={[styles?.body, isSelected && styles?.selectedBody]}
                onPress={onPress}
            >
                <Image
                    source={taskIcon}
                    style={styles?.taskImage}
                />
                <View style={styles?.container}>
                    <Text style={styles?.taskTitle}
                        numberOfLines={2}
                        ellipsizeMode='tail'>
                        {CareSchedule?.room} {data?.name} -  {CareSchedule?.area} {data?.block?.name}
                    </Text>
                    {shift?.map((item, index) => (
                        <View key={index} style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image
                                source={timeIcon}
                                style={styles?.clockImage}
                            />
                            <Text style={{ fontSize: 14 }}>Từ {formatTime(item?.startTime)} đến {formatTime(item?.endTime)}</Text>
                        </View>

                    ))}

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
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        marginVertical: 5,
        flex: 5
    },
    taskImage: {
        width: 60,
        height: 65,
        objectFit: "fill",
        backgroundColor: "#14A499",
        flex: 1
    },
    clockImage: {
        width: 25,
        height: 25,
        objectFit: "fill",
        marginRight: 5
    },
    taskTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 7
    }
})