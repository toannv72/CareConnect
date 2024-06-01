import React, { useContext, useState } from "react";
import { Modal, View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import ComSelectButton from "../../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../../contexts/LanguageContext";
import checkIcon from "../../../../assets/Vector.png"

export default CancelRenewSuccess = ({ visible, title, content, image, buttons, onClose }) => {

    const {
        text: { addingPackages },
        setLanguage,
    } = useContext(LanguageContext);

    const route = useRoute();
    const { id } = route.params;

    const navigation = useNavigation();

    return (
        <View style={styles.body}>
            <Text style={styles.title}>{addingPackages?.renew?.successTitle}</Text>
            <Image source={checkIcon} style={styles.image} />
            <Text style={styles.content}>{addingPackages?.renew?.successContent}</Text>
            <ComSelectButton
                onPress={() => {
                    navigation.navigate("ServiceHistory");
                }}>
                {addingPackages?.renew?.backToHome}
            </ComSelectButton>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#fff",
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#33B39C",
        textAlign: "center"
    },
    content: {
        fontSize: 18,
        textAlign: "center"
    }

})