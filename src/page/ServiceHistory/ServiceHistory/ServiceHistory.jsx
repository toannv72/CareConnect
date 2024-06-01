import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { FormProvider, useForm } from "react-hook-form";
import ComHeader from '../../../Components/ComHeader/ComHeader';
import ComInputSearch from "../../../Components/ComInput/ComInputSearch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComLoading from "../../../Components/ComLoading/ComLoading";
import ComServiceHistoryPackage from "./ComServiceHistoryPackage";
import { LanguageContext } from "./../../../contexts/LanguageContext";

export default function ServiceHistory() {
    const {
        text: { addingPackages },
        setLanguage,
    } = useContext(LanguageContext);
    const [data, setData] = useState([
        {
            img: "https://png.pngtree.com/thumb_back/fw800/background/20230123/pngtree-old-people-physical-therapy-center-released-ball-photo-image_49464146.jpg",
            registerDates: "25/05/2024",
            text: "Vật lý trị liệu",
            repeat: true,
            elder: "Trần Thị B",
            category: "Y tế",
            status: "Chưa kết thúc",
        },
        {
            img: "https://png.pngtree.com/background/20230403/original/pngtree-doctor-massaging-old-mans-shoulders-vector-picture-image_2279279.jpg",
            registerDates: "24//05/2024",
            text: "Đấm bóp massage",
            repeat: true,
            elder: "Trần Thị B",
            category: "Sinh hoạt",
            status: "Đã kết thúc",
        },
        {
            img: "https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2021/06/cham-cuu.png",
            registerDates: "09/05/2024",
            text: "Châm cứu bấm huyệt",
            repeat: true,
            elder: "Trần Thị B",
            category: "Y tế",
            status: "Chưa kết thúc",
        },
        {
            img: "https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2021/06/cham-cuu.png",
            registerDates: "09/05/2024",
            text: "Châm cứu bấm huyệt",
            repeat: true,
            elder: "Trần Thị B",
            category: "Y tế",
            status: "Đã kết thúc",
        },
        ,
        {
            img: "https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2021/06/cham-cuu.png",
            registerDates: "09/05/2024",
            text: "Châm cứu bấm huyệt",
            repeat: true,
            elder: "Trần Thị B",
            category: "Y tế",
            status: "Đã kết thúc",
        },
        {
            img: "https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2021/06/cham-cuu.png",
            registerDates: "09/05/2024",
            text: "Châm cứu bấm huyệt",
            repeat: true,
            elder: "Trần Thị B",
            category: "Y tế",
            status: "Đã kết thúc",
        },
    ]);
    const [loading, setLoading] = useState(false);

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
                title={addingPackages?.history?.title}
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

                <ComLoading show={loading}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        style={styles.scrollView}
                    >
                        <View>
                            {data?.map((value, index) => (
                                <ComServiceHistoryPackage key={index} data={value} />
                            ))}
                        </View>
                        <View style={{ height: 120 }}></View>
                    </ScrollView>
                </ComLoading>
            </View>
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
        marginTop: 20
    },
});
