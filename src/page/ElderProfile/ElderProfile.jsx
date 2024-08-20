import React, { useContext, useState, useCallback } from "react";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";
import ComHealth from "./ComHealth";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComNoData from "../../Components/ComNoData/ComNoData";
import { useStorage } from "../../hooks/useLocalStorage";
import { LanguageContext } from "../../contexts/LanguageContext";
import { getData } from "../../api/api";
import { useAuth } from "../../../auth/useAuth"; 
import { useFocusEffect } from '@react-navigation/native';

export default function ElderProfile() {
  const { user } = useAuth();
  const [elders, setElders] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    text: {
      ElderProfile,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);

  useFocusEffect(
    useCallback(() => {
      getData(`elders?UserId=${user?.id}`, {})
      .then((elders) => {
        setElders(elders?.data?.contends);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching order items:", error);
      });
    }, [])
  );

  return (
    <>
      <ComHeader
        title={ElderProfile?.title}
        showTitle
        showBackIcon
      />
      <View style={styles.body}>
        {elders?.length > 0 ? (
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
        ) : (
          <ComNoData />
        )}
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
