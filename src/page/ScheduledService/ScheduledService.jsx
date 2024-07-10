import React, { useContext, useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Text, SectionList } from 'react-native';
import { useForm, FormProvider } from "react-hook-form";
import ComInputSearch from '../../Components/ComInput/ComInputSearch';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../../auth/useAuth";
import { postData, getData } from "../../api/api";
import ComNoData from "../../Components/ComNoData/ComNoData";
import ComHeader from '../../Components/ComHeader/ComHeader';
import ComScheduledService from './ComScheduledService';

export default function ScheduledService() {
    const { user } = useAuth();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    console.log(" selectedServices", selectedServices)

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            getData(`/scheduled-service?UserId=${user?.id}`, {})
                .then((scheduledService) => {
                    setData(scheduledService?.data?.contends[0]);

                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error("Error fetching service-package:", error);
                });
        }, [])
    );

    const handleSelectService = (service, isChecked) => {
        setSelectedServices((prevSelected) => {
            if (isChecked) {
                return [...prevSelected, service];
            } else {
                return prevSelected.filter(selected => selected.id !== service.id);
            }
        });
    };

    // const onConfirm = () => {
    //     const formattedData = {
    //         "method": "",
    //         "dueDate": dueDate,
    //         "description": "Thanh toán hóa đơn dịch vụ " + servicePackage?.name,
    //         "content": "Thanh toán hóa đơn dịch vụ " + servicePackage?.name,
    //         "notes": "Thanh toán hóa đơn dịch vụ " + servicePackage?.name,
    //         "orderDetails": [
    //             {
    //                 "notes": "Thanh toán hóa đơn dịch vụ " + servicePackage?.name + " cho người cao tuổi " + elder?.name,
    //                 "servicePackageId": servicePackage?.id,
    //                 "elderId": elder?.id,
    //                 "type": type,
    //                 "orderDates": transformedDates
    //             }
    //         ]
    //     }
    //     postData("/orders/service-package?returnUrl=a", formattedData)
    //     .then((response) => {
    //         console.log("API Response: ", response.message);
    //         // showToast("success", "Tạo báo cáo thành công", "", "bottom")
    //         // navigation.navigate("AddingServiceDetail", {id : servicePackage?.id});
    //         const url = response.message; // Assuming response.message contains the URL
          
    //     })
    //     .catch((error) => {
    //         console.error("API Error: ", error);
    //         // showToast("error", "Có lỗi xảy ra, vui lòng thử lại!", "", "bottom")
    //     });
    // }

    return (
        <>
            <ComHeader
                showBackIcon={true}
                showTitle={true}
                title={"Xác nhận thanh toán"}
            />
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        data?.scheduledServiceDetails?.map((item, index) => (

                            <>
                                {/* {console.log(" scheduledService", item?.servicePackage)} */}
                                <ComScheduledService
                                    key={index}
                                    data={item}
                                    onCheck={handleSelectService}
                                    isSelected={selectedServices.some(service => service.id === item.id)}
                                />
                            </>))
                    }
                    {/* <ComScheduledService data={data?.scheduledServiceDetails[0]?.servicePackage}></ComScheduledService> */}
                </ScrollView>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
    },
    header: {
        fontSize: 16,
        fontWeight: "bold"
    },
    item: {
        borderColor: "#33B39C",
        borderWidth: 1,
        padding: 10,
        borderRadius: 15,
        marginVertical: 5,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        flexWrap: "wrap"
    },
    title: {
        fontSize: 16
    }
});