import React, { useContext, useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import TopicContent from "../TopicContent";
import { LanguageContext } from "../../../contexts/LanguageContext";
import ComSelectButton from "../../../Components/ComButton/ComSelectButton";
import ComService from "./ComService";
import { postData, getData } from "../../../api/api";
import CategoryButtons from '../../../Components/ComCategories/ComCategories';
import ComNoData from "../../../Components/ComNoData/ComNoData";
import moment from "moment";

export default function Services() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {
    text: { Home },
  } = useContext(LanguageContext);

  useEffect(() => {
    setLoading(!loading);
    let url = `/service-package?SortColumn=totalOrder&SortDir=Desc`;
    if (selectedCategory) { url += `&PackageCategoryId=${selectedCategory}` }
    getData(url, {})
      .then((packageData) => {
        const filterData = packageData?.data?.contends?.filter(item => item.state ===  "Active");
        setData(filterData);
        setLoading(loading);
      })
      .catch((error) => {
        console.error("Error fetching service-package:", error);
        setLoading(loading);
      });
    getData('/service-package-categories', {})
      .then((categoryData) => {
        const filterData = categoryData?.data?.contends?.filter(category => category?.state === "Active")
        setCategoryData(filterData);
        setLoading(loading);
      })
      .catch((error) => {
        setLoading(loading);
        console.error("Error fetching service-package-categories:", error);
      });
  }, [selectedCategory])

  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
    setData([])
  };

  const handleClearSelection = () => {
    setSelectedCategory(0);
    setData([]);
  };

  const filteredData = data?.filter((service) => {
    const endRegistrationDate = moment(service?.endRegistrationDate);
    const hasNotExpired = service?.type == "OneDay" ? moment().isSameOrBefore(endRegistrationDate, "day") : true;
    const hasSlotsLeft = service?.type == "OneDay" ? service?.registrationLimit !== 0 ? service?.totalOrder < service?.registrationLimit : service?.totalOrder >= service?.registrationLimit : true;
    return hasNotExpired && hasSlotsLeft;
  });

  return (
    <View style={styles?.body}>
      <TopicContent>{Home?.services}</TopicContent>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <CategoryButtons
          categoryData={categoryData}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          onClearSelection={handleClearSelection} // Pass handleClearSelection as prop
        />
      </ScrollView>
      {/* <ComSkeleton
        show={loading}
        // image={true}
        // lines={5}
        /> */}
      {
        filteredData?.length === 0 ? (
          <ComNoData>Không có dịch vụ nào</ComNoData>
        ) : (
          filteredData.slice(0, 5).map((value, index) => (
            <ComService key={index} data={value}></ComService>
          ))
        )
      }

    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 15,
    marginTop: 5
  },
  comCatalogue: {
    flexDirection: "row",
    gap: 30,
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    flexWrap: "wrap",
    marginBottom: 10,
  },
});
