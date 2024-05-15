import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ComHealth from "./ComHealth";
import { FormProvider, useForm } from "react-hook-form";
import ComInputSearch from "../../Components/ComInput/ComInputSearch";
import { LanguageContext } from "../../contexts/LanguageContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function HealthMonitor() {
  const [data, setData] = useState([
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      name: "Nguyễn Văn toàn",
      age: "34",
      sex: "Nam",
      room: "17",
      bed: "3",
    },
    {
      img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg",
      name: "Nguyễn Văn toàn",
      age: "34",
      sex: "Nam",
      room: "17",
      bed: "3",
    },
  ]);
    const searchSchema = yup.object().shape({
      search: yup.string(),
    });
const {
  text: {
    Login,
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
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
});
