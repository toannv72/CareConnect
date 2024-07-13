import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";

const ComBillDetail = ({ title, content }) => {
    return (
        <View style={styles.row}>
            <Text style={styles.labelText}>
                {title}
            </Text>
            <Text style={styles.contentText}>
                {content}
            </Text>
        </View>
    )
}
export default ComBillDetail;

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'space-between',
        flexWrap: "wrap",
        borderTopWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 10,
        alignItems: 'center'
    },
    labelText: {
        fontWeight: '600',
        flex: 0.45,
    },
    contentText: {
        textAlign: "right",
        flex: 0.55,
        flexWrap: "wrap",
    }
})