import React, { useContext, useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';
import { FormProvider, useForm } from "react-hook-form";
import ComHeader from '../../../Components/ComHeader/ComHeader';
import ComInputSearch from "../../../Components/ComInput/ComInputSearch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComNoData from "../../../Components/ComNoData/ComNoData";
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
    const [displayedItems, setDisplayedItems] = useState(10);
    const { user } = useAuth();
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);

    const fetchNextPage = async () => {
        setLoading(true);
        getData(`/orders?UserId=${user?.id}&Status=Paid&SortColumn=createdAt&SortDir=Desc`, {})
            .then((orders) => {//lọc những order ko có service
                const filteredOrders = orders?.data?.contends.filter(order => order.orderDetails[0]?.servicePackage !== null);
                setData(filteredOrders);
                setLoadMoreLoading(false);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setLoadMoreLoading(false);
                console.error("Error getData fetching orders items:", error);
            });
    };

    useFocusEffect(
        useCallback(() => {
            setData([]);
            fetchNextPage()
            setDisplayedItems(10);
        }, [])
    );

    const handleLoadMore = () => {
        setDisplayedItems(prevCount => prevCount + 10);
    };

    return (
        <>
            <ComHeader
                showBackIcon={true}
                showTitle={true}
                title={addingPackages?.history?.title}
            />
            <View style={styles.container}>
                {loading ? (
                    <ComLoading show={true} />
                ) : (
                    data?.length == 0 ? (<ComNoData>Không có dịch vụ nào</ComNoData>
                    ) : (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            style={styles.scrollView}
                        >
                            <View>
                                {data?.slice(0, displayedItems)?.map((value, index) => (
                                    <View key={index}>
                                        {value?.orderDetails?.map((orderDetail, detailIndex) => (
                                            <ComServiceHistoryPackage key={detailIndex} data={orderDetail} orderData={value} />
                                        ))}
                                    </View>
                                ))}
                            </View>
                            {
                                displayedItems < data?.length && (
                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ width: "35%" }}>
                                            {loadMoreLoading ? (<ActivityIndicator />) :
                                                (<ComSelectButton onPress={handleLoadMore}>Xem thêm</ComSelectButton>)}
                                            <View style={{ height: 20 }} />
                                        </View>
                                    </View>
                                )
                            }
                        </ScrollView>
                    ))}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
