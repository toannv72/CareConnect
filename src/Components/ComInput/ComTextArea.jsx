import React, {useState} from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View, Text, TextInput } from "react-native";

const ComTextArea = (
  {
    label,
    name,
    control,
    rules,
    ref,
    keyboardType,
    required,
    errors,
    edit,
    placeholder,
    defaultValue
  },
  ...props
) => {
  const [numberOfLines, setNumberOfLines] = useState(2);
  const errorMessage = errors[name]?.message;
  return (
    <View>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.required}>*</Text>}
        </View>
      )}

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
              onContentSizeChange={(e) => {
                setNumberOfLines(e.nativeEvent.contentSize.height / 20); // Adjust numberOfLines based on content height
              }}
              multiline={true}
              editable={edit}
              keyboardType={keyboardType} // Set keyboardType here
              ref={ref}
              style={[
                styles.input,
                {
                  borderColor: errorMessage ? "red" : "#33B39C",
                },
              ]}
              defaultValue={defaultValue}
              {...props}
            />
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
          </View>
        )}
        name={name}
        rules={rules}
      />
    </View>
  );
};

export default ComTextArea;
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
    color: "#33B39C",
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
    color:"#000"
  },
  error: {
    color: "red",
    marginTop: 4,
  },
});
