import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import checkIcon from "../../../../assets/Vector.png";

const ComPaymentMethod = ({ name, logo, isSelected, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.paymentMethod}>
                    <View >
                        <Image source={checkIcon}
                            style={{
                                width: 25,
                                height: 25,
                                borderRadius: 5,
                                objectFit: "fill",
                                tintColor: isSelected ? null : "#ddd"
                            }} />
                    </View>
                <View
                    style={{
                        flexDirection: "row", alignItems: 'center',
                        gap: 10,
                    }}>
                    <Image source={logo}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 5,
                            objectFit: "fill",
                        }} />
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>{name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default ComPaymentMethod;

const styles = StyleSheet.create({
    paymentMethod: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10
    }
})

