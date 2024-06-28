import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import User_fill from "../../../../assets/User_fill.png"; // Ensure this is the correct path
import billImg from "../../../../assets/bill.png";

const formatCurrency = (number) => {
    return number?.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    }) ?? '';
};

const ComPaymentInfo = ({ data }) => {
    if (!data) return null; // Early return if data is undefined or null

    const { servicePackage, contract, quantity, elder, orderDates } = data;

    return (
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
                    <View style={{ gap: 3 }}>
                        <Text style={styles.labelText}>{servicePackage.name}</Text>
                        <Text style={{ flexDirection: "row" }}>
                            <Text style={styles.labelText}>Phân loại</Text>
                            <Text style={styles.contentText}>: Gói dịch vụ</Text>
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                            <Text style={styles.labelText}>Người nhận</Text>
                            <Text>: {elder?.name ?? 'Unknown'}</Text>
                        </View>
                        <Text style={styles.labelText} >
                            {formatCurrency(servicePackage.price) + " x " + orderDates.length}
                        </Text>
                    </View>
                    <Text style={styles.contentText}>
                        {formatCurrency(servicePackage.price * orderDates.length)}
                    </Text>
                </>
            )}

            {contract && (
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
                            <Text style={styles.labelText}>Người nhận:</Text>
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
            )}
        </View>

    );
}

export default ComPaymentInfo;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 10,
    },
    labelText: {
        fontWeight: '600'
    },
    contentText: {
        flex: 1,
        textAlign: "right"
    }
});
