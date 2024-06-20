import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import ComPackage from "./ComPackage";
import { LanguageContext } from "./../../contexts/LanguageContext";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComInputSearch from "../../Components/ComInput/ComInputSearch";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";
import ComLoading from "../../Components/ComLoading/ComLoading";
import ComSkeleton from "../../Components/ComSkeleton/ComSkeleton";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { postData, getData } from "../../api/api";
import Nodata from "../../../assets/Nodata.png";

export default function ServicePackages() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchSchema = yup.object().shape({
    search: yup.string(),
  });

  const {
    text: {
      servicePackages,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);
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
    // Lấy danh sách sản phẩm
    setLoading(!loading);
    getData('/nursing-package', {})
      .then((nursingData) => {
        setData(nursingData?.data?.contends);
        setLoading(loading);
      })
      .catch((error) => {
        console.error("Error fetching nursing-package:", error);
      });
  }, [])

  return (

    <>
      <ComHeader
        title={servicePackages?.title}
        showTitle
        showBackIcon
      />
      <View style={styles.body}>
        <FormProvider {...methods}>
          <ComInputSearch
            placeholder="Tìm kiếm"
            keyboardType="default"
            name="search"
            control={control}
            onSubmitEditing={handleSubmit(onSubmit)}
            errors={errors}
          />
        </FormProvider>
        <ComLoading show={loading}>
          {data.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <View>
                {data?.map((value, index) => (
                  <ComSkeleton image lines={3} show={loading} key={index}>
                    <ComPackage key={index} data={value} />
                  </ComSkeleton>
                ))}
              </View>
              <View style={{ height: 120 }}></View>
            </ScrollView>
          ) : (
            <View style={styles?.noDataContainer}>
              <Image
                source={Nodata}
                style={styles?.noDataImage}
              />
              <Text style={{ fontSize: 16 }}>Không có dữ liệu</Text>
            </View>
          )}
        </ComLoading>
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
});
