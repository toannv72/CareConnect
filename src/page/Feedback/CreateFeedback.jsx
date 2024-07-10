import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Keyboard, Image } from "react-native";
import * as yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ComInput from "../../Components/ComInput/ComInput";
import ComSelect from "../../Components/ComInput/ComSelect";
import { LanguageContext } from "../../contexts/LanguageContext";
import { Form } from "react-native-autofocus";
import ComButton from "../../Components/ComButton/ComButton";
import { useNavigation } from '@react-navigation/native';
import ComHeader from '../../Components/ComHeader/ComHeader';
import feedbackImg from "../../../assets/images/feedback/feedback.png";
import { postData } from "../../api/api";
import { useRoute } from "@react-navigation/native";

export default function CreateFeedback() {
    const navigation = useNavigation();
    const [value, setValue] = useState("1");
    const route = useRoute();
    const { data } = route.params;

    // const [data, setData] = useState({})

    const {
        text: {
            feedback,
            common: { button },
        },
        setLanguage,
    } = useContext(LanguageContext);

    const feedbackSchema = yup.object().shape({});

    const methods = useForm({
        resolver: yupResolver(feedbackSchema),
        defaultValues: {
            title: "",
            content: "",
            ratings: "VerySatisfied"
        },
    });

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = methods;

    const handleSend = (formData) => {
        // Xử lý đăng nhập với dữ liệu từ data
        const updatedData = {
            ...formData,
            orderDetailId: data?.orderDetails[0]?.id, // Thêm id với giá trị cụ thể. Bạn có thể thay thế "unique-id" bằng giá trị thực tế.
        };
        Keyboard.dismiss();
        postData("/feedback", updatedData)
            .then((response) => {
                console.log("Thành công");
                // showToast("success", "Tạo báo cáo thành công", "", "bottom");
                navigation.navigate("ServiceHistory");
            })
            .catch((error) => {
                console.error("API Error: ", error);
                // showToast("error", "Có lỗi xảy ra, vui lòng thử lại!", "", "bottom");
            });
    };

    const options = [
        { label: 'Rất hài lòng', value: 'VerySatisfied' },
        { label: 'Bình thường', value: 'Neutral' },
        { label: 'Không hài lòng', value: 'Unsatisfied' },
    ];

    const handleSelect = (selectedItems, index) => {
        console.log('Selected Items:', selectedItems);
    };

    return (
        <>
            <ComHeader
                showBackIcon={true}
                showTitle={true}
                title={feedback?.title}
            />
            <KeyboardAvoidingView style={styles.container} >
                <View style={styles.body}>
                    <Image
                        source={feedbackImg}
                    />
                    {/* <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: "center", paddingVertical: 20 }}>
                        {data.text}
                    </Text> */}
                    <FormProvider {...methods}>
                        <View style={{ width: "90%", gap: 10 }}>
                            <ComInput
                                label={feedback?.label?.title}
                                placeholder={feedback?.placeholder?.title}
                                name="title"
                                control={control}
                                errors={errors} // Pass errors object
                                required
                            />
                            <ComInput
                                label={feedback?.label?.content}
                                placeholder={feedback?.placeholder?.content}
                                name="content"
                                control={control}
                                errors={errors} // Pass errors object
                                required

                            />
                            <ComSelect
                                label={'Mức độ hài lòng'}
                                name="ratings"
                                options={options}
                                control={control}
                                errors={errors}
                                required
                            ></ComSelect>
                            {/* Chờ bổ sung ComUpdate */}
                            <ComButton onPress={handleSubmit(handleSend)}>
                                {feedback?.label?.send}
                            </ComButton>
                        </View>
                    </FormProvider>
                </View>
            </KeyboardAvoidingView >
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    body: {
        display: "flex",
        alignItems: "center",
        flex: 1,
    },
})