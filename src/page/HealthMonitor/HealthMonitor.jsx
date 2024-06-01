import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ComHealth from "./ComHealth";
import { FormProvider, useForm } from "react-hook-form";
import { LanguageContext } from "../../contexts/LanguageContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComHeader from "../../Components/ComHeader/ComHeader";

export default function HealthMonitor() {
  const [data, setData] = useState([
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      name: "Nguyễn Văn toàn",
      age: "34",
      sex: "Nam",
      room: "17",
      bed: "3",
      id: 1,
    },
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      name: "Nguyễn Văn toàn",
      age: "34",
      sex: "Nam",
      room: "17",
      bed: "3",
      id: 2,
    },
  ]);
  const searchSchema = yup.object().shape({
    search: yup.string(),
  });
  const {
    text: {
      healthMonitor,
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
  };
  return (
    <>
      <ComHeader
        title={healthMonitor?.title}
        showTitle
      />
      <View style={styles.body}>
        {/* <FormProvider {...methods}>
        <ComInputSearch
          placeholder="Tìm kiếm"
          keyboardType="default"
          name="search"
          control={control}
          onSubmitEditing={handleSubmit(onSubmit)}
          errors={errors}
        />
      </FormProvider> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles?.scrollView}
        >
          <View>
            {data?.map((value, index) => (
              <ComHealth key={index} data={value} />
            ))}
          </View>
          <View style={{ height: 120 }}></View>
        </ScrollView>
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
  },
});
