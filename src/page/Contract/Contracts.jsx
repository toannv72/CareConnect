import React, { useContext, useState } from "react";
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

export default function Contracts() {
  const { contracts } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [select, setSelect] = useState(false);
  const [loading, setLoading] = useState(false);
  const categories = ["Valid",  "Invalid", "Cancelled", "Pending"];

  const handlePress = (category) => {
    setSelectedCategory(category);
    setSelect(true);
  };

  const {
    text: { contractsPage },
    setLanguage,
  } = useContext(LanguageContext);

  const searchSchema = yup.object().shape({
    search: yup.string(),
  });
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

  const check = (category) => {
    setSelectedCategory(category)
    setSelect(false);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Valid':
        return { text: 'Còn hạn', color: 'green' };
      case 'Cancelled':
        return { text: 'Đã hủy', color: 'red' };
      case 'Invalid':
        return { text: 'Hết hạn', color: 'red' };
      case 'Pending':
        return { text: 'Đang chờ' };
      default:
        return status;
    }
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
                onPress={() => handlePress(category)}
                check={selectedCategory === category ? false : true}
              >
                {getStatusText(category).text}
              </ComSelectButton>
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
                <View style={{ height: 120 }}></View></>
            ) : (
              <ComNoData>Không có hợp đồng nào</ComNoData>
            )}
          </ScrollView>
        </ComLoading>
      </View>
      {/* <View style={{ height: 100, backgroundColor: "#fff" }}></View> */}
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
