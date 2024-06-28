import React, { useContext, useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { LanguageContext } from "../../../contexts/LanguageContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRoute } from "@react-navigation/native";
import ComButtonDay from "../../../Components/ComButton/ComButtonDay";
import ComHealthIndex from "../../../Components/ComHealthIndex/ComHealthIndex";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import ComHeader from "../../../Components/ComHeader/ComHeader";
import { postData, getData } from "../../../api/api";
import User_fill from "../../../../assets/User_fill.png"

export default function HealthMonitorIndexList() {
    const route = useRoute();
    const { data } = route.params;
    console.log("HealthMonitorIndexList", data[0]?.healthReportDetails[0]?.healthCategoryId)

    const {
        text: {
            HealthMonitorDetail,
            common: { button },
        },
        setLanguage,
    } = useContext(LanguageContext);

    // const groupedData = data.reduce((acc, item) => {
    //     const healthCategoryId = item?.healthReportDetails?.healthCategoryId;
    //     acc[healthCategoryId] = acc[healthCategoryId] || [];
    //     acc[healthCategoryId].push(item);
    //     return acc;
    // }, {});

    const groupedHealthReportDetails = data.reduce((acc, report) => {
        report.healthReportDetails.forEach((detail) => {
          if (!acc[detail.healthCategoryId]) {
            acc[detail.healthCategoryId] = [];
          }
          acc[detail.healthCategoryId].push(detail);
        });
        return acc;
      }, {});

    return (
        <>
            <ComHeader
                title={HealthMonitorDetail?.title}
                showTitle
                showBackIcon
            />
            <View style={styles.body}>
                <Text>HealthMonitorIndexList</Text>
                {
                    // Object.entries(groupedData).map(([healthCategoryId, items]) => (
                    //     <View key={healthCategoryId}>
                    //         <Text style={styles.dateHeader}>{healthCategoryId}</Text>
                    //         {items[0] && ( // Chỉ hiển thị nếu có mục cho ngày đó
                    //             <ComHealthMonitor data={items[0]} />
                    //         )}
                    //     </View>
                    // ))
                    console.log(" groupedData", Object.entries(groupedHealthReportDetails[2]))

                }
            </View>
        </>

    )

}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
    },
    patient: {
        flexDirection: "row",
    },
    patient60: {
        flex: 0.7,
    },
    patient40: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center",
    },
});
