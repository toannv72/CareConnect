import React, { useContext, useState, useCallback, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import ComInputSearch from "../../Components/ComInput/ComInputSearch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComLoading from "../../Components/ComLoading/ComLoading";
import ComAddContract from "./ComAddContract";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useAuth } from "../../../auth/useAuth";
import ComNoData from "../../Components/ComNoData/ComNoData";
import { useFocusEffect } from '@react-navigation/native';
import { getData } from "../../api/api";

export default function Contracts() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [select, setSelect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const categories = ["Valid", "Expired", "Cancelled", "Pending"];

  const fetchNextPage = async () => {
    setLoading(true)
    let url = `/contract?UserId=${user?.id}&SortColumn=createdAt&SortDir=Desc`;
    if (searchQuery) { url += `&Search=${searchQuery}` }
    if (selectedCategory) { url += `&Status=${selectedCategory}` }

    getData(url, {})
      .then((contract) => {
        setContracts(contract?.data?.contends);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching order items:", error);
      });
  }

  useEffect(() => {
    if (selectedCategory || selectedCategory == null || searchQuery != "") { fetchNextPage(); }
  }, [selectedCategory, searchQuery]);

  useFocusEffect(
    useCallback(() => {
      reset();
      setContracts([]);
      setLoading(true);
      setSearchQuery("");
      fetchNextPage();
      check()
    }, [])
  );

  const {
    text: { contractsPage },
    setLanguage,
  } = useContext(LanguageContext);

  const searchSchema = yup.object().shape({ search: yup.string() });
  const methods = useForm({
    resolver: yupResolver(searchSchema),
    defaultValues: { search: "" },
  });

  const { control, reset, handleSubmit, formState: { errors } } = methods;

  const onSubmit = (data) => {
    setSearchQuery(encodeURIComponent(data?.search.trim()));
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Valid':
        return { text: 'Còn hạn', color: 'green' };
      case 'Cancelled':
        return { text: 'Đã hủy', color: 'red' };
      case 'Expired':
        return { text: 'Hết hạn', color: 'red' };
      case 'Pending':
        return { text: 'Đang chờ' };
      default:
        return status;
    }
  };

  const check = () => {
    setSelectedCategory(null)
    setSelect(false);
  };

  const handleCategorySelect = (value) => {
    setSelectedCategory(value);
    setSelect(true);
  };
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const filteredData = !select ? contracts : contracts.filter(item => item?.status === selectedCategory);

  return (
    <>
      <ComHeader
        showBackIcon={true}
        showTitle={true}
        title={contractsPage?.title}
      />
      <View style={styles.container}>
        <FormProvider {...methods}>
          <ComInputSearch
            placeholder="Tìm kiếm"
            keyboardType="default"
            name="search"
            control={control}
            onSubmitEditing={handleSubmit(onSubmit)}
            handleClearSelection={handleClearSearch}
            errors={errors}
          />
        </FormProvider>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles?.scrollView}
        >
          <View style={styles?.buttonContainer}>
            <ComSelectButton onPress={check} check={select}>
              Tất cả
            </ComSelectButton>
            {categories.map((category) => (
              <ComSelectButton
                key={category}
                onPress={() => handleCategorySelect(category)}
                check={selectedCategory === category ? false : true}
              > {getStatusText(category).text} </ComSelectButton>
            ))}
          </View>
        </ScrollView>

        <ComLoading show={loading}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {filteredData?.length > 0 ? (
              <>
                <View>
                  {filteredData?.map((value, index) => (
                    <ComAddContract key={index} data={value} />
                  ))}
                </View>
                <View style={{ height: 150 }}></View>
              </>
            ) : (<ComNoData>Không có hợp đồng nào</ComNoData>)}
          </ScrollView>
        </ComLoading>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    flexWrap: "wrap",
    marginBottom: 10,
  },
  scrollView: {
    flexGrow: 0,
    flexShrink: 0,
  },
});
