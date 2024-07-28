import React, { useContext, useState, useCallback } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import ComHealth from "./ComHealth";
import { FormProvider, useForm } from "react-hook-form";
import { LanguageContext } from "../../contexts/LanguageContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComNoData from "../../Components/ComNoData/ComNoData";
import ComLoading from "../../Components/ComLoading/ComLoading";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { postData, getData } from "../../api/api";
import { useAuth } from "../../../auth/useAuth";

export default function HealthMonitor() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [data, setData] = useState([])

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

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getData(`/elders?UserId=${user?.id}`, {})
        .then((elders) => {
          setData(elders?.data?.contends);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error getData fetching items:", error);
        });
    }, [user])
  );
  return (
    <>
      <ComHeader
        title={healthMonitor?.title}
        showTitle
      />
      <View style={styles.body}>
        <ComLoading show={loading}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles?.scrollView}
          >
            {data?.length == 0 ? (
              <ComNoData />
            ) : (
              <View>
                {data?.map((value, index) => (
                  <ComHealth key={index} data={value} />
                ))}
              </View>
            )}
            <View style={{ height: 100 }}></View>
          </ScrollView>
        </ComLoading>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
});
