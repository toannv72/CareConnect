import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import feedbackImg from "../../../assets/images/feedback/feedback.png";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComSelect from "../../Components/ComInput/ComSelect";
import { postData, getData } from "../../api/api";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function FeedbackDetail() {
    // const [data, setData] = useState({
    //     img: "https://png.pngtree.com/thumb_back/fw800/background/20230123/pngtree-old-people-physical-therapy-center-released-ball-photo-image_49464146.jpg",
    //     date: "09/05/2024",
    //     title: "Đánh giá về dịch vụ xoa bóp tháng 05/2024",
    //     content: "giúp người cao tuổi duy trì và cải thiện khả năng vận động, giảm đau, tăng cường sức mạnh cơ bắp và sự linh hoạt. Các bài tập được thiết kế phù hợp với tình trạng sức khỏe và nhu cầu của từng cá nhân, nhằm nâng cao chất lượng cuộc sống và khả năng tự lập của họ.",
    //     service: "Xoa bóp bấm huyệt",
    // });

    const {
        text: { feedback },
        setLanguage,
    } = useContext(LanguageContext);

    const route = useRoute();
    const { id } = route.params;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        setLoading(!loading);
        getData(`/feedback/${id}`, {})
            .then((feedback) => {
                console.log("FeedbackDetail", feedback?.data)
                setData(feedback?.data);
                setLoading(loading);
            })
            .catch((error) => {
                setLoading(loading);
                console.error("Error getData fetching feedback:", error);
            });
    }, []);

    const methods = useForm({
        resolver: yupResolver(),
        defaultValues: {
            pleasure: data?.ratings ?? "",
        },
    });
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = methods;

    const pleasureData = [
        {
            value: "VerySatisfied",
            label: "Rất hài lòng",
        },
        {
            value: "Neutral",
            label: "Bình thường",
        },
        {
            value: "Unsatisfied",
            label: "Không hài lòng",
        },
    ];

    return (
        <>
            <ComHeader
                title={feedback?.history?.feedbackDetail}
                showTitle
                showBackIcon
            />
            <View style={styles.body}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    <Image source={feedbackImg}
                        style={{
                            height: 200,
                            objectFit: "fill",
                            marginBottom: 30
                        }} />

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
                        <Text style={styles.textbox}>
                            {data?.content}
                        </Text>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.contentBold}>
                            {feedback?.label?.service}
                        </Text>
                        <Text style={styles.textbox}>{data?.orderDetail?.servicePackage?.name}</Text>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.contentBold}>
                            {feedback?.history?.date}
                        </Text>
                        <Text style={styles.textbox}>{data?.orderDetail?.servicePackage?.name}</Text>
                    </View>
                    <FormProvider {...methods}>
                        <View style={{ marginVertical: 5 }}>
                            <Text style={styles.contentBold}>
                                {feedback?.label?.pleasure}
                            </Text>
                            <ComSelect
                                name="pleasure"
                                control={control}
                                errors={errors} // Pass errors object
                                options={pleasureData}
                                enabled={false}
                                style={{ width: "50%" }}
                                required
                            />
                        </View>
                    </FormProvider>

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
