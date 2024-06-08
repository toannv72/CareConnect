import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import plusIcon from "../../../assets/profile_icons/plus.png";
import { useNavigation } from '@react-navigation/native';
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComHealthMonitor from "./ComHealthMonitor";

export default function ListHealthMonitor({ data }) {

    const {
        text: { NurseHealthMonitor },
        setLanguage,
    } = useContext(LanguageContext);
    const navigation = useNavigation();

    const [healthMonitor, setHealthMonitor] = useState([
        {
            id: 1,
            elder: "Nguyễn Văn A",
            room: 101,
            nurse: "Thảo My",
            date: "08-06-2024",
            time: "10:00",
            status: "Bình thường",
            healthItem: [
                {
                    img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
                    title: "Huyết áp",
                    value: "118/80",
                    unit: "mmHg",
                    status: "Bình thường",
                    id: 1
                },
                {
                    img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
                    title: "Nhịp tim",
                    value: "70",
                    unit: "nhịp/giây",
                    status: "Bình thường",
                    id: 2
                },
                {
                    img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
                    title: "Đường Huyết",
                    value: "4.5",
                    unit: "mmol/l",
                    status: "Bình thường",
                    id: 3
                },
                {
                    img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
                    title: "Cholesterol",
                    value: "5.1",
                    unit: "mmol/l",
                    status: "Bình thường",
                    id: 4
                },

            ]
        },
        {
            id: 2,
            elder: "Nguyễn Văn A",
            room: 101,
            nurse: "Thảo My",
            date: "08-06-2024",
            time: "11:00",
            status: "Bình thường",
            healthItem: [
                {
                    img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
                    title: "Huyết áp và nhịp tim",
                    value: "118/80",
                    unit: "mmHg",
                    status: "Bình thường",
                    id: 1
                },
                {
                    img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
                    title: "Nhịp tim",
                    value: "70",
                    unit: "nhịp/giây",
                    status: "Bình thường",
                    id: 2
                },
                {
                    img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
                    title: "Đường Huyết",
                    value: "4.5",
                    unit: "mmol/l",
                    status: "Bình thường",
                    id: 3
                },
                {
                    img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
                    title: "Cholesterol",
                    value: "5.1",
                    unit: "mmol/l",
                    status: "Bình thường",
                    id: 4
                },

            ]
        }
    ])

    const groupedData = healthMonitor.reduce((acc, item) => {
        const date = item.date;
        acc[date] = acc[date] || [];
        acc[date].push(item);
        return acc;
    }, {});

    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return new Date(year, month - 1, day); // Chuyển về kiểu Date để dễ so sánh
      };

    return (
        <>
            <ComHeader
                showBackIcon
                showTitle
                title={NurseHealthMonitor?.title}
            />
            <View style={styles.body}>
                {Object.entries(groupedData)
                 .sort(([dateA], [dateB]) => formatDate(dateB) - formatDate(dateA))
                .map(([date, items]) => (
                    <View key={date}>
                        <Text style={styles.dateHeader}>{date}</Text>
                        {items[0] && ( // Chỉ hiển thị nếu có mục cho ngày đó
                              <ComHealthMonitor data={items[0]} /> 
                        )}
                    </View>
                ))}
                <TouchableOpacity
                    style={styles.imageContainer}
                    onPress={() => navigation.navigate("ListHealthIndex")} // Chuyển đến trang mới
                >
                    <Image
                        source={plusIcon} // Đường dẫn tới ảnh của bạn
                        style={
                            {
                                width: 50,
                                height: 50
                            }
                        }
                    />
                </TouchableOpacity>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
    },
    imageContainer: {
        position: 'absolute',
        bottom: 40,
        right: 40,
    },
    dateHeader:{
        fontWeight: "600",
        fontSize: 16,
        marginVertical: 5
    }
})