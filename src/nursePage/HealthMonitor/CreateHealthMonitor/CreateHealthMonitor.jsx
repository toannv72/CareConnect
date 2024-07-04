import React, { useContext } from "react";
import { View, StyleSheet, ScrollView, Image, Text, KeyboardAvoidingView } from 'react-native';
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import HealthMonitor from "../../../../assets/images/HealthMonitor/HealthMonitor.png";
import { useNavigation } from '@react-navigation/native';
import ComHeader from "../../../Components/ComHeader/ComHeader";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComSelect from "../../../Components/ComInput/ComSelect";
import ComInput from "../../../Components/ComInput/ComInput";
import ComButton from "../../../Components/ComButton/ComButton";
import { postData } from "../../../api/api"; // Import your API function
import Toast from 'react-native-toast-message';

export default function CreateHealthMonitor() {
    const { text: { NurseHealthMonitor } } = useContext(LanguageContext);
    const navigation = useNavigation();
    const route = useRoute();
    const selectedIndexs = route.params?.selectedIndexs || [];
    const statusData = [
        { value: "Normal", label: "Bình thường" },
        { value: "Warning", label: "Bất thường" },
        // { value: "Critical", label: "Nguy hiểm" },
    ];

    const showToast = (type, text1, text2, position) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            position: position
        });
    }

    const loginSchema = yup.object().shape({
        notes: yup.string().required('Vui lòng nhập ghi chú tổng quát'),
        ...selectedIndexs.reduce((acc, category) => {
            category?.measureUnitsActive.forEach(unit => {
                acc[`value_${unit.id}`] = yup
                    .string()
                    .required('Vui lòng nhập kết quả')
                    .matches(/^\d+(\.\d{1,2})?$/, 'Kết quả phải là số dương và không quá hai chữ số thập phân')
                    .test('is-positive', 'Kết quả phải là số dương', value => parseFloat(value) > 0 || value === "")
                acc[`status_${unit.id}`] = yup.string().required('Vui lòng nhập trạng thái');
            });
            return acc;
        }, {})
    });

    const methods = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            // Set default values for status fields here
            ...selectedIndexs.reduce((acc, category) => {
                category.measureUnitsActive.forEach(unit => {
                    acc[`status_${unit.id}`] = "Normal";
                    acc[`note_${unit.id}`] = "";
                });
                return acc;
            }, {})
        }
    });

    const { control, handleSubmit, formState: { errors } } = methods;

    const onSubmit = (data) => {
        const healthReportDetails = selectedIndexs.map((category) => ({
            healthCategoryId: category.id,
            healthReportDetailMeasures: category?.measureUnitsActive.map((unit) => ({
                value: data[`value_${unit.id}`],
                status: data[`status_${unit.id}`],
                note: data[`note_${unit.id}`],
                measureUnitId: unit.id,
            })),
        }));

        const formattedData = {
            elderId: 2, // Replace with actual elderId if available
            notes: data.notes,
            healthReportDetails,
        };

        console.log("Formatted Data: ", formattedData);
        console.log("healthReportDetailMeasures: ", formattedData?.healthReportDetails[0]?.healthReportDetailMeasures);

        // Send data to API
        postData("/health-report", formattedData)
            .then((response) => {
                console.log("API Response: ", response);
                showToast("success", "Tạo báo cáo thành công", "", "bottom")
                navigation.navigate("ListHealthMonitor");
            })
            .catch((error) => {
                console.error("API Error: ", error);
                showToast("error", "Có lỗi xảy ra, vui lòng thử lại!", "", "bottom")
            });
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
                                                    <View style={{ flex: 1 }}>
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
                                                    <View style={{ flex: 1 }}>
                                                        <ComSelect
                                                            label={"Trạng thái"}
                                                            name={`status_${unit.id}`}
                                                            control={control}
                                                            errors={errors}
                                                            options={statusData}
                                                            required
                                                        />
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
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});
