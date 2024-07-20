import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../../auth/useAuth";
import ComButton from "../../Components/ComButton/ComButton";
import notfound from "../../../assets/notfound.png"

const NotFound = () => {
    const navigation = useNavigation();
    const { role } = useAuth();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff" }}>
            <Image source={notfound} style={{ height: 220, width: 260, objectFit: "fill" }} />
            <Text style={{ marginVertical: 20, fontSize: 16 }}>Đã có lỗi xảy ra với trang này. Vui lòng thử lại sau.</Text>
            {role?.name ?
                (<ComButton onPress={() => navigation.navigate(role?.name == "Nurse" ? "NurseHomes" : "Homes")} >
                    Quay về trang chủ
                </ComButton>
                ) : (
                    <ComButton onPress={() => navigation.navigate("Login")} >
                        Quay lại
                    </ComButton>
                )
            }
        </View>
    );
};

export default NotFound;
