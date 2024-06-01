import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";

export default function ComTag({text,  paid }) {
    return (
        <View >
            {paid  ? (
                <View style={{ borderWidth: 1, borderColor: "#33B39C", marginTop: 5, borderRadius: 10}}>
                    <Text style={{ color: "#33B39C", fontSize: 14, paddingHorizontal: 5 }}>{text}</Text>

                </View>) : (
                <View style={{ borderWidth: 1, borderColor: "red", marginTop: 5, borderRadius: 10}}>
                    <Text style={{ color: 'red', fontSize: 14, paddingHorizontal: 5 }}>{text}</Text>
                </View>
            )}
        </View>

    )

}

const styles = StyleSheet.create({
    body: {}
})