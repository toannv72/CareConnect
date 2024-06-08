import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import ComHeader from "../../../Components/ComHeader/ComHeader";
import ComButton from "../../../Components/ComButton/ComButton";
import CheckBox from 'react-native-check-box'
import ComInputSearch from "../../../Components/ComInput/ComInputSearch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

export default function ListHealthIndex({ data }) {

    const {
        text: { NurseHealthMonitor },
        setLanguage,
    } = useContext(LanguageContext);
    const navigation = useNavigation();

    const [selectedHealthIndexIds, setSelectedHealthIndexIds] = useState([]);

    const handleCheckboxClick = (itemId) => {
        setSelectedHealthIndexIds(prevIds => {
            if (prevIds.includes(itemId)) {
                return prevIds.filter(id => id !== itemId);
            } else {
                return [...prevIds, itemId];
            }
        });
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

    const [healthIndex, setHealthIndex] = useState([
        {
            img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
            title: "Huyết áp",
            unit: "mmHg",
            id: 1
        },
        {
            img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
            title: "Nhịp tim",
            unit: "nhịp/giây",
            id: 2
        },
        {
            img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
            title: "Đường Huyết",
            unit: "mmol/l",
            id: 3
        },
        {
            img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
            title: "Cholesterol",
            unit: "mmol/l",
            id: 4
        },
        {
            img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
            title: "Cholesterol 1",
            unit: "mmol/l",
            id: 5
        },
        {
            img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
            title: "Cholesterol 2",
            unit: "mmol/l",
            id: 6
        },
    ])

    return (
        <>
            <ComHeader
                showBackIcon
                showTitle
                title={NurseHealthMonitor?.healthIndex}
            />
            <View style={styles.body}>

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

                <Text style={{ fontSize: 16, paddingVertical: 10 }}>Chọn các chỉ số bạn muốn kiểm tra:</Text>

                <ScrollView>
                    {healthIndex.map((item, index) => (
                        <CheckBox
                            style={{ paddingVertical: 5 }}
                            onClick={() => handleCheckboxClick(item.id)}
                            isChecked={selectedHealthIndexIds.includes(item.id)}
                            rightText={item?.title}
                            rightTextStyle={{ fontSize: 16 }}
                            checkBoxColor={"#33B39C"}
                            key={index}
                        />
                    ))}
                </ScrollView>

                <ComButton
                    style={{ borderRadius: 50, marginBottom: 30 }}
                    onPress={() => navigation.navigate("CreateHealthMonitor", {selectedIndexs: selectedHealthIndexIds})}>
                    Tiếp tục
                </ComButton>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
    },
    imageContainer: {
        position: 'absolute',
        bottom: 40,
        right: 40,
    },
})