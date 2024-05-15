import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View, Text, TextInput, Image } from "react-native";
import iconSource from "../../../assets/Search.png";

iconSource;
const ComInputSearch = (
  {
    label,
    name,
    control,
    rules,
    ref,
    keyboardType,
    required,
    errors,
    onSubmitEditing,
    placeholder,
  },
  ...props
) => {
  const errorMessage = errors[name]?.message;
  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Image source={iconSource} style={[styles.icon]} />
            <TextInput
              onBlur={() => {
                onBlur();
              }}
              onChangeText={(value) => onChange(value)}
              placeholder={placeholder}
              value={value}
              onSubmitEditing={onSubmitEditing}
              keyboardType={keyboardType} // Set keyboardType here
              ref={ref}
              style={styles.input}
              {...props}
            />
          </View>
        )}
        name={name}
        rules={rules}
      />
    </View>
  );
};

export default ComInputSearch;
const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 35,
  },
  container: {
    margin: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    fontWeight: "bold",
    borderColor: "#33B39C",

    elevation: 10, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
    paddingHorizontal: 10,
    objectFit: "fill",
  },
});
