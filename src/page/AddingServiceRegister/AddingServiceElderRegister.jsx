import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from '@react-navigation/native';
import ComElder from "../../Components/ComElder/ComElder";

export default function AddingServiceElderRegister() {
    const [data, setData] = useState({
        img: "https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2021/06/cham-cuu.png",
        color: "#8DF7AB",
        text: "Châm cứu bấm huyệt",
        context: "giúp người cao tuổi duy trì và cải thiện khả năng vận động, giảm đau, tăng cường sức mạnh cơ bắp và sự linh hoạt. Các bài tập được thiết kế phù hợp với tình trạng sức khỏe và nhu cầu của từng cá nhân, nhằm nâng cao chất lượng cuộc sống và khả năng tự lập của họ.",
        category: "Y tế",
        money: 350000,
    });

    const [elderData, setElderData] = useState([
        {
            img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
            name: "Nguyễn Văn toàn",
            age: "34",
            sex: "Nam",
            room: "17",
            bed: "3",
            id: 1,
        },
        {
            img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
            name: "Nguyễn Văn toàn",
            age: "34",
            sex: "Nam",
            room: "17",
            bed: "3",
            id: 2,
        },
        {
            img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
            name: "Nguyễn Văn toàn",
            age: "34",
            sex: "Nam",
            room: "17",
            bed: "3",
            id: 3,
        },
        {
            img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
            name: "Nguyễn Văn toàn",
            age: "34",
            sex: "Nam",
            room: "17",
            bed: "3",
            id: 4,
        },
        {
            img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
            name: "Nguyễn Văn toàn",
            age: "34",
            sex: "Nam",
            room: "17",
            bed: "3",
            id: 5,
        },
    ]);

    const [selectedElderId, setSelectedElderId] = useState(null);

    const {
        text: { addingPackages },
        setLanguage,
    } = useContext(LanguageContext);

    const route = useRoute();
    const { id } = route.params;

    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    const formatCurrency = (number) => {
        // Sử dụng hàm toLocaleString() để định dạng số
        return number.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    const handleElderPress = (id) => {
        setSelectedElderId(id);
    };

    return (
        <>
            <View  style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backIconContainer}>
                    <Image
                        source={backArrowWhite}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Image
                    source={{ uri: data?.img }}
                    style={{
                        height: 200,
                        objectFit: "fill",
                    }}
                />
            </View>
            <View style={styles.body}>
            <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }} numberOfLines={2}>
                    {data?.text}
                </Text>
                {/* price */}
                <Text style={{ fontSize: 16, marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>
                        {formatCurrency(data?.money)}
                    </Text>
                    /{addingPackages?.package?.month}
                </Text>

                {/* category */}
                <Text style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={styles.contentBold}>
                        {addingPackages?.package?.category}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        : {data?.category}
                    </Text>
                </Text>

                <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
                    {addingPackages?.register?.registerElder}
                </Text>

               
                    <View>
                        {elderData?.map((value, index) => (
                            <ComElder key={index} data={value} 
                            onPress={() => handleElderPress(value.id)}
                                isSelected={selectedElderId === value.id}
                            />
                        ))}
                    </View>
                    <View style={{ height: 120 }}></View>
                </ScrollView>
                <View style={{ marginVertical: 20 }}>
                    <ComSelectButton
                        onPress={() => {
                            navigation.navigate("AddingServiceCalendarRegister", { id: data.id });
                        }}>
                        Tiếp tục
                    </ComSelectButton>
                </View>
            </View>
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