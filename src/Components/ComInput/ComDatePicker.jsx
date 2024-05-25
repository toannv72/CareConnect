import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const ComDatePicker = ({
  label,
  name,
  control,
  rules,
  required,
  errors,
  placeholder, // Bỏ qua placeholder vì không cần thiết
  ...props
}) => {
  const errorMessage = errors[name]?.message;
  const [date, setDate] = useState(props.value ?? new Date()); // Khởi tạo ngày hiện tại nếu không có giá trị ban đầu
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("date");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const formattedDate = (dateValue) => {
    if (!dateValue || !(dateValue instanceof Date)) {
      return ""; // Return empty string for invalid dates
    }

    const day = dateValue.getDate().toString().padStart(2, "0");
    const month = (dateValue.getMonth() + 1).toString().padStart(2, "0");
    const year = dateValue.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const onChangeD = (event, selectedDate) => {
    const currentDate = selectedDate;
    handleClose();
    setDate(currentDate);
  };

  return (
    <View style={styles.inputContainer}>
      {/* Hiển thị label nếu có */}
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.required}>*</Text>}
        </View>
      )}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TouchableOpacity onPress={handleOpen} activeOpacity={1}>
              <View
                style={[
                  styles.input,
                  { borderColor: errorMessage ? "red" : "#33B39C" }, // Đổi màu viền khi có lỗi
                ]}
              >
                <Text>{formattedDate(value || date)}</Text>
              </View>
            </TouchableOpacity>
            {open && (
              <DateTimePicker
                testID="dateTimePicker"
                value={value || date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  onChangeD(event, selectedDate);
                  onChange(selectedDate);
                }}
              />
            )}
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
          </View>
        )}
      />
    </View>
  );
};

export default ComDatePicker;
const styles = StyleSheet.create({
  inputContainer: {
    // marginBottom: 20,
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
    height: 50,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    fontWeight: "bold",
    justifyContent: "center",
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
