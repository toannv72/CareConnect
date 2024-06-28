import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const ComSelect = ({
  label,
  name,
  control,
  rules,
  required,
  errors,
  options,
  style,
  enabled = true,
  defaultValue,
  onChange,
}) => {
  const errorMessage = errors[name]?.message;

  return (
    <View style={style}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.required}>*</Text>}
        </View>
      )}

      <Controller
        control={control}
        render={({ field: { onChange: formOnChange, value } }) => (
          <View
            style={[
              styles.input,
              {
                borderColor: errorMessage ? "red" : "#33B39C",
              },
            ]}
          >
            <Picker
              selectedValue={defaultValue ? defaultValue : value}
              onValueChange={(itemValue, itemIndex) => {
                formOnChange(itemValue);
                if (onChange) {
                  onChange(itemValue);
                }
              }}
              enabled={enabled}
            >
              {options.map((option, index) => (
                <Picker.Item
                  key={index}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
        )}
        name={name}
        rules={rules}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

export default ComSelect;

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    fontWeight: "bold",
    marginRight: 4,
  },
  required: {
    color: "red",
    fontSize: 14,
  },
  input: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
    justifyContent: "center",
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  error: {
    color: "red",
    marginTop: 4,
  },
});
