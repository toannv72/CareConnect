import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
// import TopicContent from "../TopicContent";
import { LanguageContext } from "../../../contexts/LanguageContext";
import ComCatalogue from "./ComCatalogue";
import { useNavigation } from "@react-navigation/native";
import Room from "../../../../assets/images/Nurse/NurseHomeIcon/Room.png";
import AddingService from "../../../../assets/images/Nurse/NurseHomeIcon/AddingService.png";
import nav from "../../../../assets/icon/Nav3.png"

export default function Catalogue() {
    const navigation = useNavigation();
    const {
        text: { Home },
    } = useContext(LanguageContext);

    const goto = (link) => {
        navigation.navigate(link);
    }
    return (
        <View
            style={{
                justifyContent: "space-between",
                gap: 10,
                flexWrap: 'wrap',
                flexDirection: "row",
                marginVertical: 10
            }}
        >
            <TouchableOpacity
                style={styles?.comCatalogue}
                onPress={() => goto("NurseHealthMonitor")}>

                <ComCatalogue
                    url={
                        nav
                    }
                    color={"#003C5F"}
                    backgroundColor={"#8CCAEE"}
                    title={"Theo dõi sức khỏe"}
                    content={"Xem chi tiết"}
                >
                </ComCatalogue>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles?.comCatalogue}
                onPress={() => goto("RoomList")}>
                <ComCatalogue
                    url={
                        Room
                    }
                    color={"#1D2779"}
                    backgroundColor={"#A4A4F8"}
                    title={"Các phòng phụ trách"}
                    content={"Xem chi tiết"}
                > </ComCatalogue>

            </TouchableOpacity>
            <TouchableOpacity
             style={styles?.comCatalogue}
             onPress={() => goto("RegisterService")}
             >
                <ComCatalogue
                    url={
                        AddingService
                    }
                    color={"#B35500"}
                    backgroundColor={"#FCCA9B"}
                    title={"Các dịch vụ cần thực hiện"}
                    content={"Xem chi tiết"}
                > </ComCatalogue>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    comCatalogue: {
        height: 150,
        width: "47%",
    }
})

