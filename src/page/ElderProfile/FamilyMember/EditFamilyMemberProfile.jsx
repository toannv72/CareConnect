import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, ActivityIndicator, View, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import * as yup from "yup";
import { LanguageContext } from "../../../contexts/LanguageContext";
import ComInput from "../../../Components/ComInput/ComInput";
import ComButton from "../../../Components/ComButton/ComButton";
import ComToast from "../../../Components/ComToast/ComToast";
import ComSelect from "../../../Components/ComInput/ComSelect";
import ComDatePicker from "../../../Components/ComInput/ComDatePicker";
import { ScrollView } from "react-native";
import ComHeader from "../../../Components/ComHeader/ComHeader";
import { getData, putData } from "../../../api/api";
import moment from "moment";

export default function EditFamilyMemberProfile() {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const { memberData, canEdit } = route.params || {}

    const {
        text: { EditProfile, Register, common: { button } },
    } = useContext(LanguageContext);

    const loginSchema = yup.object().shape({
        name: yup
            .string()
            .trim()
            .required(Register?.message?.name),
        gender: yup
            .string()
            .required(EditProfile?.message?.gender),
        dateOfBirth: yup
            .date()
            .required(EditProfile?.message?.dateOfBirth),
        email: yup
            .string()
            .email(EditProfile?.message?.emailInvalid)
            .trim()
            .required(EditProfile?.message?.email),
        address: yup.string().trim().required(EditProfile?.message?.address),
        phoneNumber: yup
            .string()
            .trim()
            .required(Register?.message?.phoneRequired)
            .matches(/^0\d{9,10}$/, Register?.message?.phoneInvalid),
    });

    const methods = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            name: memberData?.name ?? "",
            email: memberData?.email ?? "",
            gender: memberData?.gender ?? "",
            relationship: memberData?.relationship ?? "",
            dateOfBirth: memberData?.dateOfBirth ? new Date(memberData?.dateOfBirth) : new Date(),
            phoneNumber: memberData?.phoneNumber ?? "",
            address: memberData?.address ?? ""
        },
    });

    const { control, handleSubmit, formState: { errors }, setValue } = methods;

    const handleUpdate = (data) => {
        setLoading(true);
        Keyboard.dismiss();
        const newData = {
            ...data,
            dateOfBirth: formattedDate(new Date(data?.dateOfBirth)),
        };

        const handleUpdateData = (newData) => {
            putData("/family-member", memberData?.id, newData, {})
                .then((data) => {
                    setLoading(false);
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            ComToast({ text: 'Cập nhật thông tin thành công' });
                            navigation.navigate("FamilyMemberProfile", { familyId: memberData?.id, canEdit: canEdit });
                            resolve();
                        }, 0);
                    });
                })
                .catch((error) => {
                    setLoading(false)
                    if (error.response.status === 600)
                        ComToast({ text: 'Số điện thoại của người giám hộ này đã tồn tại. Vui lòng thử lại.' });
                    else
                        ComToast({ text: 'Cập nhật thông tin thất bại' });
                });
        };

        handleUpdateData(newData);
    }

    const genderOptions = [
        {
            value: "Male",
            label: "Nam",
        },
        {
            value: "Female",
            label: "Nữ",
        }
    ];

    const relationshipOptions = [
        {
            value: "Ba/mẹ",
            label: "Ba/mẹ",
        },
        {
            value: "Anh/Em",
            label: "Anh/Em",
        },
        {
            value: "Con",
            label: "Con",
        },
        {
            value: "Cháu",
            label: "Cháu",
        },
        {
            value: "Khác",
            label: "Khác",
        },
    ]

    const formattedDate = (dateValue) => {
        if (!dateValue || !(dateValue instanceof Date)) {
            return "";
        }
        const day = dateValue.getDate().toString().padStart(2, "0");
        const month = (dateValue.getMonth() + 1).toString().padStart(2, "0");
        const year = dateValue.getFullYear();
        return `${year}-${month}-${day}`;
    };

    return (
        <>
            <ComHeader
                title={EditProfile?.title}
                showTitle
                showBackIcon
            />
            <KeyboardAvoidingView style={styles.body} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.container}>
                    <FormProvider {...methods}>
                        <View style={{ width: "100%", gap: 10, flex: 1 }}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            >
                                <View style={{ gap: 10 }}>
                                    <ComInput
                                        label={EditProfile?.label?.name}
                                        placeholder={EditProfile?.placeholder?.name}
                                        name="name"
                                        control={control}
                                        keyboardType="default"
                                        errors={errors}
                                        required
                                    />
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            gap: 10,
                                        }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <ComSelect
                                                label={EditProfile?.label?.gender}
                                                name="gender"
                                                control={control}
                                                errors={errors}
                                                options={genderOptions}
                                                enabled={true}
                                                required
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <ComDatePicker
                                                label={EditProfile?.label?.dateOfBirth}
                                                placeholder={EditProfile?.placeholder?.dateOfBirth}
                                                name="dateOfBirth"
                                                control={control}
                                                errors={errors}
                                                enabled={true}
                                                required
                                                maximumDate={moment().subtract(18, "years").toDate()}
                                                minimumDate={moment().subtract(100, "years").toDate()}
                                            />
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            gap: 10,
                                        }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <ComSelect
                                                label="Mối quan hệ"
                                                name="relationship"
                                                control={control}
                                                errors={errors}
                                                options={relationshipOptions}
                                                enabled={true}
                                                required
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <ComInput
                                                label={EditProfile?.label?.phoneNumber}
                                                placeholder={EditProfile?.placeholder?.phoneNumber}
                                                name="phoneNumber"
                                                control={control}
                                                keyboardType="default"
                                                errors={errors}
                                                required
                                            />
                                        </View>
                                    </View>
                                    <ComInput
                                        label={EditProfile?.label?.email}
                                        placeholder={EditProfile?.placeholder?.email}
                                        name="email"
                                        control={control}
                                        keyboardType="default"
                                        errors={errors}
                                        required
                                    />
                                    <ComInput
                                        label={EditProfile?.label?.address}
                                        placeholder={EditProfile?.placeholder?.address}
                                        name="address"
                                        control={control}
                                        errors={errors}
                                        required
                                    />
                                </View>
                            </ScrollView>
                        </View>
                        <View>
                            <ComButton
                                onPress={handleSubmit(handleUpdate)}>
                                {loading ? <ActivityIndicator color="#fff" /> : EditProfile?.button?.SaveProfile}
                            </ComButton>
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
        paddingHorizontal: 15,
        gap: 10,
    },
    container: {
        flex: 1,
    },
});
