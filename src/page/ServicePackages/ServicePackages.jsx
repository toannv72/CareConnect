import React, { useContext, useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import ComPackage from "./ComPackage";
import { LanguageContext } from "./../../contexts/LanguageContext";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComInputSearch from "../../Components/ComInput/ComInputSearch";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";
import ComLoading from "../../Components/ComLoading/ComLoading";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { postData, getData } from "../../api/api";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import * as Linking from 'expo-linking';
import ComNoData from "../../Components/ComNoData/ComNoData";

export default function ServicePackages() {
  const navigation = useNavigation(); // Add this line
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [page, setPage] = useState(1); // Track pagination page
  const [hasMore, setHasMore] = useState(true); // Track if there are more items to load
  const [searchQuery, setSearchQuery] = useState("");

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
      setPage(1);
      setData([]);
      setSearchQuery(encodeURIComponent(data?.search.trim()));
    }
  };

  const fetchNextPage = async () => {
    setLoadMoreLoading(!loadMoreLoading);
    let url = '/nursing-package';

    if (searchQuery) {
      url += `?Search=${searchQuery}`;
    } else {
      url += `?PageIndex=${page}&PageSize=10`;
    }
    getData(url, {})
      .then((nursingData) => {
        const newItems = nursingData?.data?.contends || [];
        setData(prevData => [...prevData, ...newItems]);
        setPage(prevPage => prevPage + 1);
        setLoadMoreLoading(false);
        setLoading(false);
        setHasMore(page < nursingData?.data?.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching nursing-package:", error);
      });
  }

  useEffect(() => {
    if (searchQuery != "")
      fetchNextPage();
  }, [searchQuery]);

  useFocusEffect(
    useCallback(() => {
      reset();
      setData([]);
      setPage(1);
      // setLoading(true);
      setSearchQuery("");
      fetchNextPage();
    }, [])
  );

  const handleClearSearch = () => {
    setPage(1);
    setData([])
    setSearchQuery(" ");
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
                {data?.map((value, index) => (
                  <ComPackage key={index} data={value} />
                ))}
              </View>
              {hasMore && (
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <View style={{ width: "35%" }}>
                    {loadMoreLoading ? (<ActivityIndicator />) :
                      (<TouchableOpacity onPress={fetchNextPage} disable={!hasMore}>
                        <Text style={{ fontSize: 16, textAlign: "center", color: "#33B39C" }}>Xem thêm</Text>
                      </TouchableOpacity>)}
                  </View>
                </View>
              )}
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
});
