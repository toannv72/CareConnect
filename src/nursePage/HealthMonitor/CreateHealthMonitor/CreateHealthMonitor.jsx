import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
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

export default function CreateHealthMonitor({ data }) {

    const {
        text: { NurseHealthMonitor },
        setLanguage,
    } = useContext(LanguageContext);
    const navigation = useNavigation();

    const loginSchema = yup.object().shape({
        // fullName: yup.string().trim().required(EditProfile?.message?.fullName),
        // gender: yup.string().trim().required(EditProfile?.message?.gender),
        // dateOfBirth: yup
        //     .string()
        //     .trim()
        //     .required(EditProfile?.message?.dateOfBirth),
        // phoneNumber: yup
        //     .string()
        //     .trim()
        //     .required(EditProfile?.message?.phoneNumber),
        // email: yup
        //     .string()
        //     .email(EditProfile?.message?.emailInvalid)
        //     .trim()
        //     .required(EditProfile?.message?.email),
        // idNumber: yup.string().trim().required(EditProfile?.message?.idNumber),
        // address: yup.string().trim().required(EditProfile?.message?.address),
    });

    const methods = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {

        },
    });
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = methods;

    const statusData = [
        {
            value: "1",
            label: "Bình thường",
        },
        {
            value: "2",
            label: "Bất thường",
        },
    ];
    return (
        <>
            <ComHeader
                showBackIcon
                showTitle
                title={NurseHealthMonitor?.createHealthMonitor}
            />
            <View style={styles.body}>
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={HealthMonitor}
                        style={{
                            height: 180,
                            objectFit: "fill",
                        }}
                    />
                </View>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>{NurseHealthMonitor?.healthIndex}</Text>
                <View style={styles.container}>
                    <FormProvider {...methods}>
                        <View style={{ width: "100%", gap: 10, flex: 1 }}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            >
                                <View style={styles?.index}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            gap: 10,
                                        }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <ComInput
                                                label={"Huyết áp(mmHg)"}
                                                placeholder={"Huyết áp(mmHg)"}
                                                name="fullName"
                                                control={control}
                                                keyboardType="default" // Set keyboardType for First Name input
                                                errors={errors} // Pass errors object
                                                required
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <ComSelect
                                                label={"Trạng thái"}
                                                name="gender"
                                                control={control}
                                                errors={errors} // Pass errors object
                                                options={statusData}
                                                required
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, marginVertical: 5 }}>
                                        <ComInput
                                            label={"Ghi chú"}
                                            placeholder={"Ghi chú"}
                                            name="fullName"
                                            control={control}
                                            keyboardType="default" // Set keyboardType for First Name input
                                            errors={errors} // Pass errors object
                                            required
                                        />
                                    </View>
                                </View>
                                <View style={styles?.index}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            gap: 10,
                                        }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <ComInput
                                                label={"Huyết áp(mmHg)"}
                                                placeholder={"Huyết áp(mmHg)"}
                                                name="fullName"
                                                control={control}
                                                keyboardType="default" // Set keyboardType for First Name input
                                                errors={errors} // Pass errors object
                                                required
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <ComSelect
                                                label={"Trạng thái"}
                                                name="gender"
                                                control={control}
                                                errors={errors} // Pass errors object
                                                options={statusData}
                                                required
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, marginVertical: 5 }}>
                                        <ComInput
                                            label={"Ghi chú"}
                                            placeholder={"Ghi chú"}
                                            name="fullName"
                                            control={control}
                                            keyboardType="default" // Set keyboardType for First Name input
                                            errors={errors} // Pass errors object
                                            required
                                        />
                                    </View>
                                </View>
                                <View style={styles?.index}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            gap: 10,
                                        }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <ComInput
                                                label={"Huyết áp(mmHg)"}
                                                placeholder={"Huyết áp(mmHg)"}
                                                name="fullName"
                                                control={control}
                                                keyboardType="default" // Set keyboardType for First Name input
                                                errors={errors} // Pass errors object
                                                required
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <ComSelect
                                                label={"Trạng thái"}
                                                name="gender"
                                                control={control}
                                                errors={errors} // Pass errors object
                                                options={statusData}
                                                required
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, marginVertical: 5 }}>
                                        <ComInput
                                            label={"Ghi chú"}
                                            placeholder={"Ghi chú"}
                                            name="fullName"
                                            control={control}
                                            keyboardType="default" // Set keyboardType for First Name input
                                            errors={errors} // Pass errors object
                                            required
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1, marginVertical: 5 }}>
                                    <ComInput
                                        label={"Ghi chú tổng quát"}
                                        placeholder={"Ghi chú tổng quát"}
                                        name="fullName"
                                        control={control}
                                        keyboardType="default" // Set keyboardType for First Name input
                                        errors={errors} // Pass errors object
                                        required
                                    />
                                </View>
                            </ScrollView>
                            <ComButton>Xác nhận</ComButton>
                        </View>
                    </FormProvider>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#fff",
        paddingHorizontal: 20
    },
    container: {
        flex: 1,
    },
    index: {
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#A3A3A3",
        borderStyle: "dashed"
    }
})