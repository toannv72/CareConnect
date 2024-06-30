import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useNavigation } from '@react-navigation/native';
import ComHeader from "../../../Components/ComHeader/ComHeader";
import ComSelectButton from "../../../Components/ComButton/ComSelectButton";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ComInputSearch from "../../../Components/ComInput/ComInputSearch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { postData, getData } from "../../../api/api";

export default function ListHealthIndex({ data }) {
    const [selectedHealthIndexItems, setSelectedHealthIndexItems] = useState([]);
    const [healthIndex, setHealthIndex] = useState([])
    const [loading, setLoading] = useState(false);

    const {
        text: { NurseHealthMonitor },
    } = useContext(LanguageContext);
    const navigation = useNavigation();

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

    useEffect(() => {
        setLoading(true);
        getData(`/health-category`, {})
            .then((categories) => {
                setHealthIndex(categories?.data?.contends);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error fetching order items:", error);
            });
    }, []);

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
                        <BouncyCheckbox
                            key={index}
                            fillColor="#33B39C"
                            style={{
                                marginVertical: 5,
                                borderWidth: 1,
                                borderColor: "#33B39C",
                                padding: 10,
                                borderRadius: 10,
                            }}
                            textComponent={
                                    <View style={styles.textComponentContainer}>
                                        <Image source={{ uri: item?.imageUrl }}
                                            style={
                                                {
                                                    width: 50,
                                                    height: 50,
                                                    marginHorizontal: 10,
                                                    flex: 1
                                                }
                                            } />
                                        <Text style={styles.paragraph}>{item?.name}</Text>
                                    </View>
                            }
                            innerIconStyle={{ borderWidth: 2 }}
                            onPress={(isChecked) => { handleCheckboxClick(item) }}
                            isChecked={selectedHealthIndexItems.some(i => i.id === item.id)}
                        />
                    ))}
                </ScrollView>

                <ComSelectButton
                    disable={selectedHealthIndexItems.length == 0 ? true : false}
                    style={{ borderRadius: 50, marginBottom: 30, height: 50 }}
                    onPress={() => navigation.navigate("CreateHealthMonitor", { selectedIndexs: selectedHealthIndexItems })}>
                    Tiếp tục
                </ComSelectButton>
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
    chooseText: {
        fontSize: 16,
        paddingVertical: 15,
        fontWeight: "600"
    },
    paragraph: {
        fontSize: 16,
        paddingRight: 10,
        flexWrap: "wrap",
        flex: 3,
    },
    image: {
        width: 20,
        height: 20,
        marginHorizontal: 5,
    },
    textComponentContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
})