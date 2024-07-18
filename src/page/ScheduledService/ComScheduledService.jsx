import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
// import Delete from "../../../../assets/Delete.png";
import { useCart } from '../../contexts/CartContext';
import ComPopup from "../../Components/ComPopup/ComPopup";
import Toast from 'react-native-toast-message';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import UpIcon from "../../../assets/images/Nurse/RegisterService/UpIcon.png"
import DownIcon from "../../../assets/images/Nurse/RegisterService/DownIcon.png"
import Order from "../../../assets/Order_fill.png"
import User from "../../../assets/User_fill.png"
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter"

const formatCurrency = (number) => {
    return number?.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    }) ?? '';
};

const ComScheduledService = ({ data, hideCheck, onCheck, isSelected }) => {
    if (!data) return null; // Early return if data is undefined or null
    const servicePackage = data?.servicePackage;
    const elder = data?.elder;
    const scheduledTimes = data?.scheduledTimes;
    const [internalSelected, setInternalSelected] = useState(isSelected); // State to manage checkbox state
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        setInternalSelected(isSelected);
    }, [isSelected]);

    const showToast = (type, text1, text2, position) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            position: position
        });
    };

    return (
        <View style={{ marginBottom: 10 }}>
            <View style={[styles.row, isExpanded && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }]}>
                {servicePackage && (
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <BouncyCheckbox
                            isChecked={isSelected}
                            fillColor="#33B39C"
                            unFillColor="#FFFFFF"
                            iconStyle={hideCheck ? { width: 0, height: 0, opacity: 0 } : {}}
                            onPress={hideCheck ? () => setIsExpanded(!isExpanded) : (isChecked) => onCheck(data, isChecked)}
                            textComponent={
                                <>
                                    <Image
                                        source={{ uri: servicePackage.imageUrl }}
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 5,
                                            resizeMode: "cover",
                                            marginLeft: 10
                                        }}
                                    />
                                    <View style={{ gap: 3, flex: 1, marginLeft: 10 }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={[styles.labelText, styles.expandedText, { flex: 0.9 }]} numberOfLines={2}>{servicePackage.name}</Text>
                                            <TouchableOpacity
                                                style={styles.expandButton}
                                                onPress={() => setIsExpanded(!isExpanded)}
                                            >
                                                <Image
                                                    source={isExpanded ? UpIcon : DownIcon}
                                                    style={[styles.icon, { borderColor: data?.isWarning == true ? "#fa6180" : "#33B39C" }]} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <View style={{ gap: 3, flex: 0.9 }}>

                                                <View style={{ flexDirection: "row", alignItems: "center" }} numberOfLines={1}>
                                                    <Image
                                                        source={User}
                                                        style={[{
                                                            width: 20,
                                                            height: 20,
                                                            tintColor: "#33B39C"
                                                        }]} />
                                                    <Text> {elder?.name ?? 'Unknown'}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }} numberOfLines={1}>
                                                    <Image
                                                        source={Order}
                                                        style={[{
                                                            width: 20,
                                                            height: 20,
                                                            tintColor: "#33B39C",
                                                        }]} />
                                                    <Text style={[styles.labelText]} >
                                                        {formatCurrency(servicePackage.price) + " x " + scheduledTimes.length}
                                                    </Text>
                                                </View>
                                            </View>
                                            <Text style={styles.labelText}>
                                                {formatCurrency(servicePackage.price * scheduledTimes.length)}
                                            </Text>
                                        </View>

                                    </View>
                                </>
                            }
                        />

                    </View>
                )}
            </View>
            {isExpanded && (
                <View style={[styles.expandedView, styles.body,
                ]}>
                    <Text style={[styles.expandedText, { fontWeight: "bold" }]}>Dịch vụ sẽ thực hiện vào những ngày:</Text>
                    {scheduledTimes.map((detail, detailindex) => (
                        <Text key={detailindex} style={styles.expandedText}>• <ComDateConverter>{detail?.date}</ComDateConverter></Text>
                    ))}
                </View>
            )}
        </View>
    );
}

export default ComScheduledService;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        borderBottomWidth: 1,
        borderColor: '#33B39C',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: "#caece6",
    },
    labelText: {
        fontWeight: '600'
    },
    contentText: {
        flex: 1,
        textAlign: "right"
    },
    icon: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 50,
        padding: 10,
        backgroundColor: '#000',
    },
    expandedView: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        backgroundColor: '#fff',
        borderColor: '#33B39C',
        gap: 3
    },
    expandedText: {
        fontSize: 16,
    },
    collapseDivision: {
        borderTopWidth: 1,
        paddingTop: 10,
        marginTop: 10,
        borderTopColor: "#33B39C"
    },
    body: {
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
    },
});
