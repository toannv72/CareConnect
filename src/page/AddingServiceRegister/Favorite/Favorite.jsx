import React, { useContext, useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import ComSelectButton from "../../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { FavoriteContext } from "../../../contexts/FavoriteContext";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ComHeader from "../../../Components/ComHeader/ComHeader";
import ComNoData from "../../../Components/ComNoData/ComNoData";
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import ComAddPackage from "../../AddingServicePackage/ComAddPackage";

export default function Favorite() {
    const { favorites, toggleFavorite } = useContext(FavoriteContext);

    return (
        <>
            <ComHeader
                title={"Dịch vụ đã lưu"}
                showTitle
                showBackIcon
            />
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    {favorites?.length == 0 ? (<ComNoData>Không có dịch vụ nào</ComNoData>
                    ) : (favorites?.map((item, index) => (
                        <ComAddPackage key={index} data={item} />
                    ))
                    )}
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    emptyCartText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});
