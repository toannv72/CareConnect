import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import Eye from "../../../assets/Eye.png"
import EyeInvisible from "../../../assets/EyeInvisible.png"

const ComInput = (
  {
    label,
    name,
    control,
    rules,
    ref,
    keyboardType,
    required,
    errors,
    password,
    edit,
    placeholder,
  },
  ...props
) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const errorMessage = errors[name]?.message;
  const [numberOfLines, setNumberOfLines] = useState(2);
  return (
    <View>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.required}>*</Text>}
        </View>
      )}

      {password ? (
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errorMessage ? "red" : "#33B39C",
                  },
                ]}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder={placeholder}
                keyboardType={keyboardType} // Set keyboardType here
                ref={ref}
                editable={edit}
                secureTextEntry={password && secureTextEntry}
                {...props}
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              >
                <Image
                  source={secureTextEntry ? Eye : EyeInvisible} // Update the path to your image
                  style={styles.icon}
                />
              </TouchableOpacity>
              {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
            </View>
          )}
          name={name}
          rules={rules}
        />
      ) : (
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <TextInput
                onBlur={() => {
                  onBlur();
                }}
                onChangeText={(value) => onChange(value)}
                placeholder={placeholder}
                value={value}
                keyboardType={keyboardType} // Set keyboardType here
                ref={ref}
                editable={edit}
                style={[
                  styles.input,
                  {
                    borderColor: errorMessage ? "red" : "#33B39C",
                  },
                ]}
                onContentSizeChange={(e) => {
                  setNumberOfLines(e.nativeEvent.contentSize.height / 20); // Adjust numberOfLines based on content height
                }}
                {...props}
              />
              {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
            </View>
          )}
          name={name}
          rules={rules}
        />
      )}
    </View>
  );
};

export default ComInput;
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
  inputContainer: {
    position: "relative",
  },
  input: {
    backgroundColor: "#fff",
    height: 50,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
    color: "#000",
    // elevation: 5, // Bóng đổ cho Android
    // shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    position: "absolute",
    right: 5,
    padding: 15
  },
  icon: {
    width: 20,
    height: 20,
  },
  error: {
    color: "red",
    marginTop: 4,
  },
});
