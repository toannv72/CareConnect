import React, { useContext, useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Text, SectionList } from 'react-native';
import { useForm, FormProvider } from "react-hook-form";
import ComInputSearch from '../../Components/ComInput/ComInputSearch';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { postData, getData } from "../../api/api";
import ComNoData from "../../Components/ComNoData/ComNoData";
import ComHeader from "../../Components/ComHeader/ComHeader";
import moment from "moment";

export default function Search() {
    const [services, setServices] = useState([]);
    const [nursingPackage, setNursingPackage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const navigation = useNavigation();
    const searchSchema = yup.object().shape({ search: yup.string(), });
    const methods = useForm({
        resolver: yupResolver(searchSchema),
        defaultValues: { search: "" },
    });

    const { control, handleSubmit, reset, formState: { errors } } = methods;

    const onSubmit = (data) => {
        if (data?.search.trim() != "") {
            setLoading(true);
            getData(`/service-package?Search=${encodeURIComponent(data?.search.trim())}`, {})
                .then((packageData) => {
                    const filteredData = packageData?.data?.contends?.filter((service) => {
                        const validstatus = service?.state === "Active" ? true : false // check trạng thái còn tồn tại hay ko
                        const endRegistrationDate = moment(service?.endRegistrationDate);
                        const hasNotExpired = service?.type == "OneDay" ?  moment().isSameOrBefore(endRegistrationDate, "day") : true;
                        const hasSlotsLeft = service?.type == "OneDay" ?  service?.registrationLimit !== 0 ? service?.totalOrder < service?.registrationLimit : service?.totalOrder >= service?.registrationLimit : true;
                        return hasNotExpired && hasSlotsLeft && validstatus;
                    }) || [];
                    setServices(filteredData)
                    setInitialLoad(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error("Error fetching service-package:", error);
                });

            getData(`/nursing-package?Search=${encodeURIComponent(data?.search.trim())}`, {})
                .then((nursingPackage) => {
                    const filteredData = nursingPackage?.data?.contends?.filter((service) => {
                        const validstatus = service?.state === "Active" ? true : false // check trạng thái còn tồn tại hay ko
                        return validstatus;
                    }) || [];
                    setNursingPackage(filteredData);
                    setLoading(false);
                    setInitialLoad(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error("Error fetching service-package-categories:", error);
                });
        }
    };

    const handleClearSearch = () => {
        setServices([]);
        setNursingPackage([]);
        setInitialLoad(true);
    };

    const DATA = [
        {
            title: 'Gói dưỡng lão',
            data: nursingPackage,
        },
        {
            title: 'Gói dịch vụ',
            data: services,
        }
    ].filter(section => section?.data?.length > 0);

    const renderItem = ({ item, index, section }) => {
        let routeName = "";
        if (section.title === 'Gói dưỡng lão') {
            routeName = "ServicePackageDetail";
        } else if (section.title === 'Gói dịch vụ') {
            routeName = "AddingServiceDetail";
        }

        return (
            <TouchableOpacity
                onPress={() => { navigation.navigate(routeName, { data: item, id: item?.id }); }}
                style={styles.item}>
                <Image
                    source={{ uri: item?.imageUrl }}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 5,
                        borderWidth: 0.5,
                        borderColor: "#000",
                        flex: 1
                    }}
                />
                <Text style={[styles.title, { flex: 5 }]} numberOfLines={1}>{item?.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <ComHeader
                showBackIcon={true}
                showTitle={true}
                title={"Tìm kiếm"}
            />
            <View style={styles.container}>
                <View style={{ flexDirection: "row", gap: 10, justifyContent: "center", alignItems: "center" }}>
                    <View style={{ flex: 7 }}>
                        <FormProvider {...methods}>
                            <ComInputSearch
                                placeholder="Tìm kiếm"
                                name="search"
                                control={control}
                                onSubmitEditing={handleSubmit(onSubmit)}
                                errors={errors}
                                handleClearSelection={handleClearSearch}
                            />
                        </FormProvider>
                    </View>

                    {/* <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => { navigation.goBack(); }}>
                        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 16, color: "#33B39C" }}>Hủy</Text>
                    </TouchableOpacity> */}
                </View>
                {loading ? (<ActivityIndicator style={{ marginTop: 30 }} />) : (
                    DATA.length > 0 ? (
                        <SectionList
                            style={{ paddingBottom: 20 }}
                            sections={DATA}
                            keyExtractor={(item, index) => item + index}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderItem}
                            renderSectionHeader={({ section: { title } }) => (
                                <Text style={[styles.header, { paddingBottom: 5, paddingTop: 20 }]}>{title}</Text>
                            )}
                            ListFooterComponent={<View style={{ height: 50 }}></View>}
                        />
                    ) : (
                        <ComNoData>
                            {initialLoad ? "Bạn muốn tìm từ khóa gì" : "Không có kết quả bạn cần tìm. Hãy vui lòng thử một từ khóa khác"}
                        </ComNoData>)
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
    },
    header: {
        fontSize: 16,
        fontWeight: "bold",
        backgroundColor: "#fff",
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