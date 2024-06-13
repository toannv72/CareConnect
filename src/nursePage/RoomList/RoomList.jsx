import { useState, useEffect, useRef, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComRoom from "./ComRoom";
import { useNavigation } from "@react-navigation/native";
import RoomListImg from "./RoomListImg.png"

export default function RoomList() {
    const {
        text: { CareSchedule },
        setLanguage,
    } = useContext(LanguageContext);
    const navigation = useNavigation();

    const [data, setData] = useState([
        {
            roomId: 1,
            name: "107",
            capacity: 4,
            type: "Cơ bản",
            area: "A",
            color: "#64CCC5"
        },
        {
            roomId: 2,
            name: "207",
            capacity: 2,
            type: "Thường",
            area: "B",
            color: "#F7E863"
        },
        {
            roomId: 3,
            name: "307",
            capacity: 1,
            type: "Cao cấp",
            area: "C",
            color: "#8DF7AB"
        },
        {
            roomId: 4,
            name: "307",
            capacity: 1,
            type: "Cao cấp Cao cấp",
            area: "C",
            color: "#8DF7AB"
        },
        {
            roomId: 5,
            name: "307",
            capacity: 1,
            type: "Cao cấp Cao cấp",
            area: "C",
            color: "#8DF7AB"
        },
    ])

    return (
        <>
            <ComHeader
                showBackIcon
                showTitle
                title="Danh sách phòng"
            />
            <View style={styles.body}>
                <ScrollView>
                    <View style={{ alignItems: "center", backgroundColor: "#ACDED3", marginHorizontal: 10, borderRadius: 10 }}>
                        <Image
                            source={RoomListImg}
                            style={{
                                height: 150,
                                objectFit: "fill",

                            }}
                        />
                    </View>
                    <View style={{ padding: 20 }}>
                        {data.map((room, index) => (
                            
                                <ComRoom
                                    key={index}
                                    data={room}
                                    color={room?.color}
                                    onPress={() => navigation.navigate("RoomDetail",{roomData: room})} // Pass roomData
                                />
                        ))}
                    </View>
                </ScrollView>
            </View>

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