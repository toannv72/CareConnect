import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { FormProvider, useForm } from "react-hook-form";
import ComHeader from '../../Components/ComHeader/ComHeader';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import ComInputSearch from "../../Components/ComInput/ComInputSearch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComLoading from "../../Components/ComLoading/ComLoading";
import ComAddPackage from "./ComAddPackage";
import { LanguageContext } from "./../../contexts/LanguageContext";

export default function AddingServicePackages() {
    const {
        text: { addingPackages },
        setLanguage,
    } = useContext(LanguageContext);
    const [data, setData] = useState([
        {
            img: "https://png.pngtree.com/thumb_back/fw800/background/20230123/pngtree-old-people-physical-therapy-center-released-ball-photo-image_49464146.jpg",
            color: "#F7E863",
            text: "Vật lý trị liệu",
            context: "giúp người cao tuổi duy trì và cải thiện khả năng vận động, giảm đau, tăng cường sức mạnh cơ bắp và sự linh hoạt. Các bài tập được thiết kế phù hợp với tình trạng sức khỏe và nhu cầu của từng cá nhân, nhằm nâng cao chất lượng cuộc sống và khả năng tự lập của họ.",
            category: "Y tế",
            money: 100000,
        },
        {
            img: "https://png.pngtree.com/background/20230403/original/pngtree-doctor-massaging-old-mans-shoulders-vector-picture-image_2279279.jpg",
            color: "#8DF7AB",
            text: "Đấm bóp massage",
            context: "giúp người cao tuổi duy trì và cải thiện khả năng vận động, giảm đau, tăng cường sức mạnh cơ bắp và sự linh hoạt. Các bài tập được thiết kế phù hợp với tình trạng sức khỏe và nhu cầu của từng cá nhân, nhằm nâng cao chất lượng cuộc sống và khả năng tự lập của họ.",
            category: "Sinh hoạt",
            money: 300000,
        },
        {
            img: "https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2021/06/cham-cuu.png",
            color: "#8DF7AB",
            text: "Châm cứu bấm huyệt",
            context: "giúp người cao tuổi duy trì và cải thiện khả năng vận động, giảm đau, tăng cường sức mạnh cơ bắp và sự linh hoạt. Các bài tập được thiết kế phù hợp với tình trạng sức khỏe và nhu cầu của từng cá nhân, nhằm nâng cao chất lượng cuộc sống và khả năng tự lập của họ.",
            category: "Y tế",
            money: 350000,
        },
        {
            img: "https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2021/06/cham-cuu.png",
            color: "#8DF7AB",
            text: "Châm cứu bấm huyệt",
            context: "giúp người cao tuổi duy trì và cải thiện khả năng vận động, giảm đau, tăng cường sức mạnh cơ bắp và sự linh hoạt. Các bài tập được thiết kế phù hợp với tình trạng sức khỏe và nhu cầu của từng cá nhân, nhằm nâng cao chất lượng cuộc sống và khả năng tự lập của họ.",
            category: "Y tế",
            money: 350000,
        },
        {
            img: "https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2021/06/cham-cuu.png",
            color: "#8DF7AB",
            text: "Châm cứu bấm huyệt",
            context: "giúp người cao tuổi duy trì và cải thiện khả năng vận động, giảm đau, tăng cường sức mạnh cơ bắp và sự linh hoạt. Các bài tập được thiết kế phù hợp với tình trạng sức khỏe và nhu cầu của từng cá nhân, nhằm nâng cao chất lượng cuộc sống và khả năng tự lập của họ.",
            category: "Y tế",
            money: 350000,
        }
    ]);
    const [loading, setLoading] = useState(false);

    const [select, setSelect] = useState(false);
    const [select1, setSelect1] = useState(true);
    const [select2, setSelect2] = useState(true);
    const [select3, setSelect3] = useState(true);
    const check = () => {
        setSelect(false);
        setSelect1(true);
        setSelect2(true);
        setSelect3(true);
    };
    const check1 = () => {
        setSelect(true);
        setSelect1(false);
        setSelect2(true);
        setSelect3(true);
    };
    const check2 = () => {
        setSelect(true);
        setSelect1(true);
        setSelect3(true);
        setSelect2(false);
    };
    const check3 = () => {
        setSelect(true);
        setSelect1(true);
        setSelect2(true);
        setSelect3(false);
    };

    const searchSchema = yup.object().shape({
        search: yup.string(),
    });
    const methods = useForm({
        resolver: yupResolver(searchSchema),
        defaultValues: {
            search: "",
        },
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = methods;

    const onSubmit = (data) => {
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        setLoading(!loading);
    };
    return (
        <>
            <ComHeader
                showBackIcon={true}
                showTitle={true}
                title={addingPackages?.title}
            />
            <View style={styles.container}>
                <FormProvider {...methods}>
                    <ComInputSearch
                        placeholder="Tìm kiếm"
                        keyboardType="default"
                        name="search"
                        control={control}
                        onSubmitEditing={handleSubmit(onSubmit)}
                        errors={errors}
                    />
                </FormProvider>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={styles?.scrollView}
                >
                    <View style={styles?.buttonContainer}>
                        <ComSelectButton onPress={check} check={select}>
                            Tất cả
                        </ComSelectButton>
                        <ComSelectButton onPress={check1} check={select1}>
                            Y tế
                        </ComSelectButton>
                        <ComSelectButton onPress={check2} check={select2}>
                            Trị liệu
                        </ComSelectButton>
                        <ComSelectButton onPress={check3} check={select3}>
                            Dinh dưỡng
                        </ComSelectButton>
                    </View>
                </ScrollView>

                <ComLoading show={loading}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View>
                            {data?.map((value, index) => (
                                <ComAddPackage key={index} data={value} />
                            ))}
                        </View>
                        <View style={{ height: 120 }}></View>
                    </ScrollView>
                </ComLoading>
            </View>
            {/* <View style={{ height: 100, backgroundColor: "#fff" }}></View> */}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 15
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 15,
        flexWrap: "wrap",
        marginBottom: 10,
    },
    scrollView: {
        flexGrow: 0,
        flexShrink: 0,
    },
});
