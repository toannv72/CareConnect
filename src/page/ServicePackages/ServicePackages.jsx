import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
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

export default function ServicePackages() {
  const [data, setData] = useState([
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      color: "#F7E863",
      text: "Gói cơ bản",
      context: "Cung cấp tất cả các dịch vụ cần thiết cho người thân của bạn",
      people: 2,
      money: 1000000000,
    },
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      color: "#8DF7AB",
      text: "Gói cơ bản",
      context: "Cung cấp tất cả các dịch vụ cần thiết cho người thân của bạn",
      people: 2,
      money: 100000000,
    },
  ]);
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
