import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { FormProvider, useForm } from "react-hook-form";
import ComHeader from '../../Components/ComHeader/ComHeader';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import ComInputSearch from "../../Components/ComInput/ComInputSearch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComLoading from "../../Components/ComLoading/ComLoading";
import ComAddPackage from "./ComAddPackage";
import { LanguageContext } from "./../../contexts/LanguageContext";
import ComNoData from "../../Components/ComNoData/ComNoData";
import Cart from "../../../assets/cart.png";
import { postData, getData } from "../../api/api";
import { stylesApp } from "../../styles/Styles";
import { useNavigation } from '@react-navigation/native';

export default function AddingServicePackages() {
    const {
        text: { addingPackages },
    } = useContext(LanguageContext);
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(select);
    const [loading, setLoading] = useState(false);
    const [select, setSelect] = useState(false);

    const check = () => {
        setSelectedCategory(null)
        setSelect(false);
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
        setLoading(!loading);
        getData('/service-package', {})
            .then((packageData) => {
                setData(packageData?.data?.contends);
            })
            .catch((error) => {
                console.error("Error fetching service-package:", error);
            });

        getData('/service-package-categories', {})
            .then((categoryData) => {
                setCategoryData(categoryData?.data?.contends);
                setLoading(loading);
            })
            .catch((error) => {
                console.error("Error fetching categoryData:", error);
            });
    }, [])

    const handleCategorySelect = (id) => {
        setSelect(true);
        setSelectedCategory(id);
    };

    const filteredData = !select ? data : data.filter(item => item?.servicePackageCategory?.id === selectedCategory);

    return (
        <>
            <ComHeader
                showTitle={true}
                title={addingPackages?.title}
            />
            <View style={styles.container}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                    <View style={{ flex: 5.5 }}>
                        <FormProvider {...methods} style>
                            <ComInputSearch
                                placeholder="Tìm kiếm"
                                keyboardType="default"
                                name="search"
                                control={control}
                                onSubmitEditing={handleSubmit(onSubmit)}
                                errors={errors}
                            />
                        </FormProvider>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Cart")}
                        style={[styles.cart, stylesApp.shadow]}>
                        <Image
                            source={Cart}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: "#fff"
                            }}
                        />
                    </TouchableOpacity>
                </View>
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
                        {categoryData?.map((value, index) => (
                            <ComSelectButton
                                key={index}
                                onPress={() => handleCategorySelect(value.id)}
                                check={selectedCategory === value?.id ? false : true}>
                                {value?.name}
                            </ComSelectButton>
                        ))}
                    </View>
                </ScrollView>
                <ComLoading show={loading}>
                    {filteredData.length == 0 ? (
                        <ComNoData>Không có dữ liệu</ComNoData>
                    ) : (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                            {filteredData?.map((value, index) => (
                                <ComAddPackage key={index} data={value} />
                            ))}
                            <View style={{ height: 300 }}></View>
                        </ScrollView>
                    )}
                </ComLoading>
            </View >
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
    noDataContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    noDataImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    cart: {
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#33B39C",
        borderRadius: 10
    }
});
