import React, { useContext, useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import ComPackage from "./ComPackage";
import { LanguageContext } from "./../../contexts/LanguageContext";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComInputSearch from "../../Components/ComInput/ComInputSearch";
import { ScrollView } from "react-native";
import ComLoading from "../../Components/ComLoading/ComLoading";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { postData, getData } from "../../api/api";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import ComNoData from "../../Components/ComNoData/ComNoData";

export default function ServicePackages() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedItems, setDisplayedItems] = useState(10);

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

  const { control, handleSubmit, reset, formState: { errors } } = methods;

  const onSubmit = (data) => {
    if (data?.search != "") {
      setData([]);
      setSearchQuery(encodeURIComponent(data?.search.trim()));
    }
  };

  const fetchNextPage = async () => {
    let url = '/nursing-package';
    setLoading(true);
    if (searchQuery) {
      url += `?Search=${searchQuery}`;
    }
    getData(url, {})
      .then((nursingData) => {
        const filterData = nursingData?.data?.contends?.filter((service) => {
          const validstatus = service?.state === "Active" ? true : false // check trạng thái còn tồn tại hay ko
          return validstatus;
      }) || [];
        setData(filterData?.reverse() || []);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching nursing-package:", error);
      });
  }

  useEffect(() => {
    if (searchQuery != "")
      fetchNextPage();
    setDisplayedItems(10);
  }, [searchQuery]);

  useFocusEffect(
    useCallback(() => {
      reset();
      setData([]);
      setDisplayedItems(10);
      setSearchQuery("");
      fetchNextPage();
    }, [])
  );

  const handleLoadMore = () => {
    setDisplayedItems(prevCount => prevCount + 10);
  };

  const handleClearSearch = () => {
    setData([])
    setSearchQuery(" ");
    setDisplayedItems(10);
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
            handleClearSelection={handleClearSearch}
          />
        </FormProvider>
        {loading ? (
          <ComLoading show={true} />
        ) : (
          data?.length == 0 ? (<ComNoData>Không có gói dưỡng lão nào</ComNoData>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <View>
                {data?.slice(0, displayedItems)?.map((value, index) => (
                  <ComPackage key={index} data={value} />
                ))}
              </View>
              {
                displayedItems < data?.length && (
                  <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={{ width: "50%" }}>
                      <ComSelectButton onPress={handleLoadMore}>Xem thêm</ComSelectButton>
                    </View>
                  </View>
                )
              }
              <View style={{ height: 30 }}></View>
            </ScrollView>
          ))}
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
})
