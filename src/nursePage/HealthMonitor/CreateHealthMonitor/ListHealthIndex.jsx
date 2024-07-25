import React, { useContext, useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ComHeader from "../../../Components/ComHeader/ComHeader";
import ComSelectButton from "../../../Components/ComButton/ComSelectButton";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ComInputSearch from "../../../Components/ComInput/ComInputSearch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { postData, getData } from "../../../api/api";
import { useRoute } from "@react-navigation/native";
import ComNoData from "../../../Components/ComNoData/ComNoData";
import ComLoading from "../../../Components/ComLoading/ComLoading";

export default function ListHealthIndex({ data }) {
    const [selectedHealthIndexItems, setSelectedHealthIndexItems] = useState([]);
    const [healthIndex, setHealthIndex] = useState([])
    const [loading, setLoading] = useState(false);
    const [displayedItems, setDisplayedItems] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const route = useRoute();
    const { elderId } = route.params;
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

    const { control, handleSubmit, reset, formState: { errors } } = methods;

    const onSubmit = (data) => {
        if (data?.search.trim() != "") {
            setHealthIndex([]);
            setSearchQuery(encodeURIComponent(data?.search.trim()));
        }
    };

    const fetchNextPage = async () => {
        let url = '/health-category';

        if (searchQuery) {
            url += `?Search=${searchQuery}`;
        }

        getData(url, {})
            .then((categories) => {
                const filteredData = categories?.data?.contends?.filter((item) => (item?.state == "Active"))
                setHealthIndex(filteredData);
                setLoading(false);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error fetching order items:", error);
            });
    }

    useEffect(() => {
        if (searchQuery != "")
            fetchNextPage();
    }, [searchQuery]);

    useFocusEffect(
        useCallback(() => {
            reset();
            setHealthIndex([]);
            setLoading(!loading);
            setSearchQuery("");
            fetchNextPage();
            setDisplayedItems(10)

        }, [])
    );

    const handleClearSearch = () => {
        if (searchQuery != "") {
            setHealthIndex([])
        }
        setSearchQuery(" ");
    };

    const handleLoadMore = () => {
        setDisplayedItems(prevCount => prevCount + 10);
    };

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
                        handleClearSelection={handleClearSearch}
                    />
                </FormProvider>

                <Text style={styles?.chooseText}>{NurseHealthMonitor?.chooseHealthIndex}</Text>
                {loading ? (
                    <ComLoading show={true} />
                ) : (
                    healthIndex.length == 0 ? (<ComNoData>Không có chỉ số sức khỏe nào</ComNoData>
                    ) : (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            {healthIndex?.slice(0, displayedItems)?.map((item, index) => (
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
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                {displayedItems < healthIndex?.length &&
                                    <View style={{ width: "35%" }}>
                                        <ComSelectButton onPress={handleLoadMore} disable={displayedItems >= healthIndex?.length}>Xem thêm</ComSelectButton>
                                    </View>}
                            </View>
                        </ScrollView>
                    ))}
                <ComSelectButton
                    disable={selectedHealthIndexItems.length == 0 ? true : false}
                    style={{ borderRadius: 50, marginBottom: 30, height: 50 }}
                    onPress={() => navigation.navigate("CreateHealthMonitor", { selectedIndexs: selectedHealthIndexItems, elderId })}>
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