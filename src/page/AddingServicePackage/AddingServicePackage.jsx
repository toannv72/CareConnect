import React, { useContext, useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CategoryButtons from '../../Components/ComCategories/ComCategories';
import ComInputSearch from '../../Components/ComInput/ComInputSearch';

export default function AddingServicePackages() {
    const {
        text: { addingPackages },
    } = useContext(LanguageContext);
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
    const [page, setPage] = useState(1); // Track pagination page
    const [hasMore, setHasMore] = useState(true); // Track if there are more items to load
    const [searchQuery, setSearchQuery] = useState("");
    const searchSchema = yup.object().shape({
        search: yup.string(),
    });

    const methods = useForm({
        resolver: yupResolver(searchSchema),
        defaultValues: { search: "" },
    });

    const { control, handleSubmit, reset, formState: { errors } } = methods;

    const onSubmit = (data) => {
        setPage(1);
        setData([]);
        setSearchQuery(encodeURIComponent(data.search.trim()));
    };

    const fetchNextPage = async () => {
        setLoadMoreLoading(!loadMoreLoading);
        let url = `/service-package?PageIndex=${page}&PageSize=10`;
        if (selectedCategory) { url += `&PackageCategoryId=${selectedCategory}` }
        if (searchQuery) { url += `&Search=${searchQuery}` }

        getData(url, {})
            .then((packageData) => {
                const newItems = packageData?.data?.contends || [];
                setData(prevData => [...prevData, ...newItems]);
                setPage(prevPage => prevPage + 1);
                setLoadMoreLoading(false);
                setLoading(loading);
                setHasMore(page < packageData?.data?.totalPages);
            })
            .catch((error) => {
                setLoading(loading);
                console.error("Error fetching service-package:", error);
            });

        getData('/service-package-categories', {})
            .then((categoryData) => {
                setCategoryData(categoryData?.data?.contends);
                setLoading(loading);
            })
            .catch((error) => {
                setLoading(loading);
                console.error("Error fetching service-package-categories:", error);
            });
    };

    useEffect(() => {
        if (selectedCategory || selectedCategory == 0 || searchQuery != "") { fetchNextPage(); }
    }, [selectedCategory, searchQuery]);

    useFocusEffect(
        useCallback(() => {
            reset();
            setData([]);
            setPage(1);
            setLoading(!loading);
            setSearchQuery("");
            fetchNextPage();
            if (!selectedCategory) { setSelectedCategory(null) }
        }, [])
    );

    const handleCategorySelect = (id) => {
        setSelectedCategory(id);
        setPage(1);
        setData([])
    };

    const handleClearSelection = () => {
        setSelectedCategory(0);
        setPage(1);
        setData([]);
    };

    const handleClearSearch = () => {
        handleClearSelection();
        setSearchQuery("");
    };

    const filteredData = !selectedCategory ? data : data.filter(item => item?.servicePackageCategory?.id === selectedCategory);

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
                    {/* <TouchableOpacity
                        onPress={() => navigation.navigate("Cart")}
                        style={[styles.cart, stylesApp.shadow]}>
                        <Image source={Heart}
                            style={{ width: 30, height: 30, tintColor: "#fff" }} />
                    </TouchableOpacity> */}
                </View>
                <CategoryButtons
                    categoryData={categoryData}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategorySelect}
                    onClearSelection={handleClearSelection} // Pass handleClearSelection as prop
                />
                {loading ? (
                    <ComLoading show={true} />
                ) : (
                    filteredData.length == 0 ? (<ComNoData>Không có dịch vụ nào</ComNoData>
                    ) : (
                        <FlatList
                            data={filteredData}
                            renderItem={({ item }) => <ComAddPackage data={item} />}
                            contentContainerStyle={{ gap: 5 }}
                            showsVerticalScrollIndicator={false} // Tắt scrollbar dọc
                            ListFooterComponent={() => (
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ width: "35%" }}>
                                        {loadMoreLoading ? (<ActivityIndicator />) :
                                            (<ComSelectButton onPress={fetchNextPage} disable={!hasMore}>Xem thêm</ComSelectButton>)}
                                        <View style={{ height: 100 }} />
                                    </View>
                                </View>
                            )}
                        />
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
