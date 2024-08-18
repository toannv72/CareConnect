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

    const toVietnamTime = (dateValue) => {
        const date = new Date(dateValue);
        date.setHours(date.getHours() + 7); // Convert to UTC+7
        return date;
    };

    // Filter healthMonitor by createdAt date in Vietnam time
    const filteredHealthMonitor = healthMonitor.filter(item => {
        const createdAtDate = toVietnamTime(item?.createdAt).toISOString().split('T')[0];
        const formattedDate = toVietnamTime(date).toISOString().split('T')[0];
        return createdAtDate === formattedDate;
    });

    const filteredHealthReportDetails = [];
    filteredHealthMonitor.forEach(item => {
        const details = item?.healthReportDetails.filter(detail => detail?.healthCategoryId === id);
        details.forEach(detail => {
            filteredHealthReportDetails.push({
                ...detail,
                createdAt: item.createdAt,
                creatorInfo: item.creatorInfo.fullName
            });
        });
    });

    const formattedTime = (dateValue) => {
        // const date = toVietnamTime(dateValue);
        const hours = new Date(dateValue).getHours().toString().padStart(2, '0');
        const minutes = new Date(dateValue).getMinutes().toString().padStart(2, '0');
        const day = new Date(dateValue).getDate().toString().padStart(2, '0');
        const month = (new Date(dateValue).getMonth() + 1).toString().padStart(2, '0');
        const year = new Date(dateValue).getFullYear();
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
        values: {},
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
                title="Chỉ số sức khỏe trong ngày"
                showTitle
                showBackIcon
            />
            <View style={styles.body}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    {filteredHealthReportDetails.map((detail, detailindex) => (
                        <View key={detailindex} style={{ gap: 5, marginVertical: 5 }}>
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
                                defaultValue={detail?.healthReportDetailMeasures[0]?.note || "Không có"}
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
