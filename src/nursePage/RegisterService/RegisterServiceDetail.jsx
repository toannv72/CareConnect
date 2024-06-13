import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComButton from "../../Components/ComButton/ComButton";

export default function RegisterServiceDetail({ }) {
    const {
        text: { NurseRegisterService },
        setLanguage,
    } = useContext(LanguageContext);

    const navigation = useNavigation();
    const route = useRoute();
    const serviceData = route.params?.service || {};
    console.log("serviceData", serviceData)

    return (
        <>
            <ComHeader
                showBackIcon
                showTitle
                title={"Chi tiết dịch vụ"}
            />
            <View style={styles?.body}>
                <Image
                    source={{ uri: serviceData?.img }}
                    style={{
                        height: 200,
                        objectFit: "fill",
                    }}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >

                    <View style={styles?.content}>
                        <Text style={styles?.title}>{serviceData?.title}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                                {NurseRegisterService?.status}
                            </Text>
                            <Text>
                                : {serviceData?.status}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                                {NurseRegisterService?.implementor}
                            </Text>
                            <Text>
                                : {serviceData?.implementor ? serviceData?.implementor : "Chưa có"}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                                {NurseRegisterService?.time}
                            </Text>
                            <Text>
                                : {serviceData?.time ? serviceData?.time : "Chưa có"}
                            </Text>
                        </View>
                        <Text style={{ fontWeight: "600" }}>{NurseRegisterService?.description}:</Text>
                        <Text>{serviceData?.description}</Text>
                    </View>
                </ScrollView>

                {serviceData?.status == "Chưa thực hiện" && (
                <View style={styles?.content}>
                    <ComButton
                        // onPress={() => navigation.navigate("CreateHealthMonitor", { selectedIndexs: selectedHealthIndexItems })}
                        >
                        {NurseRegisterService?.markToComplete}
                    </ComButton>
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
    },
    title: {
        fontWeight: "600",
        fontSize: 18,
        textAlign: "center"
    },
    container: {
        flex: 1,
    },
    content: {
        marginVertical: 20,
        gap: 5,
        paddingHorizontal: 20,
    }
})