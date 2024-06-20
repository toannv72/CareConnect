import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import ComHealth from "./ComHealth";
import { FormProvider, useForm } from "react-hook-form";
import { LanguageContext } from "../../contexts/LanguageContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { useStorage } from "../../hooks/useLocalStorage";

export default function ElderProfile() {
  const [elders, setElders] = useStorage("elders", []);
  const searchSchema = yup.object().shape({
    search: yup.string(),
  });
  const {
    text: {
      ElderProfile,
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
        title={ElderProfile?.title}
        showTitle
        showBackIcon
      />
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles?.scrollView}
        >
          <View>
            {elders?.map((value, index) => (
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
