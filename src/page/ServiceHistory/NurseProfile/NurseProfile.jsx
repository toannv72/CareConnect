import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, StyleSheet, View } from "react-native";
import { LanguageContext } from "../../../contexts/LanguageContext";
import ComInput from "../../../Components/ComInput/ComInput";
import ComSelect from "../../../Components/ComInput/ComSelect";
import { ScrollView } from "react-native";
import ComHeader from "../../../Components/ComHeader/ComHeader";
import moment from 'moment';
import { postData, getData } from "../../../api/api";

export default function UserNurseProfile() {
    const [loading, setLoading] = useState(false);
    const [nurse, setNurse] = useState({});
    const route = useRoute();
    const { id } = route.params;

    const {
        text: {
            EditProfile,
            UserProfile,
            common: { button },
        },
    } = useContext(LanguageContext);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            getData(`/users/${id}`, {})
                .then((users) => {
                    setNurse(users?.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.log("Error getData fetching items:", error);
                });
        }, [])
    );

    useEffect(() => {
        if (nurse) {
            setValue("fullName", nurse.fullName ?? "");
            setValue("email", nurse.email ?? "");
            setValue("gender", nurse.gender ?? "");
            setValue("dateOfBirth", moment(nurse.dateOfBirth, "YYYY-MM-DD").format("DD/MM/YYYY") ?? "");
            setValue("phoneNumber", nurse.phoneNumber ?? "");
        }
    }, [nurse, setValue]);
    const methods = useForm({
        resolver: yupResolver(),
        defaultValues: {
            fullName: nurse?.fullName ?? "",
            email: nurse?.email ?? "",
            gender: nurse?.gender ?? "",
            dateOfBirth: moment(nurse?.dateOfBirth, "YYYY-MM-DD").format("DD/MM/YYYY") ?? "",
            phoneNumber: nurse?.phoneNumber ?? "",
        },
    });
    const { control, formState: { errors }, setValue } = methods;

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

    return (
        <>
            <ComHeader
                title= "Thông tin điều dưỡng"
                showTitle
                showBackIcon
            />
            <View style={styles.body}>
                <View style={styles.container}>
                    <FormProvider {...methods}>
                        <View style={{ width: "100%", gap: 10, flex: 1 }}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            >
                                <View style={styles.avatarContainer}>
                                    <Image
                                        source={{
                                            uri: nurse?.avatarUrl ? nurse?.avatarUrl : "https://firebasestorage.googleapis.com/v0/b/careconnect-2d494.appspot.com/o/images%2F3be127ed-a90e-4364-8160-99338def0144.png?alt=media&token=3de8a6cb-0986-4347-9a22-eb369f7d02ff",
                                        }}
                                        style={styles.avatar}
                                    />
                                </View>

                                <View style={{ gap: 10 }}>
                                    <ComInput
                                        label={EditProfile?.label?.fullName}
                                        placeholder={EditProfile?.placeholder?.fullName}
                                        name="fullName"
                                        control={control}
                                        keyboardType="default" // Set keyboardType for First Name input
                                        errors={errors} // Pass errors object
                                        edit={false}
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
                                                errors={errors} // Pass errors object
                                                options={genderOptions}
                                                enabled={false}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <ComInput
                                                label={EditProfile?.label?.dateOfBirth}
                                                placeholder={EditProfile?.label?.dateOfBirth}
                                                name="dateOfBirth"
                                                control={control}
                                                errors={errors} // Pass errors object
                                                edit={false}
                                            />
                                        </View>
                                    </View>
                                    <ComInput
                                        label={EditProfile?.label?.phoneNumber}
                                        placeholder={EditProfile?.placeholder?.phoneNumber}
                                        name="phoneNumber"
                                        control={control}
                                        errors={errors} // Pass errors object
                                        edit={false}
                                    />
                                    <ComInput
                                        label={EditProfile?.label?.email}
                                        placeholder={EditProfile?.placeholder?.email}
                                        name="email"
                                        edit={false}
                                        control={control}
                                        errors={errors} // Pass errors object
                                    />
                                </View>
                            </ScrollView>
                        </View>
                    </FormProvider>
                </View>
            </View>
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
    avatarContainer: {
        position: "relative", // Quan trọng!
        alignItems: "center",
        marginBottom: 20,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 1000,
        borderWidth: 1,
        borderColor: "gray",
    },
});
