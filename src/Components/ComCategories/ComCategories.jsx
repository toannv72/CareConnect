import React, { useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import ComSelectButton from '../ComButton/ComButton';

export default function CategoryButtons({ categoryData, selectedCategory, onSelectCategory, onClearSelection }) {
    const scrollViewRef = useRef(null);

    useEffect(() => {
        // Scroll to the beginning when selectedCategory changes
        if (scrollViewRef.current && selectedCategory === null) {
            scrollViewRef.current.scrollTo({ x: 0, animated: true });
        }
    }, [selectedCategory]);

    const handleCategorySelect = (categoryId, index) => {
        onSelectCategory(categoryId);
        if (categoryId === null) {
            // Scroll to the beginning when "Tất cả" is selected
            scrollViewRef.current.scrollTo({ x: 0, animated: true });
            onClearSelection()
        } else {
            // Scroll to the selected category button
            const offsetX = index * (BUTTON_WIDTH + 15); // Adjust 15 for gap between buttons
            scrollViewRef.current.scrollTo({ x: offsetX, animated: true });
        }
    };
    return (
        <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.scrollView}
    >
        <View style={styles.buttonContainer}>
            <ComSelectButton onPress={() => handleCategorySelect(null, 0)} check={selectedCategory}>
                Tất cả
            </ComSelectButton>
            {categoryData?.map((value, index) => (
                <ComSelectButton
                    key={index}
                    onPress={() => handleCategorySelect(value.id, index + 1)}
                    check={selectedCategory !== value.id}
                >
                    {value.name}
                </ComSelectButton>
            ))}
        </View>
    </ScrollView>
    );
}

const BUTTON_WIDTH = 120; // Assuming a fixed width for buttons


const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 0,
        flexShrink: 0,
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 15,
        flexWrap: "wrap",
    },
});
