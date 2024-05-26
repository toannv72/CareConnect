import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import ComSelectButton from "../../../Components/ComButton/ComSelectButton";
import ComTable from "./ComTable";
import ComPopup from "../../../Components/ComPopup/ComPopup";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../../assets/icon/backArrowWhite.png";
import sadIcon from "../../../../assets/Sad.png";
import { useNavigation } from '@react-navigation/native';

export default function ServiceHistoryDetail() {
    const [data, setData] = useState({
        registerDates: "24/05/2024",
        serviceDates: ["09/05/2024", "24//05/2024", "25/05/2024"],
        repeat: "Theo ngày",
        elder: "Trần Thị B",
        status: "Đã kết thúc",
    });
    const [popupVisible, setPopupVisible] = useState(false);
    const route = useRoute();
    const { id } = route.params;
    const navigation = useNavigation();
    const handleOpenPopup = () => {
        setPopupVisible(true);
    };
    const handleClosePopup = () => {
        setPopupVisible(false);
    };
    const [serviceData, setServiceData] = useState({
        img: "https://png.pngtree.com/thumb_back/fw800/background/20230123/pngtree-old-people-physical-therapy-center-released-ball-photo-image_49464146.jpg",
        color: "#F7E863",
        text: "Vật lý trị liệu",
        context: "giúp người cao tuổi duy trì và cải thiện khả năng vận động, giảm đau, tăng cường sức mạnh cơ bắp và sự linh hoạt. Các bài tập được thiết kế phù hợp với tình trạng sức khỏe và nhu cầu của từng cá nhân, nhằm nâng cao chất lượng cuộc sống và khả năng tự lập của họ.",
        category: "Y tế",
        money: 100000,
    });
    const {
        text: { addingPackages },
        setLanguage,
    } = useContext(LanguageContext);
    const handleBackPress = () => {
        navigation.goBack();
    };
    const formatCurrency = (number) => {
        return number.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };
    // bill table data 
    const billColumnLabels = {
        id: addingPackages?.history?.billId,
        totalMoney: addingPackages?.history?.totalMoney,
    };
    const billColumns = ["id", "totalMoney"];
    const billDataSource = [
        { id: '1234321', totalMoney: 300000 },
        { id: '6789987', totalMoney: 150000 },
        { id: '5703126', totalMoney: 30000 },
        { id: '0033775', totalMoney: 200000 },
    ];
    // servise history 
    const historyColumnLabels = {
        id: addingPackages?.history?.nurse,
        time: addingPackages?.history?.time,
    };
    const historyColumns = ["id", "time"];
    const historyDataSource = [
        { id: '1234321', time: "10:00 - 08/05/2024" },
        { id: '6789987', time: "10:00 - 08/05/2024" },
        { id: '5703126', time: "10:00 - 08/05/2024" },
        { id: '0033775', time: "10:00 - 08/05/2024" },
    ];

    return (
        <>
            <ComPopup
                visible={popupVisible}
                title="Bạn muốn hủy gian hạn Dịch vụ xoa bóp bấm huyệt theo tuần?"
                image={sadIcon}
                buttons={[
                    { text: 'Đóng', onPress: handleClosePopup, check: true },
                    { text: 'Xác nhận', onPress: () => { navigation.navigate("CancelRenewSuccess", { id: data.id }); } },
                ]}
                onClose={handleClosePopup}
            >
                <Text>Gói dịch vụ sẽ không tự động gia hạn lại</Text>

            </ComPopup>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backIconContainer}>
                    <Image
                        source={backArrowWhite}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Image
                    source={{ uri: serviceData?.img }}
                    style={{
                        height: 200,
                        objectFit: "fill",
                    }}
                />
            </View>
            <ScrollView style={styles.body}>
                <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }} numberOfLines={2}>
                    {serviceData?.text}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, fontSize: 16, marginBottom: 10 }}>
                        <Text style={{ fontWeight: "bold" }}>
                            {formatCurrency(serviceData?.money)}
                        </Text>
                        /{addingPackages?.package?.month}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        <Text style={{ fontWeight: "bold" }}>
                            {addingPackages?.history?.repeat}
                        </Text>
                        : {data?.repeat}
                    </Text>
                </View>
                <Text style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={styles.contentBold}>
                        {addingPackages?.history?.dates}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        : {data?.registerDates}
                    </Text>
                </Text>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.contentBold}>
                        {addingPackages?.history?.serviceDates}
                    </Text>

                    {data?.serviceDates.map((day, index) => (
                        <Text style={{ fontSize: 16 }} key={index}>
                            - {day}
                        </Text>
                    ))}
                </View>
                <Text style={{ flexDirection: "row", fontSize: 16, marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>
                        {addingPackages?.payment?.elderName}
                    </Text>
                    <Text>
                        : Cụ {data?.elder}
                    </Text>
                </Text>
                <Text style={{ flexDirection: "row", fontSize: 16, marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>
                        {addingPackages?.history?.status}
                    </Text>
                    <Text>
                        : {data?.status}
                    </Text>
                </Text>
                <Text style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={styles.contentBold}>
                        {addingPackages?.package?.category}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        : {serviceData?.category}
                    </Text>
                </Text>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.contentBold}>
                        {addingPackages?.package?.description}
                    </Text>
                    <Text style={{ fontSize: 16 }}>{serviceData?.context}</Text>
                </View>
                <View>
                    <Text style={styles.contentBold}>
                        {addingPackages?.history?.bill}
                    </Text>
                    <ComTable columns={billColumns} dataSource={billDataSource} columnLabels={billColumnLabels} />
                </View>
                <View>
                    <Text style={{ marginVertical: 10, fontSize: 16, fontWeight: 'bold' }}>
                        {addingPackages?.history?.serviceHistory}
                    </Text>
                    <ComTable columns={historyColumns} dataSource={historyDataSource} columnLabels={historyColumnLabels} />
                </View>
                <View style={{ marginBottom: 40 }}>
                    <ComSelectButton
                        onPress={() => {
                            navigation.navigate("CreateFeedback", { id: data.id });
                        }}>
                        {addingPackages?.history?.feedback}
                    </ComSelectButton>
                    <ComSelectButton
                        onPress={() => {
                            handleOpenPopup()
                        }}>
                        {addingPackages?.history?.cancelRenewal}
                    </ComSelectButton>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
    },
    header:{
        paddingTop: 50
    },
    contentBold: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "bold"
    },
    backIconContainer: {
        position: 'absolute',
        zIndex: 100,
        marginTop: 60,
        marginLeft: 10,
        padding: 3,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    backIcon: {
        width: 50,
        height: 50,
    },
});
