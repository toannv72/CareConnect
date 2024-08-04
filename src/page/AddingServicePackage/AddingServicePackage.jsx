import React, { useContext, useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Text } from 'react-native';
import { useForm, FormProvider } from "react-hook-form";
import ComHeader from '../../Components/ComHeader/ComHeader';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComLoading from "../../Components/ComLoading/ComLoading";
import ComAddPackage from "./ComAddPackage";
import { LanguageContext } from "./../../contexts/LanguageContext";
import ComNoData from "../../Components/ComNoData/ComNoData";
import Heart from "../../../assets/heart.png";
import { getData } from "../../api/api";
import { stylesApp } from "../../styles/Styles";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ComInputSearch from '../../Components/ComInput/ComInputSearch';
import moment from "moment";
import ComSelect from "../Bills/ComSelect";

export default function AddingServicePackages() {
    const {
        text: { addingPackages },
    } = useContext(LanguageContext);
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedPriceOrder, setSelectedPriceOrder] = useState("Asc");
    const [loading, setLoading] = useState(false);
    const [displayedItems, setDisplayedItems] = useState(10);
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
        setSearchQuery(data?.search.trim());
    };

    const fetchNextPage = async (search = searchQuery) => {
        let url = `/service-package?SortColumn=price&SortDir=${selectedPriceOrder}`;
        if (selectedCategory && selectedCategory != 0) { url += `&PackageCategoryId=${selectedCategory}` }
        if (search) { url += `&Search=${encodeURIComponent(search)}` }
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
            .then((categoryResponse) => {
                const formattedCategoryData = [{ value: 0, label: "Tất cả" }].concat(
                    categoryResponse?.data?.contends.map(category => ({
                        value: category.id,
                        label: category.name,
                    }))
                );
                setCategoryData(formattedCategoryData);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log("Error fetching service-package-categories:", error);
            });
    };

    useEffect(() => {
        fetchNextPage();
    }, [selectedCategory, searchQuery, selectedPriceOrder]);

    useFocusEffect(
        useCallback(() => {
            reset();
            setLoading(!loading);
            setSearchQuery("");
            fetchNextPage("");
            setSelectedCategory(null);
            setSelectedPriceOrder("Asc");
            setDisplayedItems(10);
        }, [])
    );

    const handleCategorySelect = (id) => {
        setSelectedCategory(id);
        setDisplayedItems(10);
    };

    const handlePriceOrderSelect = (order) => {
        setSelectedPriceOrder(order);
    };

    const handleClearSearch = () => {
        setSearchQuery("");
        setDisplayedItems(10);
        fetchNextPage("");
    };

    const filteredData = data?.filter((service) => {
        const validstatus = service?.state === "Active" ? true : false // check trạng thái còn tồn tại hay ko
        const endRegistrationDate = moment(service?.endRegistrationDate);
        const hasNotExpired = moment().isSameOrBefore(endRegistrationDate, "day");
        const hasSlotsLeft = service?.registrationLimit !== 0 ? service?.totalOrder < service?.registrationLimit : service?.totalOrder >= service?.registrationLimit;
        return hasNotExpired && hasSlotsLeft && validstatus;
    });

    const handleLoadMore = () => {
        setDisplayedItems(prevCount => prevCount + 10);
    };

    const priceData = [
        { value: "Asc", label: "Giá: Tăng dần" },
        { value: "Desc", label: "Giá: Giảm dần" }
    ];

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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                    <ComSelect
                        name="status"
                        options={categoryData}
                        control={control}
                        errors={errors}
                        style={{ width: '49%' }}
                        onChange={handleCategorySelect}
                    />
                    <ComSelect
                        name="price"
                        options={priceData}
                        control={control}
                        errors={errors}
                        style={{ width: '49%' }}
                        onChange={handlePriceOrderSelect}
                    />
                </View>
                {loading ? (
                    <ComLoading show={true} />
                ) : (
                    filteredData?.length === 0 ? (
                        <ComNoData>Không có dịch vụ nào</ComNoData>
                    ) : (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}>
                            {filteredData.slice(0, displayedItems).map((item, index) => (
                                <ComAddPackage key={index} data={item} />
                            ))}
                            {displayedItems < filteredData?.length &&
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <TouchableOpacity onPress={handleLoadMore}>
                                        <Text style={{ fontSize: 16, textAlign: "center", color: "#33B39C"}}>Xem thêm</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            <View style={{ height: 100 }} />
                        </ScrollView>
                    ))}
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
