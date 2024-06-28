import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { FormProvider, useForm } from "react-hook-form";
import ComHeader from '../../Components/ComHeader/ComHeader';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import ComInputSearch from "../../Components/ComInput/ComInputSearch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComLoading from "../../Components/ComLoading/ComLoading";
import ComFeedback from "./ComFeedback";
import { LanguageContext } from "../../contexts/LanguageContext";
import { postData, getData } from "../../api/api";
import { useAuth } from "../../../auth/useAuth";

export default function FeedbackHistory() {
    const { user } = useAuth();

    const {
        text: { feedback },
        setLanguage,
    } = useContext(LanguageContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        setLoading(!loading);
        getData(`/feedback?UserId=${user?.id}`, {})
            .then((feedbacks) => {
                setData(feedbacks?.data?.contends);
                setLoading(loading);
            })
            .catch((error) => {
                setLoading(loading);
                console.error("Error getData fetching feedbacks items:", error);
            });
    }, []);
    return (
        <>
            <ComHeader
                showBackIcon={true}
                showTitle={true}
                title={feedback?.title}
            />
            <View style={styles.container}>
                <ComLoading show={loading}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View>
                            {data?.map((value, index) => (
                                <ComFeedback key={index} data={value} />
                            ))}
                        </View>
                        <View style={{ height: 120 }}></View>
                    </ScrollView>
                </ComLoading>
            </View>
            {/* <View style={{ height: 100, backgroundColor: "#fff" }}></View> */}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 15
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
