import React, { useContext } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LanguageContext } from "../../../contexts/LanguageContext";

export default function ComCatalogue({ img, url, children, color, backgroundColor, title, content }) {
    const {
        text: { Home },
    } = useContext(LanguageContext);
    return (
                <View style={[styles?.body, { backgroundColor: backgroundColor }]}>
                    <View style={styles?.iconContain}>
                        <Image
                            source={url}
                            style={{
                                width: 25,
                                height: 25,
                                borderRadius: 10,
                                objectFit: "fill",
                                tintColor: color,
                                padding: 5
                            }}
                        />
                    </View>

                    <Text style={[styles?.textTitle, { color: color }]} numberOfLines={2} ellipsizeMode="tail">{title}</Text>
                    <Text style={[styles?.textContent, { color: color }]}>{content}</Text>
                </View>

    );
}
const styles = StyleSheet.create({
    body: {
        padding: 15,
        gap: 5,
        borderRadius: 20,
        height: 150,
        width: "100%"
    },
    textTitle: {
        fontSize: 16,
        fontWeight: "600",
        textAlign: "left",
    },
    textContent: {
        color: "#000",
        fontSize: 14,
        textAlign: "left",
    },
    iconContain: {
        backgroundColor: "white",
        padding: 10,
        width: "32%",
        borderRadius: 100,
        alignItems: 'left',
    }
});
