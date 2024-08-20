import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import feedbackImg from "../../../assets/images/feedback/feedback.png";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComSelect from "../../Components/ComInput/ComSelect";
import { postData, getData } from "../../api/api";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function FeedbackDetail() {
  const {
    text: { feedback },
    setLanguage,
  } = useContext(LanguageContext);

  const route = useRoute();
  const { id } = route.params;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(!loading);
    getData(`/feedback/${id}`, {})
      .then((feedback) => {
        setData(feedback?.data);
        setLoading(loading);
      })
      .catch((error) => {
        setLoading(loading);
        console.error("Error getData fetching feedback:", error);
      });
  }, []);

  const methods = useForm({
    resolver: yupResolver(),
    defaultValues: {
      pleasure: data?.ratings ?? "",
    },
  });
  const {
    control,
    formState: { errors },
  } = methods;

  const pleasureData = [
    {
      value: "VerySatisfied",
      label: "Rất hài lòng",
    },
    {
      value: "Neutral",
      label: "Bình thường",
    },
    {
      value: "Unsatisfied",
      label: "Không hài lòng",
    },
  ];

  const formattedDate = (dateValue) => {
    const day = new Date(dateValue).getDate().toString().padStart(2, "0");
    const month = (new Date(dateValue).getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const year = new Date(dateValue).getFullYear();
    return `${day}/${month}/${year}`;
  };
  const getPleasureLabel = (value) => {
    const pleasure = pleasureData.find((item) => item.value === value);
    return pleasure ? pleasure.label : "";
  };
  return (
    <>
      <ComHeader
        title={feedback?.history?.feedbackDetail}
        showTitle
        showBackIcon
      />
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Image
            source={feedbackImg}
            style={{
              height: 160,
              objectFit: "fill",
              marginBottom: 30,
            }}
          />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddingServiceDetail", {
                id: data?.orderDetail?.servicePackage?.id,
              });
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: 20,
              }}
            >
              {data?.orderDetail?.servicePackage?.name}
            </Text>
          </TouchableOpacity>

          <View style={{ marginBottom: 10 }}>
            <Text style={styles.contentBold}>{feedback?.history?.title}</Text>
            <Text style={styles.textbox}>{data?.title}</Text>
          </View>

          <View style={{ marginBottom: 5 }}>
            <Text style={styles.contentBold}>{feedback?.history?.content}</Text>
            <Text style={styles.textbox}>{data?.content}</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.contentBold}>Người lớn tuổi</Text>
            <Text style={styles.textbox}>{data?.orderDetail?.elder?.name}</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.contentBold}>{feedback?.history?.date}</Text>
            <Text style={styles.textbox}>{formattedDate(data?.createdAt)}</Text>
          </View>
          <FormProvider {...methods}>
            <View style={{ marginBottom: 35 }}>
              <Text style={styles.contentBold}>
                {feedback?.label?.pleasure}
              </Text>

              <Text style={styles.textbox}>
                {getPleasureLabel(data?.ratings)}
              </Text>
            </View>
          </FormProvider>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  contentBold: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "600",
  },
  textbox: {
    borderColor: "#33B39C",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    objectFit: "fill",
  },
});
