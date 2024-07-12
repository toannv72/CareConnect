import React, { useContext, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, Image, Text, KeyboardAvoidingView } from 'react-native';
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import HealthMonitor from "../../../../assets/images/HealthMonitor/HealthMonitor.png";
import { useNavigation } from '@react-navigation/native';
import ComHeader from "../../../Components/ComHeader/ComHeader";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComInput from "../../../Components/ComInput/ComInput";
import ComButton from "../../../Components/ComButton/ComButton";
import { postData } from "../../../api/api";
import Toast from 'react-native-toast-message';
import moment from "moment";

export default function CreateHealthMonitor() {
    const { text: { NurseHealthMonitor } } = useContext(LanguageContext);
    const navigation = useNavigation();
    const route = useRoute();
    const { selectedIndexs, elderId } = route.params || [];
    const previousValues = useRef({});
    const showToast = (type, text1, text2, position) => { Toast.show({ type: type, text1: text1, text2: text2, position: position }) }

    const loginSchema = yup.object().shape({
        notes: yup.string().required('Vui lòng nhập ghi chú tổng quát'),
        ...selectedIndexs.reduce((acc, category) => {
            category?.measureUnitsActive.forEach(unit => {
                acc[`value_${unit.id}`] = yup.string()
                    .required('Vui lòng nhập kết quả')
                    .matches(/^\d+(\.\d{1,2})?$/, 'Kết quả phải là số dương và không quá hai chữ số thập phân')
                    .test('is-positive', 'Kết quả phải là số dương', value => parseFloat(value) > 0 || value === "")
            });
            return acc;
        }, {})
    });

    const methods = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            ...selectedIndexs.reduce((acc, category) => {
                category.measureUnitsActive.forEach(unit => {
                    acc[`status_${unit.id}`] = "Normal";
                    acc[`note_${unit.id}`] = "";
                });
                return acc;
            }, {})
        }
    });

    const { control, handleSubmit, setValue, formState: { errors } } = methods;
    const updateStatus = (unit, value) => {
        if (value === "") return;
        const floatValue = parseFloat(value);
        const newStatus = floatValue >= unit.minValue && floatValue <= unit.maxValue ? "Normal" : "Warning";
        setValue(`status_${unit.id}`, newStatus);
    };

    selectedIndexs.forEach(category => {
        category.measureUnitsActive.forEach(unit => {
            const value = useWatch({
                control,
                name: `value_${unit.id}`,
                defaultValue: ""
            });
            useEffect(() => {
                if (previousValues.current[unit.id] !== value) {
                    updateStatus(unit, value);
                    previousValues.current[unit.id] = value;
                }
            }, [value, unit]);
        });
    });

    const onSubmit = (data) => {
        const day = new Date().getDate().toString().padStart(2, "0");
        const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
        const year = new Date().getFullYear();
       
        const healthReportDetails = selectedIndexs.map((category) => ({
            healthCategoryId: category.id,
            healthReportDetailMeasures: category?.measureUnitsActive.map((unit) => ({
                value: data[`value_${unit.id}`],
                note: data[`note_${unit.id}`],
                measureUnitId: unit.id,
            })),
        }));

        const formattedData = {
            elderId: elderId, // Replace with actual elderId if available
            notes: data.notes,
            healthReportDetails,
            date: `${year}-${month}-${day}`
        };
        console.log("CreateHealthMonitor ", formattedData?.date)

        postData("/health-report", formattedData)
            .then((response) => {
                showToast("success", "Tạo báo cáo thành công", "", "bottom");
                navigation.navigate("ListHealthMonitor", {id: elderId});
            })
            .catch((error) => {
                console.error("API Error: ", error);
                showToast("error", "Có lỗi xảy ra, vui lòng thử lại!", "", "bottom");
            });
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'Normal':
                return { text: 'Bình thường', color: '#000' };
            case 'Warning':
                return { text: 'Bất thường', color: 'red' };
            default:
                return status;
        }
    };

    return (
        <>
            <ComHeader showBackIcon showTitle title={NurseHealthMonitor?.createHealthMonitor} />
            <KeyboardAvoidingView style={styles.body}>
                <View style={styles.container}>
                    <FormProvider {...methods}>
                        <View style={{ width: "100%", gap: 10, flex: 1 }}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}>
                                <View style={{ alignItems: "center" }}>
                                    <Image source={HealthMonitor} style={{ height: 160, objectFit: "fill" }} />
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: "600" }}>{NurseHealthMonitor?.healthIndex}</Text>
                                {selectedIndexs.map((item, index) => (
                                    <View style={styles.index} key={index}>
                                        <Text style={{ fontWeight: "600", fontSize: 16, marginVertical: 10 }}>{item?.name}</Text>
                                        {item?.measureUnitsActive.map((unit, unitIndex) => (
                                            <View key={unitIndex}>
                                                <Text style={{ fontWeight: "600", fontSize: 16, marginVertical: 10 }}>{unit?.name + " (" + unit?.unitType + ")"}</Text>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                                                    <View style={{ flex: 0.6 }}>
                                                        <ComInput
                                                            label={"Kết quả"}
                                                            placeholder={"Kết quả"}
                                                            name={`value_${unit.id}`}
                                                            control={control}
                                                            keyboardType="number-pad"
                                                            errors={errors}
                                                            required
                                                        />
                                                    </View>
                                                    <View style={{ flex: 0.4 }}>
                                                        <View style={styles.labelContainer}>
                                                            <Text style={{ fontWeight: "bold", marginRight: 4, }}>Trạng thái</Text>
                                                        </View>
                                                        <View style={[styles.status, { justifyContent: "center" }]}>
                                                            <Text style={{ color: getStatusText(methods.watch(`status_${unit?.id}`))?.color }}>{getStatusText(methods.watch(`status_${unit?.id}`))?.text}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 1, marginVertical: 5 }}>
                                                    <ComInput
                                                        label={"Ghi chú"}
                                                        placeholder={"Ghi chú"}
                                                        name={`note_${unit.id}`}
                                                        control={control}
                                                        keyboardType="default"
                                                        errors={errors}
                                                    />
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                ))}
                                <View style={{ flex: 1, marginVertical: 5 }}>
                                    <ComInput
                                        label={"Ghi chú tổng quát"}
                                        placeholder={"Ghi chú tổng quát"}
                                        name="notes"
                                        control={control}
                                        keyboardType="default"
                                        errors={errors}
                                        required
                                    />
                                </View>
                            </ScrollView>
                            <ComButton onPress={handleSubmit(onSubmit)}>Xác nhận</ComButton>
                        </View>
                    </FormProvider>
                </View>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
    },
    index: {
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#A3A3A3",
        borderStyle: "dashed",
    },
    status: {
        backgroundColor: "#fff",
        height: 50,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#33B39C",
        color: "#000",
        elevation: 5, // Bóng đổ cho Android
        shadowColor: "#000", // Màu của bóng đổ cho iOS
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    labelContainer: {
        marginBottom: 4,
    },
});
