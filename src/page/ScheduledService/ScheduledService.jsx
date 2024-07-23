import React, { useContext, useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Text, SectionList } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../../auth/useAuth";
import { postData, getData } from "../../api/api";
import ComNoData from "../../Components/ComNoData/ComNoData";
import ComHeader from '../../Components/ComHeader/ComHeader';
import ComScheduledService from './ComScheduledService';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import ComLoading from "../../Components/ComLoading/ComLoading";

export default function ScheduledService() {
    const { user } = useAuth();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const navigation = useNavigation();

    const formatCurrency = (number) => {
        return number?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        }) ?? '';
    };

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            // getData(`/scheduled-service?UserId=08dca44f-6b05-454a-8e9f-944208a72666`, {})
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
            let updatedSelected;
            if (isChecked) {
                updatedSelected = [...prevSelected, service];
            } else {
                updatedSelected = prevSelected.filter(selected => selected.id !== service.id);
            }
            // Update selectAll state => nếu tất cả item đã được chọn thì check, ngượic ngược lại thì uncheck
            setSelectAll(updatedSelected.length === data?.scheduledServiceDetails?.length);
            return updatedSelected;
        });
    };

    const handleSelectAll = (isChecked) => {
        setSelectAll(isChecked);
        if (isChecked) {
            setSelectedServices(data?.scheduledServiceDetails);
        } else {
            setSelectedServices([]);
        }
    };

    const totalPrice = selectedServices.reduce((total, service) => total + (service?.servicePackage?.price * service?.scheduledTimes?.length), 0);
    const groupedServices = (data?.scheduledServiceDetails || [])?.reduce((acc, service) => {
        const elderId = service?.elder?.id;
        if (!acc[elderId]) {
            acc[elderId] = {
                name: service?.elder?.name,
                services: []
            };
        }
        acc[elderId].services.push(service);
        return acc;
    }, {});

    return (
        <>
            <ComHeader
                showBackIcon={true}
                showTitle={true}
                title={"Xác nhận đăng ký"}
            />
            {data == undefined ? (
                <View style={styles.container}>
                    <ComNoData>Hiện tại không có dịch vụ cần xác nhận</ComNoData>
                </View>
            ) : (
                <View style={styles.container}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <Text>{data?.id}</Text>
                        <Text style={{ marginBottom: 10 }}>Vui lòng chọn những dịch vụ mà bạn muốn tiếp tục đăng ký cho tháng sau. Nếu không muốn đăng ký, bạn vui lòng bỏ qua:</Text>
                        <ComLoading show={loading}>
                            {data?.scheduledServiceDetails == 0 ? (
                                <ComNoData />
                            ) : (
                                <View>
                                    {Object.keys(groupedServices).map(elderId => (
                                        <View key={elderId}>
                                            <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 10 }}>Người cao tuổi: {groupedServices[elderId].name}</Text>
                                            {groupedServices[elderId].services.map((item, index) => (
                                                <ComScheduledService
                                                    key={index}
                                                    data={item}
                                                    onCheck={handleSelectService}
                                                    isSelected={selectedServices.some(service => service.id === item.id)}
                                                />
                                            ))}
                                        </View>
                                    ))}
                                </View>
                            )}
                        </ComLoading>
                    </ScrollView>
                    <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <BouncyCheckbox
                            isChecked={selectAll}
                            onPress={handleSelectAll}
                            fillColor="#33B39C"
                            textComponent={<Text>  Chọn tất cả</Text>}
                        />
                    </View>
                    <View style={[{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }]}>
                        <Text style={{ fontWeight: "600", fontSize: 16 }}>
                            Tổng tiền
                        </Text>
                        <Text style={{ fontWeight: "600", fontSize: 16 }}>
                            {formatCurrency(totalPrice)}
                        </Text>
                    </View>
                    <ComSelectButton
                        disable={selectedServices?.length == 0}
                        onPress={() => { navigation.navigate("ScheduledServicePayment", { selectedServices, data }) }}>
                        Xác nhận
                    </ComSelectButton>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
    }
});