import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Button, Keyboard, Image } from "react-native";
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

export default function CreateFeedback() {
    const navigation = useNavigation();
    const [value, setValue] = useState("1");

    const [data, setData] = useState(
        {
            img: "https://png.pngtree.com/thumb_back/fw800/background/20230123/pngtree-old-people-physical-therapy-center-released-ball-photo-image_49464146.jpg",
            color: "#F7E863",
            text: "Vật lý trị liệu",
            context: "giúp người cao tuổi duy trì và cải thiện khả năng vận động, giảm đau, tăng cường sức mạnh cơ bắp và sự linh hoạt. Các bài tập được thiết kế phù hợp với tình trạng sức khỏe và nhu cầu của từng cá nhân, nhằm nâng cao chất lượng cuộc sống và khả năng tự lập của họ.",
            category: "Y tế",
            money: 100000,
        })

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
            pleasure: "1"
        },
    });

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = methods;

    const handleSend = (data) => {
        // Xử lý đăng nhập với dữ liệu từ data
        setData(data);
        Keyboard.dismiss();
        console.log(data);
        navigation.navigate("Homes");

    };

    const options = [
        { label: 'Rất hài lòng', value: '1' },
        { label: 'Bình thường', value: '2' },
        { label: 'Không hài lòng', value: '3' },
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
            <View style={styles.container}>
                <View style={styles.body}>
                    <Image
                        source={feedbackImg}
                    />
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: "center", paddingVertical: 20 }}>
                        {data.text}
                    </Text>
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
                                name="chon"
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
            </View >
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