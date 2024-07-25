import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, StyleSheet, View, Linking } from "react-native";
import * as yup from "yup";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComInput from "../../Components/ComInput/ComInput";
import ComButton from "../../Components/ComButton/ComButton";
import ComSelect from "../../Components/ComInput/ComSelect";
import ComDatePicker from "../../Components/ComInput/ComDatePicker";
import { ScrollView } from "react-native";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { useRoute } from "@react-navigation/native";
import moment from 'moment';

export default function CustomerProfile() {
    const [date, setDate] = useState(new Date());
    const navigation = useNavigation();
    const route = useRoute();
    const { userData } = route.params;

    const {
        text: {
            ElderProfile,
            EditProfile,
            common: { button },
        },
        setLanguage,
    } = useContext(LanguageContext);
    const loginSchema = yup.object().shape({});

    const methods = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            dateOfBirth: "",
            fullName: "",
            gender: "",
            phoneNumber: ""
        },
    });
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = methods;

    const genderData = [
        {
            value: "Male",
            label: "Nam",
        },
        {
            value: "Female",
            label: "Nữ",
        }
    ];

    useEffect(() => {
        const formattedDate = moment(userData?.dateOfBirth, "YYYY-MM-DD").format("DD/MM/YYYY");

        if (userData) {
            methods.reset({
                fullName: userData?.fullName,
                gender: userData?.gender,
                dateOfBirth: formattedDate,
                phoneNumber: userData?.phoneNumber,
                email: userData?.email,
            });
        }
    }, [userData]);

    const callNumber = (phoneNumber) => {
        // Sử dụng Linking.openURL để mở ứng dụng điện thoại với số đã cho
        Linking.openURL(`tel:${phoneNumber}`);
    };


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
                                            uri: userData?.avatarUrl || "https://firebasestorage.googleapis.com/v0/b/careconnect-2d494.appspot.com/o/images%2F3be127ed-a90e-4364-8160-99338def0144.png?alt=media&token=3de8a6cb-0986-4347-9a22-eb369f7d02ff",
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
                                                options={genderData}
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
                                <ComButton
                                    style={{ borderRadius: 50, marginBottom: 30 }}
                                    onPress={() => { callNumber(userData?.phoneNumber) }}>
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
