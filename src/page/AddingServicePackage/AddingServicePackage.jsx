import React, { useContext, useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useForm, FormProvider } from "react-hook-form";
import ComHeader from '../../Components/ComHeader/ComHeader';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComLoading from "../../Components/ComLoading/ComLoading";
import ComAddPackage from "./ComAddPackage";
import { LanguageContext } from "./../../contexts/LanguageContext";
import ComNoData from "../../Components/ComNoData/ComNoData";
import Heart from "../../../assets/heart.png";
import { postData, getData } from "../../api/api";
import { stylesApp } from "../../styles/Styles";
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import CategoryButtons from '../../Components/ComCategories/ComCategories';
import ComInputSearch from '../../Components/ComInput/ComInputSearch';
import moment from "moment";

export default function AddingServicePackages() {
    const {
        text: { addingPackages },
    } = useContext(LanguageContext);
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [displayedItems, setDisplayedItems] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const route = useRoute();
    const searchSchema = yup.object().shape({
        search: yup.string(),
    });

    const methods = useForm({
        resolver: yupResolver(searchSchema),
        defaultValues: { search: "" },
    });

    const { control, handleSubmit, reset, formState: { errors } } = methods;

    const onSubmit = (data) => {
        fetchNextPage(encodeURIComponent(data?.search.trim()))
    };

    const fetchNextPage = async (search) => {
        let url = `/service-package?SortColumn=id&SortDir=Desc`;
        if (selectedCategory) { url += `&PackageCategoryId=${selectedCategory}` }
        if (search) { url += `&Search=${search}` }
        setLoading(true);
        getData(url, {})
            .then((packageData) => {
                setData(packageData?.data?.contends || []);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log("Error fetching service-package:", error);
            });

        getData('/service-package-categories', {})
            .then((categoryData) => {
                setCategoryData(categoryData?.data?.contends);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log("Error fetching service-package-categories:", error);
            });
    };

    useEffect(() => {
        if (selectedCategory || selectedCategory == 0 || searchQuery != "") { fetchNextPage(); }
    }, [selectedCategory, searchQuery]);

    useFocusEffect(
        useCallback(() => {
            reset();
            setLoading(!loading);
            setSearchQuery("");
            fetchNextPage();
            setSelectedCategory(null)
            setDisplayedItems(10)
        }, [])
    );

    const handleCategorySelect = (id) => {
        setSelectedCategory(id);
        setDisplayedItems(10);
    };

    const handleClearSearch = () => {
        setDisplayedItems(10);
        fetchNextPage("");
    };

    const currentDate = moment();
    const filteredData = data?.filter((service) => {
        const endRegistrationDate = moment(service?.endRegistrationDate);
        const hasNotExpired = currentDate.isSameOrBefore(endRegistrationDate, "day");//chua het han dang ky
        const hasSlotsLeft = service?.registrationLimit !== 0 ? service?.totalOrder < service?.registrationLimit : service?.totalOrder >= service?.registrationLimit;//chua het luot dang ky
        //nếu có giới hạn người                 tổng lượt dky < giới hạn                             tổng lượt dky >= 0
        return hasNotExpired && hasSlotsLeft;
    });

    const handleLoadMore = () => {
        setDisplayedItems(prevCount => prevCount + 10);
    };

    return (
        <>
            <ComHeader
                showTitle={true}
                title={addingPackages?.title}
            />
            <View style={styles.container}>
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <View style={{ flex: 5.5 }}>
                        <FormProvider {...methods}>
                            <ComInputSearch
                                placeholder="Tìm kiếm"
                                name="search"
                                control={control}
                                onSubmitEditing={handleSubmit(onSubmit)}
                                errors={errors}
                                handleClearSelection={handleClearSearch}
                            />
                        </FormProvider>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Favorite")}
                        style={[styles.cart, stylesApp.shadow]}>
                        <Image source={Heart} style={{ width: 30, height: 30, tintColor: "#fff" }} />
                    </TouchableOpacity>
                </View>
                <CategoryButtons
                    categoryData={categoryData}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategorySelect}
                    onClearSelection={() => { handleCategorySelect(0) }} // Pass handleClearSelection as prop
                />
                {loading ? (
                    <ComLoading show={true} />
                ) : (
                    filteredData.length == 0 ? (<ComNoData>Không có dịch vụ nào</ComNoData>
                    ) : (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}>
                            {
                                filteredData?.slice(0, displayedItems)?.map((item, index) => (
                                    <ComAddPackage key={index} data={item} />
                                ))
                            }
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <View style={{ width: "35%" }}>
                                    <ComSelectButton onPress={handleLoadMore} disable={displayedItems >= data.length}>Xem thêm</ComSelectButton>
                                    <View style={{ height: 100 }} />
                                </View>
                            </View>
                        </ScrollView>
                    ))}
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 15
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
