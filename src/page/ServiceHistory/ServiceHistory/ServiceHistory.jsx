import React, { useContext, useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';
import { FormProvider, useForm } from "react-hook-form";
import ComHeader from '../../../Components/ComHeader/ComHeader';
import ComInputSearch from "../../../Components/ComInput/ComInputSearch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComLoading from "../../../Components/ComLoading/ComLoading";
import ComServiceHistoryPackage from "./ComServiceHistoryPackage";
import { LanguageContext } from "./../../../contexts/LanguageContext";
import { postData, getData } from "../../../api/api";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAuth } from "../../../../auth/useAuth";
import ComSelectButton from "../../../Components/ComButton/ComSelectButton";

export default function ServiceHistory() {
    const {
        text: { addingPackages },
        setLanguage,
    } = useContext(LanguageContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const [page, setPage] = useState(1); // Track pagination page
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // Track if there are more items to load

    const fetchNextPage = async () => {
        setLoadMoreLoading(true);
        getData(`/orders?UserId=${user?.id}&Status=Paid&PageIndex=${page}&PageSize=10`, {})
            .then((orders) => {//lọc những order ko có service
                const filteredOrders = orders?.data?.contends.filter(order => order.orderDetails[0]?.servicePackage !== null);
                const newItems = filteredOrders || [];
                setData(prevData => [...prevData, ...newItems]);
                setPage(prevPage => prevPage + 1);
                setLoadMoreLoading(false);
                setLoading(false);
                setHasMore(page < orders?.data?.totalPages);
            })
            .catch((error) => {
                setLoading(false);
                setLoadMoreLoading(false);
                console.error("Error getData fetching orders items:", error);
            });
    };

    useFocusEffect(
        useCallback(() => {
            setPage(1);
            setData([]);
            fetchNextPage()
        }, [])
    );

    // const searchSchema = yup.object().shape({
    //     search: yup.string(),
    // });
    // const methods = useForm({
    //     resolver: yupResolver(searchSchema),
    //     defaultValues: {
    //         search: "",
    //     },
    // });

    // const {
    //     control,
    //     handleSubmit,
    //     formState: { errors },
    // } = methods;

    // const onSubmit = (data) => {
    //     console.log("====================================");
    //     console.log(data);
    //     console.log("====================================");
    //     setLoading(!loading);
    // };
    return (
        <>
            <ComHeader
                showBackIcon={true}
                showTitle={true}
                title={addingPackages?.history?.title}
            />
            <View style={styles.container}>
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
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <View style={{ width: "35%" }}>
                                {loadMoreLoading ? (<ActivityIndicator />) :
                                    (<ComSelectButton onPress={fetchNextPage} disable={!hasMore}>Xem thêm</ComSelectButton>)}
                                <View style={{ height: 20 }} />
                            </View>
                        </View>
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
