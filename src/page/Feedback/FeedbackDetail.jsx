import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import feedbackImg from "../../../assets/images/feedback/feedback.png";
import ComHeader from "../../Components/ComHeader/ComHeader";

export default function FeedbackDetail() {
    const [data, setData] = useState({
        img: "https://png.pngtree.com/thumb_back/fw800/background/20230123/pngtree-old-people-physical-therapy-center-released-ball-photo-image_49464146.jpg",
        date: "09/05/2024",
        title: "Đánh giá về dịch vụ xoa bóp tháng 05/2024",
        content: "giúp người cao tuổi duy trì và cải thiện khả năng vận động, giảm đau, tăng cường sức mạnh cơ bắp và sự linh hoạt. Các bài tập được thiết kế phù hợp với tình trạng sức khỏe và nhu cầu của từng cá nhân, nhằm nâng cao chất lượng cuộc sống và khả năng tự lập của họ.",
        service: "Xoa bóp bấm huyệt",
    });

    const {
        text: { feedback },
        setLanguage,
    } = useContext(LanguageContext);

    const route = useRoute();
    const { id } = route.params;

    return (
        <>
            <ComHeader
                title={feedback?.history?.feedbackDetail}
                showTitle
                showBackIcon
            ></ComHeader>


            <View style={styles.body}>
                <ScrollView  >
                    <Image source={feedbackImg}
                        style={{
                            height: 200,
                            objectFit: "fill",
                        }} />
                    <Text style={{ fontWeight: "bold", fontSize: 20, marginVertical: 10, textAlign: 'center' }} >
                        {data?.service}
                    </Text>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.contentBold}>
                            {feedback?.history?.title}
                        </Text>
                        <Text style={styles.textbox}>{data?.title}</Text>
                    </View>

                    <View style={{ marginBottom: 5 }}>
                        <Text style={styles.contentBold}>
                            {feedback?.history?.content}
                        </Text>
                        <Text style={styles.textbox}> {data?.content}
                            {data?.content}
                        </Text>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.contentBold}>
                            {feedback?.label?.file}
                        </Text>
                        <Image source={{ uri: data?.img }} style={styles.image} />

                    </View>

                </ScrollView>

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
    contentBold: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: "600"
    },
    textbox: {
        borderColor: "#33B39C",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        fontSize: 16
    },
    image: {
        width: 100,
        height: 100,
        objectFit: "fill",
    },
});
