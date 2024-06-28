import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import ComHealth from "./ComHealth";
import { FormProvider, useForm } from "react-hook-form";
import { LanguageContext } from "../../contexts/LanguageContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComHeader from "../../Components/ComHeader/ComHeader";
import Nodata from "../../../assets/Nodata.png";
import { useStorage } from "../../hooks/useLocalStorage";
import ComNoData from "../../Components/ComNoData/ComNoData";
import ComLoading from "../../Components/ComLoading/ComLoading";

export default function HealthMonitor() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useStorage("user", {});

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
        <ComLoading show={loading}>

          {user.length == 0 ? (
            <ComNoData />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={styles?.scrollView}
            >
              <View>
                {user?.elders?.map((value, index) => (
                  <ComHealth key={index} data={value} />
                ))}
              </View>
              <View style={{ height: 120 }}></View>
            </ScrollView>
          )
          }
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
  },
});
