import { useState, useEffect, useRef, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { useNavigation } from "@react-navigation/native";
import roomIcon from "../../../assets/images/Nurse/NurseHomeIcon/Room.png"

export default function ComRoom({ data, color, onPress }) {
    const {
        text: { CareSchedule },
        setLanguage,
    } = useContext(LanguageContext);
    const navigation = useNavigation();
    return (
        <>
            <TouchableOpacity
                style={[styles?.body]}
                source={roomIcon}
                onPress={onPress}
            >
                <View style={{ flexDirection: "column", alignItems: "center", flex: 1 }}>
                    <Text
                        style={[styles?.roomType, { backgroundColor: color }]}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {data?.type}
                    </Text>
                    <View style={[styles?.iconContain, { backgroundColor: color }]}>

                        <Image
                            source={roomIcon}
                            style={styles?.image}
                        />
                    </View>
                </View>
                <View style={{ gap: 5, flex: 3 }}>

                    <View style={{ flexDirection: "row" }} numberOfLines={1} >
                        <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                            {CareSchedule?.room}
                        </Text>
                        <Text style={{ flex: 2 }} numberOfLines={1} ellipsizeMode="tail">: {data?.name}</Text>
                    </View>

                    <View style={{ flexDirection: "row" }} numberOfLines={1} >
                        <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                            {CareSchedule?.capacity}
                        </Text>
                        <Text style={{ flex: 2 }}>: {data?.capacity}</Text>
                    </View>

                    <View style={{ flexDirection: "row" }} numberOfLines={1} >
                        <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                            {CareSchedule?.area}
                        </Text>
                        <Text style={{ flex: 2 }} numberOfLines={1} ellipsizeMode="tail">: {data?.area}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#fff",
        alignItems: "center",
        borderRadius: 10,
        flexDirection: "row",
        padding: 15,
        gap: 15,
        marginVertical: 5,
        borderColor: "#33B39C",
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,

    },
    iconContain: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        width: "70%"
    },
    roomType: {
        width: 75,
        textAlign: "center",
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
        marginBottom: 5
    },
    image: {
        width: 27,
        height: 23,
        borderRadius: 10,
        objectFit: "fill",
        tintColor: "#fff",
    }
})