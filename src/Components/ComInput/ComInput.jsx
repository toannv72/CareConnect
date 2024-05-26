
import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, View, Text, TextInput } from 'react-native';

const ComInput = (
  (
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
      placeholder
    },
    ...props
  ) => {
    const errorMessage = errors[name]?.message;
    return (
      <View>
        {label && (
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{label}</Text>
            {required && (
              <Text style={styles.required}>*</Text>
            )}
          </View>
        )}

        {password ? <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errorMessage ? 'red' : '#33B39C'
                  }
                ]}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder={placeholder}
                keyboardType={keyboardType} // Set keyboardType here
                ref={ref}
                secureTextEntry
              
                {...props}
              />
              {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
            </View>
          )}
          name={name}
          rules={rules}
        /> : <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <TextInput
            
                onBlur={() => {
                  onBlur();
                }}
                onChangeText={value => onChange(value)}
                placeholder={placeholder}
                value={value}
                keyboardType={keyboardType} // Set keyboardType here
                ref={ref}
                style={[
                  styles.input,
                  {
                    borderColor: errorMessage ? 'red' : '#33B39C'
                  }
                ]}
                {...props}
              />
              {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
            </View>
          )}
          name={name}
          rules={rules}
        />}
      </View>
    )
  }
);

export default ComInput;
const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
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
    // height: 40,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    fontWeight: "bold",

    elevation: 5, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  error: {
    color: "red",
    marginTop: 4,
  },
});