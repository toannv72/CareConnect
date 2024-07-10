import { useState, useEffect, useRef, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComNoData from "../../Components/ComNoData/ComNoData";
import ComRoom from "./ComRoom";
import { useNavigation } from "@react-navigation/native";
import RoomListImg from "../../../assets/images/Nurse/Room/RoomListImg.png"
import { postData, getData } from "../../api/api";

export default function RoomList() {
    const {
        text: { CareSchedule },
        setLanguage,
    } = useContext(LanguageContext);
    const navigation = useNavigation();

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(!loading);
        getData('/room', {})
            .then((rooms) => {
                setData(rooms?.data?.contends);
                setLoading(loading);
            })
            .catch((error) => {
                setLoading(loading);
                console.error("Error fetching service-package:", error);
            });
    }, [])

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
                    {data.length == 0 ? (
                        <ComNoData>Không có dữ liệu</ComNoData>
                    ) : (
                        <View style={{ padding: 20 }}>
                            {data.map((room, index) => (
                                room.isUsed ? (
                                    <ComRoom
                                        key={index}
                                        data={room}
                                        onPress={() => navigation.navigate("RoomDetail", { roomData: room })}
                                    />
                                ) : null
                            ))}
                        </View>
                    )}
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