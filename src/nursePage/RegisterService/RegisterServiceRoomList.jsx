import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComNoData from "../../Components/ComNoData/ComNoData";
import ComRoom from "../RoomList/ComRoom";
import ComLoading from "../../Components/ComLoading/ComLoading";
import { useNavigation } from "@react-navigation/native";
import Service from "../../../assets/images/Nurse/RegisterService/service.png"
import { postData, getData } from "../../api/api";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../../auth/useAuth";
import moment from "moment";

export default function RegisterServiceRoomList() {
    const {
        text: { CareSchedule },
        setLanguage,
    } = useContext(LanguageContext);
    const { user } = useAuth();
    const navigation = useNavigation();
    const route = useRoute();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const today = moment().format("YYYY-MM-DD");
    const getRoomList = (data) => {
        return data.reduce((acc, current) => {
            const x = acc.find(item => item?.id === current?.room?.id);//do thêm room của obj vào acc, nên mỗi item là 1 room, mỗi curent lại là 1 careschedule
            if (!x) {
                // Nếu không tìm thấy phần tử careschedule có cùng room.id trong acc, thêm room vào mảng acc
                return acc.concat([current?.room]);
            } else {
                // Nếu đã tồn tại phần tử careschedule có cùng room.id trong acc, không thêm vào mảng acc
                return acc;
            }
        }, []);
    };
    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            getData(`/care-schedule?CareMonth=${moment().month() + 1}&CareYear=${moment().year()}&UserId=${user?.id}`, {})
                .then((careSchedule) => {
                    setData(careSchedule?.data?.contends[0]?.rooms);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error("Error getData fetching items:", error);
                });
        }, [])
    );

    return (
        <>
            <ComHeader
                showBackIcon
                showTitle
                title="Các dịch vụ được đăng ký"
            />
            <View style={styles.body}>
                <ScrollView>
                    <View style={{ alignItems: "center", backgroundColor: "#ACDED3", marginHorizontal: 10, borderRadius: 10 }}>
                        <Image
                            source={Service}
                            style={{
                                height: 150,
                                width: 220,
                                objectFit: "fill",
                                marginVertical: 10
                            }}
                        />
                    </View>
                    <ComLoading show={loading}>
                        {data.length == 0 ? (
                            <ComNoData>Không có dữ liệu</ComNoData>
                        ) : (
                            <View style={{ padding: 20 }}>
                                {data?.map((room, index) => (
                                    room?.isUsed ? (
                                        <ComRoom
                                            key={index}
                                            data={room}
                                            onPress={() => navigation.navigate("RegisterService", { roomData: room })}
                                        />
                                    ) : null
                                ))}
                            </View>
                        )}
                    </ComLoading>
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