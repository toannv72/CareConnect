import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity, FlatList  } from 'react-native';
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import ComElder from "./ComElder";
import ComHeader from "../../Components/ComHeader/ComHeader";
import RegisterServiceImg from "./RegisterServiceImg.png"

export default function RegisterService({ }) {
    const {
        text: { CareSchedule },
        setLanguage,
    } = useContext(LanguageContext);
    const navigation = useNavigation();

    const [data, setData] = useState([
        {
            elder: {
                img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
                name: "Nguyễn Văn toàn",
                age: "34",
                sex: "Nam",
                room: "107",
                area: "A",
                id: 1,
            },
            service: [
                {
                    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkuFGRcwQzPr-khFu8hXL9M1Zj884q_SFgRw&s",
                    title: "Khám sức khỏe",
                    time: "10:00",
                    status: "Đã thực hiện",
                    implementor: "Thảo My",
                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                },
                {
                    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkuFGRcwQzPr-khFu8hXL9M1Zj884q_SFgRw&s",
                    title: "Châm cứu",
                    time: "10:00",
                    status: "Đã thực hiện",
                    implementor: "Thảo My",
                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                }
            ]
        },
        {
            elder: {
                img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
                name: "Trần Văn B",
                age: "70",
                sex: "Nam",
                room: "107",
                area: "A",
                id: 2,
            },
            service: [
                { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkuFGRcwQzPr-khFu8hXL9M1Zj884q_SFgRw&s",
                    title: "Châm cứu",
                    time: null,
                    status: "Chưa thực hiện",
                    implementor: null,
                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                }

            ]
               
        },
    ])

    return (
        <>
            <ComHeader
                showBackIcon
                showTitle
                title={"Dịch vụ"}
            />
            <View style={styles.body}>
                        <Image
                            source={RegisterServiceImg}
                            style={{
                                height: 200,
                                objectFit: "contain",

                            }}
                        />

                    <FlatList
                        data={data}
                        renderItem={ ({ item }) => <ComElder data={item} />}
                        keyExtractor={(item, index) => index.toString()}
                        style={{margin: 10}}
                    />
            </View >

        </>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#fff",
        flex: 1,
        paddingTop: 15,
    },
})