import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import ComHealthIndex from "../../../Components/ComHealthIndex/ComHealthIndex";
import ComHeader from "../../../Components/ComHeader/ComHeader";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ScrollView } from "react-native-gesture-handler";

export default function HealthMonitorIndexList() {
    const route = useRoute();
    const { healthMonitor, id, date, index } = route.params;

    const {
        text: {
            HealthMonitorDetail,
        },
    } = useContext(LanguageContext);

    // Filter healthMonitor by createdAt date
    const filteredHealthMonitor = healthMonitor.filter(item => {
        // Extract the date portion from the createdAt string
        const createdAtDate = item?.createdAt.split('T')[0];
        const formattedDate = date.split('T')[0];
        return createdAtDate === formattedDate;
    });

    const filteredHealthReportDetails = [];

    // Lặp qua mảng filteredHealthMonitor để thu thập chi tiết
    filteredHealthMonitor.forEach(item => {
        // Lọc các chi tiết trong mỗi item dựa trên healthCategoryId
        const details = item?.healthReportDetails.filter(detail => detail?.healthCategoryId === id);

        // Thêm trường createdAt vào mỗi đối tượng chi tiết
        details.forEach(detail => {
            filteredHealthReportDetails.push({
                ...detail,
                createdAt: item.createdAt, // Thêm trường createdAt từ item
                creatorInfo: item.creatorInfo.fullName
            });
        });
    });

    const formattedTime = (dateValue) => {
        const date = new Date(dateValue);

        // Format time: hh:mm
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        // Format date: DD/MM/YYYY
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-indexed month
        const year = date.getFullYear();

        return `${hours}:${minutes} - ${day}/${month}/${year}`;
    };

    const ComTimeDivision = ({ time }) => {
        return (
            <View style={{ flexDirection: "row", marginVertical: 10, gap: 10, alignItems: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>{time}</Text>
                <View style={{ borderBottomColor: "#33B39C", borderBottomWidth: 1, flex: 1, height: 0 }}></View>
            </View>
        );
    };

    const loginSchema = yup.object().shape({});
    const methods = useForm({
        resolver: yupResolver(loginSchema),
        values: {
        },
    });

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = methods;

    return (
        <>
            <ComHeader
                title={HealthMonitorDetail?.title}
                showTitle
                showBackIcon
            />
            <View style={styles.body}>
                <Text style={{ fontWeight: "600", fontSize: 16, textAlign: "center" }}>{filteredHealthReportDetails[0]?.healthCategory?.name}</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    {filteredHealthReportDetails.map((detail, detailindex) => (
                        <View style={{ gap: 5, marginVertical: 5 }}>
                            <ComTimeDivision time={`${formattedTime(detail?.createdAt)}`} />
                            <ComHealthIndex key={detailindex} data={detail} clickable={false} />
                            <ComTextArea
                                label={"Người thực hiện"}
                                placeholder={"Người thực hiện"}
                                name="email"
                                edit={false}
                                control={control}
                                keyboardType="default" // Set keyboardType for First Name input
                                errors={errors}
                                defaultValue={detail?.creatorInfo}
                            />
                            <ComTextArea
                                label={"Ghi chú"}
                                placeholder={"Ghi chú"}
                                name="email"
                                edit={false}
                                control={control}
                                keyboardType="default" // Set keyboardType for First Name input
                                errors={errors}
                                defaultValue={detail?.healthReportDetailMeasures[0]?.note}
                            />
                        </View>

                    ))}
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
    },
});
