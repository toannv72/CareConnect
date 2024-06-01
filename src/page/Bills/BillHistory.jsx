import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { FormProvider, useForm } from "react-hook-form";
import ComHeader from '../../Components/ComHeader/ComHeader';
import ComInputSearch from "../../Components/ComInput/ComInputSearch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComLoading from "../../Components/ComLoading/ComLoading";
import ComBill from "./ComBill";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComSelect from "../../Components/ComInput/ComSelect";

export default function BillHistory() {
    const {
        text: { bill },
        setLanguage,
    } = useContext(LanguageContext);
    const [uniqueMonths, setUniqueMonths] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const monthsSet = new Set();
        data.forEach(bill => {
            const [day, month, year] = bill.dueDate.split('/');
            monthsSet.add(`${month}/${year}`);
        });

        const uniqueMonthsWithLabels = Array.from(monthsSet).map(month => ({
            value: month,
            label: month,
        }));

        // Sắp xếp uniqueMonthsWithLabels
        uniqueMonthsWithLabels.sort((a, b) => {
            const [monthA, yearA] = a.value.split('/').map(Number);
            const [monthB, yearB] = b.value.split('/').map(Number);
            return yearA !== yearB ? yearB - yearA : monthB - monthA;
        });

        setUniqueMonths(uniqueMonthsWithLabels);
    }, [data]);

    const [data, setData] = useState([
        {
            billId: "987654321",
            contractID: "12345432",
            customer: "Nguyễn Văn B",
            elder: "Nguyễn Văn A",
            dueDate: "09/05/2024",
            payDate: "05/05/2024",
            title: "Hóa đơn tháng 10 hợp đồng số #12345432",
            service: "Gói cơ bản",
            status: "Đã thanh toán",
            paymentMethod: "Momo"
        },
        {
            billId: "987654321",
            contractID: "12345432",
            customer: "Nguyễn Văn B",
            elder: "Nguyễn Văn A",
            dueDate: "09/05/2024",
            payDate: "05/05/2024",
            title: "Hóa đơn tháng 11 hợp đồng số #12345432",
            service: "Gói cơ bản",
            status: "Đã thanh toán",
            paymentMethod: "Momo"
        },
        {
            billId: "987654321",
            contractID: "12345432",
            customer: "Nguyễn Văn B",
            elder: "Nguyễn Văn A",
            dueDate: "09/04/2024",
            payDate: "05/04/2024",
            title: "Hóa đơn tháng 12 hợp đồng số #12345432",
            service: "Gói cơ bản",
            status: "Đã thanh toán",
            paymentMethod: "Tiền mặt"
        },
        {
            billId: "987654322",
            contractID: "12345432",
            customer: "Nguyễn Văn B",
            elder: "Nguyễn Văn A",
            dueDate: "01/06/2024",
            payDate: null,
            title: "Hóa đơn dịch vụ xoa bóp tháng 06/2024",
            service: "Xoa bóp",
            status: "Chưa thanh toán",
            paymentMethod: null,
        },
        {
            billId: "987654322",
            contractID: "12345432",
            customer: "Nguyễn Văn B",
            elder: "Nguyễn Văn A",
            dueDate: "01/03/2024",
            payDate: null,
            title: "Hóa đơn dịch vụ xoa bóp tháng 06/2024",
            service: "Xoa bóp",
            status: "Chưa thanh toán",
            paymentMethod: null,
        },
        {
            billId: "987654322",
            contractID: "12345432",
            customer: "Nguyễn Văn B",
            elder: "Nguyễn Văn A",
            dueDate: "01/06/2023",
            payDate: null,
            title: "Hóa đơn dịch vụ xoa bóp tháng 06/2023",
            service: "Xoa bóp",
            status: "Đã quá hạn",
            paymentMethod: null,
        },
    ]);

    const categoryData =
        [
            { value: "all", label: "Tất cả" },
            { value: "paid", label: "Đã thanh toán" },
            { value: "unPaid", label: "Chưa thanh toán" },
            { value: "expired", label: "Đã quá hạn" }
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
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        setLoading(!loading);
    };
    return (
        <>
            <ComHeader
                showBackIcon={true}
                showTitle={true}
                title={bill?.title}
            />
            <View style={styles.container}>
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
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <ComSelect
                        name="date"
                        options={uniqueMonths}
                        control={control}
                        errors={errors}
                        required
                        style={{ width: '40%' }}
                    ></ComSelect>
                    <ComSelect
                        name="status"
                        options={categoryData}
                        control={control}
                        errors={errors}
                        required
                        style={{ width: '55%' }}
                    ></ComSelect>
                </View>

                <ComLoading show={loading}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        style={{marginBottom: 20}}
                    >
                        <View>
                            {data?.map((value, index) => (
                                <ComBill key={index} data={value} />
                            ))}
                        </View>
                        <View style={{ height: 120 }}></View>
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
        paddingHorizontal: 15,
        gap: 15
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
});
