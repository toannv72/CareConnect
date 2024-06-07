import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, StyleSheet, View } from "react-native";
import * as yup from "yup";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComInput from "../../Components/ComInput/ComInput";
import ComButton from "../../Components/ComButton/ComButton";
import ComSelect from "../../Components/ComInput/ComSelect";
import ComDatePicker from "../../Components/ComInput/ComDatePicker";
import { ScrollView } from "react-native";
import ComHeader from "../../Components/ComHeader/ComHeader";

export default function CustomerProfile() {
    const [date, setDate] = useState(new Date());
    const navigation = useNavigation();
    const {
        text: {
            ElderProfile,
            EditProfile,
            common: { button },
        },
        setLanguage,
    } = useContext(LanguageContext);
    const loginSchema = yup.object().shape({
        fullName: yup.string().trim().required(EditProfile?.message?.fullName),
        gender: yup.string().trim().required(EditProfile?.message?.gender),
        dateOfBirth: yup
            .string()
            .trim()
            .required(EditProfile?.message?.dateOfBirth),
        phoneNumber: yup
            .string()
            .trim()
            .required(EditProfile?.message?.phoneNumber),
        email: yup
            .string()
            .email(EditProfile?.message?.emailInvalid)
            .trim()
            .required(EditProfile?.message?.email),
        idNumber: yup.string().trim().required(EditProfile?.message?.idNumber),
        address: yup.string().trim().required(EditProfile?.message?.address),
    });
   
    const methods = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "toan@gmail.com",
            dateOfBirth: date,
        },
    });
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = methods;

    const data = [
        {
            value: "2",
            label: "Nam",
        },
        {
            value: "3",
            label: "Nữ",
        },
    ];

    return (
        <>
            <ComHeader
                title={ElderProfile?.detail?.representative}
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
                                            uri: "https://firebasestorage.googleapis.com/v0/b/swd-longchim.appspot.com/o/376577375_998270051209102_4679797004619533760_n.jpg?alt=media&token=90d94961-bc1b-46e4-b60a-ad731606b13b",
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
                                                options={data}
                                                enabled={false}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <ComDatePicker
                                                label={EditProfile?.label?.dateOfBirth}
                                                placeholder={EditProfile?.placeholder?.dateOfBirth}
                                                name="dateOfBirth"
                                                control={control}
                                                errors={errors} // Pass errors object
                                            />
                                        </View>
                                    </View>
                                    <ComInput
                                        label={EditProfile?.label?.phoneNumber}
                                        placeholder={EditProfile?.placeholder?.phoneNumber}
                                        name="phoneNumber"
                                        control={control}
                                        keyboardType="default" // Set keyboardType for First Name input
                                        errors={errors} // Pass errors object
                                        edit={false}
                                    />
                                    <ComInput
                                        label={EditProfile?.label?.email}
                                        placeholder={EditProfile?.placeholder?.email}
                                        name="email"
                                        edit={false}
                                        control={control}
                                        keyboardType="default" // Set keyboardType for First Name input
                                        errors={errors} // Pass errors object
                                    />
                                </View>
                                <View style={{ height: 100 }}></View>
                            </ScrollView>
                            <View>
                                <ComButton style={{ borderRadius: 50, marginBottom: 30 }}>
                                    {ElderProfile?.detail?.urgentContact}
                                </ComButton>
                            </View>
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
