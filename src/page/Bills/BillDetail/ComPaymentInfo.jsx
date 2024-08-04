import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import UpIcon from ".../../../../assets/images/Nurse/RegisterService/UpIcon.png"
import DownIcon from "../../../../assets/images/Nurse/RegisterService/DownIcon.png"
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter"

const formatCurrency = (number) => {
    return number?.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    }) ?? '';
};

const ComPaymentInfo = ({ data, createdAt }) => {
    if (!data) return null; // Early return if data is undefined or null

    const { servicePackage, contract, price, elder, orderDates } = data;
    const [isExpanded, setIsExpanded] = useState(false);
    const filteredOrderDates = orderDates?.filter(detail => {
        const orderDate = new Date(detail?.date);
        const createdDate = new Date(createdAt);
        return orderDate > createdDate;
    });
    const currentPrice = price/filteredOrderDates?.length // giá lúc mua
            // tổng tiền mỗi dv    /   tổng số ngày > createAt 
    return (
        <TouchableOpacity
            onPress={() => setIsExpanded(!isExpanded)}
        >
            <View style={[styles.row]}>
                {servicePackage && (
                    <>
                        <Image
                            source={{ uri: servicePackage.imageUrl }}
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 5,
                                resizeMode: "cover",
                            }}
                        />
                        <View style={{ gap: 6, flex: 1 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 3 }}>
                                <Text style={[styles.labelText, {flex: 8, lineHeight: 20}]}>{servicePackage.name}</Text>
                                <TouchableOpacity
                                    style={[styles.expandButton, {flex: 1}]}
                                    onPress={() => setIsExpanded(!isExpanded)}
                                >
                                    <Image
                                        source={isExpanded ? UpIcon : DownIcon}
                                        style={[styles.icon]} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap : 5 }}>
                                <View style={{flex: 0.75}}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                                        <Text style={styles.labelText}>Người cao tuổi:</Text>
                                        <Text>{elder?.name ?? 'Unknown'}</Text>
                                    </View>
                                    <Text style={styles.labelText} >
                                        {formatCurrency(currentPrice) + " x " + filteredOrderDates?.length}
                                    </Text>
                                </View>
                                <Text style={[styles.contentText, {flex: 0.25}]}>
                                    {formatCurrency(currentPrice * filteredOrderDates?.length)}
                                </Text>
                            </View>
                        </View>
                    </>
                )}

                {/* {contract && (
                <>
                    <Image
                        source={{ uri: contract?.nursingPackage?.imageUrl }}
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 5,
                            resizeMode: "cover",
                        }}
                    />
                    <View style={{ gap: 3 }}>
                        <Text style={styles.labelText}>{contract?.nursingPackage?.name}</Text>
                        <Text style={{ flexDirection: "row" }}>
                            <Text style={styles.labelText}>Phân loại</Text>
                            <Text style={styles.contentText}>: Gói dưỡng lão</Text>
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                            <Text style={styles.labelText}>Người cao tuổi:</Text>
                            <Text>{elder?.name ?? 'Unknown'}</Text>
                        </View>
                        <Text style={styles.labelText} >
                            {formatCurrency(contract?.nursingPackage?.price)}
                        </Text>
                    </View>
                    <Text style={styles.contentText}>
                        {formatCurrency(contract?.nursingPackage?.price)}
                    </Text>
                </>
            )} */}
            </View>
            {isExpanded && (
                <View style={[styles.expandedView, styles.body,
                ]}>
                    <Text style={[{ fontWeight: "bold" }]}>Dịch vụ sẽ thực hiện vào những ngày:</Text>
                    {filteredOrderDates?.map((detail, detailindex) => (
                        <Text key={detailindex} style={styles.expandedText}>• <ComDateConverter>{detail?.date}</ComDateConverter></Text>
                    ))}
                </View>
            )}
        </TouchableOpacity>
    );
}

export default ComPaymentInfo;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 10,
    },
    labelText: {
        fontWeight: '600'
    },
    contentText: {
        textAlign: "right"
    },
    expandedView: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        backgroundColor: '#fff',
        gap: 3,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    icon: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#33B39C',
        padding: 10,
    },
});
