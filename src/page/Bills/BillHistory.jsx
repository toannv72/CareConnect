import React, { useContext, useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { FormProvider, useForm } from "react-hook-form";
import ComHeader from '../../Components/ComHeader/ComHeader';
import ComInputSearch from "../../Components/ComInput/ComInputSearch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComLoading from "../../Components/ComLoading/ComLoading";
import ComNoData from "../../Components/ComNoData/ComNoData";
import ComBill from "./ComBill";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComSelect from "./ComSelect";
import { getData } from "../../api/api";
import { useAuth } from "../../../auth/useAuth";
import { useFocusEffect } from '@react-navigation/native';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";

export default function BillHistory() {
    const {
        text: { bill },
    } = useContext(LanguageContext);
    const { user } = useAuth();

    const [uniqueMonths, setUniqueMonths] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedDate, setSelectedDate] = useState(""); // Initialize with empty string
    const [displayedItems, setDisplayedItems] = useState(10);

    const fetchNextPage = async () => {
        let url = `/orders?UserId=${user?.id}&SortColumn=createdAt&SortDir=Desc`;
        if (selectedStatus && selectedStatus != "all") { url += `&Status=${selectedStatus}` }

        getData(url, {})
            .then((orders) => {
                setData(orders?.data?.contends);
                setLoading(false);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error fetching order items:", error);
            });
    }

    useFocusEffect(
        useCallback(() => {
            setData([]);
            setLoading(!loading);
            fetchNextPage();
        }, [selectedStatus])
    );

    useEffect(() => {
        const monthsSet = new Set();
        // Lặp qua từng hóa đơn và thêm tháng và năm vào monthsSet
        data.forEach(bill => {
            const [year, month] = bill.dueDate.split('-'); // Tách năm và tháng từ dueDate
            monthsSet.add(`${month}/${year}`); // Thêm tháng và năm vào Set với định dạng MM/YYYY
        });
        // Chuyển đổi Set thành mảng và thêm nhãn (label) cho mỗi tháng
        const uniqueMonthsWithLabels = Array.from(monthsSet).map(month => ({
            value: month,
            label: month,
        }));
        // Sắp xếp uniqueMonthsWithLabels theo thứ tự giảm dần của năm và tháng
        uniqueMonthsWithLabels.sort((a, b) => {
            const [monthA, yearA] = a.value.split('/').map(Number);
            const [monthB, yearB] = b.value.split('/').map(Number);
            return yearA !== yearB ? yearB - yearA : monthB - monthA;
        });
        // Cập nhật state uniqueMonths với danh sách các tháng đã sắp xếp và có nhãn
        setUniqueMonths(uniqueMonthsWithLabels);
        // Đặt giá trị mặc định cho selectedDate là mục đầu tiên trong uniqueMonths
        if (uniqueMonthsWithLabels.length > 0) {
            setSelectedDate(uniqueMonthsWithLabels[0].value);
        }
    }, [data]);

    const categoryData = [
        { value: "all", label: "Tất cả" },
        { value: "Paid", label: "Đã thanh toán" },
        { value: "UnPaid", label: "Chưa thanh toán" },
        { value: "OverDue", label: "Đã quá hạn" }
    ];

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
        console.log("Search data:", data);
        setLoading(true);
        setLoading(false);
    };

    const filteredData = data.filter((bill) => {
        const [year, month] = bill?.dueDate.split('-');
        const formattedDate = `${month}/${year}`;
        if (selectedStatus !== "all" && bill.status !== selectedStatus) {
            return false;
        }
        if (selectedDate && formattedDate !== selectedDate) {
            return false;
        }
        return true;
    });

    const handleStatusChange = (selectedValue) => {
        setSelectedStatus(selectedValue);
        setDisplayedItems(10);
    };

    const handleDateChange = (selectedValue) => {
        setSelectedDate(selectedValue);
        setDisplayedItems(10);
    };

    const handleLoadMore = () => {
        setDisplayedItems(prevCount => prevCount + 10);
    };

    return (
        <>
            <ComHeader
                showBackIcon={true}
                showTitle={true}
                title={bill?.title}
            />
            <View style={styles.container}>
                {/* <FormProvider {...methods}>
                    <ComInputSearch
                        placeholder="Tìm kiếm"
                        keyboardType="default"
                        name="search"
                        control={control}
                        onSubmitEditing={handleSubmit(onSubmit)}
                        errors={errors}
                    />
                </FormProvider> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <ComSelect
                        name="date"
                        options={uniqueMonths}
                        control={control}
                        errors={errors}
                        style={{ width: '40%' }}
                        onChange={handleDateChange}
                        defaultValue={selectedDate} // Set default value to selectedDate
                    />
                    <ComSelect
                        name="status"
                        options={categoryData}
                        control={control}
                        errors={errors}
                        style={{ width: '55%' }}
                        onChange={handleStatusChange}
                    />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <ComLoading show={loading}>
                        {filteredData.length == 0 ? (
                            <ComNoData />
                        ) : (
                            <View>
                                <View>
                                    {filteredData.slice(0, displayedItems).map((value, index) => (
                                        <ComBill key={index} data={value} />
                                    ))}
                                </View>
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ width: "35%" }}>
                                        <ComSelectButton onPress={handleLoadMore} disable={displayedItems >= filteredData.length}>Xem thêm</ComSelectButton>
                                    </View>
                                </View>
                                <View style={{ height: 20 }}></View>
                            </View>
                        )}
                    </ComLoading>
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        gap: 15
    }
});
