import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import ComHeader from "../../../Components/ComHeader/ComHeader";
import ComButton from "../../../Components/ComButton/ComButton";
import Checkbox from 'expo-checkbox';
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

    const [selectedHealthIndexItems, setSelectedHealthIndexItems] = useState([]);

    const handleCheckboxClick = (item) => {
        setSelectedHealthIndexItems(prevItems => {
            const existingIndex = prevItems.findIndex(i => i.id === item.id);
            if (existingIndex !== -1) {
                // Remove if already selected
                return prevItems.filter(i => i.id !== item.id);
            } else {
                // Add if not selected
                return [...prevItems, item];
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
            img: "https://png.pngtree.com/element_our/png_detail/20180910/blood-pressure-icon-design-vector-png_86788.jpg",
            title: "Huyết áp",
            unit: "mmHg",
            id: 1
        },
        {
            img: "https://static.vecteezy.com/system/resources/thumbnails/022/979/495/small/heart-rhythm-graph-checking-your-heartbeat-for-diagnosis-png.png",
            title: "Nhịp tim",
            unit: "nhịp/giây",
            id: 2
        },
        {
            img: "https://png.pngtree.com/png-clipart/20201223/ourlarge/pngtree-diabetes-blood-glucose-meter-png-image_2596889.jpg",
            title: "Đường Huyết",
            unit: "mmol/l",
            id: 3
        },
        {
            img: "https://cdn-icons-png.flaticon.com/512/6192/6192010.png",
            title: "Cholesterol",
            unit: "mmol/l",
            id: 4
        },
        {
            img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
            title: "Cân nặng",
            unit: "Kg",
            id: 5
        },
        {
            img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRY-gvCfdzIMZ0e-8ezrIgW_nQO1A0VkbgSYcq-gXEQLbpeEqF2",
            title: "Chiều cao",
            unit: "Cm",
            id: 6
        },
        {
            img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
            title: "Cholesterol 2",
            unit: "mmol/l",
            id: 7
        }, {
            img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
            title: "Cholesterol 2",
            unit: null,
            id: 8
        }, {
            img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
            title: "Cholesterol 2",
            unit: "mmol/l",
            id: 9
        }, {
            img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weighing-vector-icon-material-image_1197044.jpg",
            title: "Cholesterol 2",
            unit: "mmol/l",
            id: 10
        },
    ])

    return (
        <>
            <ComHeader
                showBackIcon
                showTitle
                title={NurseHealthMonitor?.healthIndex}
            />
            <View style={styles?.body}>

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

                <Text style={styles?.chooseText}>{NurseHealthMonitor?.chooseHealthIndex}</Text>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {healthIndex.map((item, index) => (
                        <TouchableOpacity
                         style={styles.section}
                          onPress={() => handleCheckboxClick(item)}
                          key={index}>
                            <Checkbox
                                value={selectedHealthIndexItems.some(i => i.id === item.id)}
                                onValueChange={() => handleCheckboxClick(item)}
                                color={selectedHealthIndexItems.some(i => i.id === item.id) ? "#33B39C" : undefined}
                            />
                            <Image
                                source={{ uri: item?.img }} // Đường dẫn tới ảnh của bạn
                                style={
                                    {
                                        width: 50,
                                        height: 50
                                    }
                                }
                            />
                            <Text style={styles.paragraph}>{item?.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <ComButton
                    style={{ borderRadius: 50, marginBottom: 30 }}
                    onPress={() => navigation.navigate("CreateHealthMonitor", { selectedIndexs:  selectedHealthIndexItems })}>
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
        paddingHorizontal: 20,
    },
    imageContainer: {
        position: 'absolute',
        bottom: 40,
        right: 40,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        gap: 10
    },
    chooseText: {
        fontSize: 16,
        paddingVertical: 15,
        fontWeight: "600"
    },
    paragraph: {
        fontSize: 16,
    },
})